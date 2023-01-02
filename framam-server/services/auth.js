const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");
const firebase = require("firebase/app");
const Config = require("../firebase-config");

// Initialize Firebase
firebase.initializeApp(Config.firebaseConfig);

const auth = getAuth();

// Rgister users
exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + "an error occured: " + errorMessage);
      });
    res.redirect("/");
  } catch (e) {
    res.redirect("register");
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

exports.testExample = async (req, res) => {
  res.send({ version: "0.0.1 beta" });
};
