const firebase = require("firebase/app");
const admin = require("firebase-admin");
const Config = require("../firebase-config");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} = require("firebase/auth");
const {
  getFirestore,
  setDoc,
  collection,
  doc,
  getDoc,
} = require("firebase/firestore");

// Initialize Firebase
const app = firebase.initializeApp(Config.firebaseConfig);

const db = getFirestore(app);
const auth = getAuth();

// middleware to verfiy the idToken
const verifyIdToken = (req, res, next) => {
  const idToken = req.headers.authorization;

  // verify the idToken
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(() => next())
    .catch(() => {
      res.status(401).json({ message: "Unauthorized" });
    });
};

// Register users
exports.registerUser = async (req, res) => {
  const {
    email,
    password,
    phonenumber, 
    fullname: { firstname, lastname },
    bio: { job, address, about },
    dob: {day, month, year}
  } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;
  const currentYear = new Date();

  // if user is registered add the following data to the user doc [db].
  if (user) {
    const ref = doc(collection(db, "user"), auth.currentUser.uid);
    const username = `${firstname}${lastname}${currentYear.getFullYear() - year}`;
    setDoc(ref, {
      email: auth.currentUser.email,
      uid: auth.currentUser.uid,
      username: username.toLowerCase(),
      phonenumber: phonenumber,
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      dob: {
        day: day,
        month: month,
        year: year
      },
      bio: {
        age: currentYear.getFullYear() - year,
        job: job,
        address: address,
        about: about,
      },
      image: {
        name: "",
        url: "",
      },
      points: 0,
      recycles: 0,
    });
  }
  const idToken = await userCredential.user.getIdToken();
  res.json({ userId: user.uid, idToken });
};

// Login users
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ error: "Email and password are required" });
  }
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const idToken = await userCredential.user.getIdToken();
  const userId = userCredential.user.uid;
  res.json({ idToken, userId });
};

// Sign user out
exports.signOut = (req, res) => {
  signOut(auth)
    .then(() => {
      // destroy session data
      console.log("Sign out successful");
      req.session = null;
      res.send("Signout successfully! ");
    })
    .catch((e) => {
      console.log(e);
      res.send("Sign out failed");
    });
};
