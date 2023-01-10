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
  doc
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
        console.log(auth.currentUser.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + "an error occured: " + errorMessage);
      });
    console.log("Authentication successful!");
    res.send("Authentication successful!");
  } catch (e) {
    res.send("Something went wrong, please try again");
  }
};

// Login users
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    signInWithEmailAndPassword(auth, email, password).then(
      (userCredentials) => {
        const user = userCredentials.user;
        console.log(user);
      }
    );
    res.send("Login successful");
  } catch (err) {
    console.log(err);
  }
};

// Sign user out
exports.signOut = (req, res) => {
  signOut(auth)
    .then(() => {
      console.log("Sign out successful");
      // destroy session data
      req.session = null;
      res.redirect("/api/v1/register");
    })
    .catch((e) => {
      console.log(e);
      res.send("Sign out failed");
    });
};

exports.testExample = async (req, res) => {
  res.send({ version: "0.0.1 beta" });
};
