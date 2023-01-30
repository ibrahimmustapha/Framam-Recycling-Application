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
    .catch(() => { res.status(401).json({ message: "Unauthorized"})});
};

// Register users
exports.registerUser = async (req, res) => {
  try {
    const {
      email,
      password,
      fullname: { firstname, lastname },
      bio: { age, job, address },
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        // if user is registered add the following data to the user doc [db].
        if (user) {
          const ref = doc(collection(db, "user"), auth.currentUser.uid);
          const username = `${firstname}${lastname}${age}`;
          setDoc(ref, {
            email: auth.currentUser.email,
            uid: auth.currentUser.uid,
            username: username.toLowerCase(),
            fullname: {
              firstname: firstname,
              lastname: lastname,
            },
            bio: {
              age: age,
              job: job,
              address: address,
            },
            image: {
              name: "",
              url: "",
            },
            points: 0,
          });
        }
        console.log(user.uid);
        res.send({ uid: user.uid });
      })
      .catch((error) => {
        console.log("an error occured: " + error.message);
      });
    console.log("Authentication successful!");
    // res.send(auth.currentUser.uid);
  } catch (e) {
    res.status(400).json("Registration Failed. Please try again!");
  }
};

// Login users
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ error: "Email and password are required" });
  }
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      const userId = userCredential.user.uid;
      res.json({idToken, userId})
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
