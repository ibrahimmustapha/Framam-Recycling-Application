const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  getDocs,
  doc,
} = require("firebase/firestore");
const Config = require("../firebase-config");

// Initialize Firebase
const app = initializeApp(Config.firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// get all users
exports.getUsers = async (req, res) => {
  try {
    const ref = collection(db, "user");

    const users = await getDocs(ref);
    const allUsers = [];
    users.forEach((user) => {
      allUsers.push(user.data());
    });
    res.send(allUsers);
  } catch (e) {
    res.status(401).json(e.message);
  }
};
