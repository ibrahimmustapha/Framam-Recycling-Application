const firebase = require("firebase/app");
const Config = require("../firebase-config");
const { getAuth } = require("firebase/auth");
const {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  where,
  query,
  getDocs,
  increment,
} = require("firebase/firestore");

// Initialize Firebase
const app = firebase.initializeApp(Config.firebaseConfig);

// initialize database
const db = getFirestore(app);

// intialize authentication
const auth = getAuth();

// Add new tokens for rewards [x - times]
exports.reward = async (req, res) => {
  try {
    for (let i = 0; i < 10; i++) {
      const ref = await addDoc(collection(db, "reward"), {
        token: Math.random().toString(36).slice(2),
        isTaken: false,
      });
    }
    res.status(200).json("reward added successfully!");
  } catch (e) {
    console.log(e.message);
  }
};

// Load reward and gain points eg. 100pts
exports.getReward = async (req, res) => {
  const token = req.params.token;

  console.log(token);
  try {
    const ref = query(collection(db, "reward"), where("token", "==", token));

    // return all data in the collection
    const getAllDocs = await getDocs(ref);

    getAllDocs.forEach((docs) => {
      // if isTken field equals 'true', means rewards has being used
      if (docs.data().isTaken === true) {
        res.status(400).json("Sorry, Reward has already been used!");
        process.exit(0);
      }
      // else update token (reward)
      const updatedPoints = updateDoc(docs.ref, { isTaken: true });

      // if reward field isTaken is set to true update points field by adding +100 to points
      if (updatedPoints) {
        const ref = doc(collection(db, "user"), auth.currentUser.uid.toString());
        updateDoc(ref, {
          points: increment(100),
        });
        console.log(auth.currentUser);
      } else {
        console.log("something went wrong :(");
      }
    });

    res.status(200).json("Hurray! You have gained 100 points!");
  } catch (e) {
    console.log(e.message);
  }
};
