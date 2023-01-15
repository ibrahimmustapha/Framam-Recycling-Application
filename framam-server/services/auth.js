const firebase = require("firebase/app");
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
  getDoc
} = require("firebase/firestore");

// Initialize Firebase
const app = firebase.initializeApp(Config.firebaseConfig);

const db = getFirestore(app);
const auth = getAuth();

// Rgister users
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
            }
          });
        }
        console.log(user.uid);
        res.send({uid: user.uid});
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
      return res.status(400).json({ error: "Email and password are required" });
    }
    signInWithEmailAndPassword(auth, email, password).then(
      (userCredentials) => {
        const user = userCredentials.user;
        const ref = doc(db, "user", user.uid);
        const querySnapshot = getDoc(ref);
        querySnapshot.then((users) => {
          res.status(200).json(users.data());
        })
      }
    ).catch(e => res.status(400).json({error: "Authentication Failed. Please try again!"}))
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

exports.testExample = async (req, res) => {
  res.send({ version: "0.0.1 beta" });
};
