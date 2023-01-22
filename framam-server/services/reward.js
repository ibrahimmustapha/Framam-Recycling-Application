const firebase = require("firebase/app");
const Config = require("../firebase-config");
const {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  where,
  query,
  getDocs,
} = require("firebase/firestore");

// Initialize Firebase
const app = firebase.initializeApp(Config.firebaseConfig);

const db = getFirestore(app);

exports.reward = async (req, res) => {
  try {
    for (let i = 0; i < 10; i++) {
      const ref = await addDoc(collection(db, "reward"), {
        token: Math.random().toString(36).slice(2),
        isTaken: false
      });
    }
    res.status(200).json("reward added successfully!");
  } catch (e) {
    console.log(e.message);
  }
};

exports.getReward = async (req, res) => {
  const token = req.params.token;
  console.log(token);
  try {
    const ref = query(collection(db, "reward"), where("token", "==", token));
    const updatedToken = await getDocs(ref);
    updatedToken.forEach((doc) => {
      // if isTken field equals 'true', means rewards has being used
      if (doc.data().isTaken === true) {
        res.status(401).json("Sorry, Reward has already been used!")
      }
      // else update token (reward)
      updateDoc(doc.ref ,{isTaken: true})
    })
    res.status(200).json("Hurray! You have +20 points!");
  } catch (e) {
    console.log(e.message);
  }
};
