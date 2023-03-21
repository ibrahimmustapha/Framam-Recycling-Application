const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const {
  getFirestore,
  collection,
  getDoc,
  doc,
  updateDoc,
  getDocs,
} = require("firebase/firestore");
const { uploadBytes, ref, getStorage } = require("firebase/storage");
const Config = require("../firebase-config");

// Initialize Firebase
const app = initializeApp(Config.firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth();

const storage = getStorage();

// get user based on uid
exports.getUserDetail = async (req, res) => {
  const uid = req.params.uid;
  console.log(uid);
  try {
    const ref = doc(db, "user", uid);
    const querySnapshot = await getDoc(ref);
    console.log(querySnapshot.data());
    res.send(querySnapshot.data());
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

// get user with most recycling points
exports.userWithMostPoints = async (req, res) => {
  try {
    const ref = collection(db, "user");
    const users = await getDocs(ref);
    const allUsers = [];
    let mostPoints = {};
    users.forEach((user) => {
      allUsers.push(user.data());
      mostPoints = allUsers.reduce((max, user) => {
        return max.points > user.points ? max : user;
      })
    });
    res.status(200).json(mostPoints);
  } catch (e) {
    res.status(401).json(e.message);
  }
}

// upload user photo
exports.uploodPhoto = async (req, res) => {
  const file = req.file;
  const imageRef = ref(storage, file.originalname);
  const metatype = { contentType: file.mimetype, name: file.originalname };
  await uploadBytes(imageRef, file.buffer, metatype)
    .then((snapshot) => {
      const ref = doc(collection(db, "user"), auth.currentUser.uid);
      updateDoc(ref, {
        image: {
          name: file.originalname,
          url: `https://firebasestorage.googleapis.com/v0/b/framam-recycling-application.appspot.com/o/${file.originalname}?alt=media&token=84102417-ad8c-4b73-9eae-829bee3fb6a3`,
        },
      });
      console.log(snapshot.metadata);
      res.send("image uploaded!");
    })
    .catch((e) => {
      console.log(e.message);
    });
};
