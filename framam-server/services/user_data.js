const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  where,
  query,
  setDoc,
  updateDoc,
} = require("firebase/firestore");
const { uploadBytes, ref, getStorage } = require("firebase/storage");
const Config = require("../firebase-config");

// Initialize Firebase
const app = initializeApp(Config.firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth();

const storage = getStorage();

exports.addUserDetails = async (req, res) => {
  try {
    const { firstname, lastname, age, address } = req.body;
    const docRef = await addDoc(collection(db, "user_details"), {
      firstname: firstname,
      lastname: lastname,
      age: age,
      address: address,
    });
    console.log("Document added with ID: ", docRef.id);
    res.send("Successfully Added to database");
  } catch (e) {
    console.log("Error occurred while adding user details: ", e);
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "user"));
    const tempDoc = [];
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      tempDoc.push(doc.id, doc.data());
    });
    res.json(tempDoc);
  } catch (e) {
    console.log("Error occurred while getting user details: ", e);
  }
};

exports.getUserDetail = async (req, res) => {
  const uid = req.params.uid;
  console.log(uid);
  try {
    const ref = doc(db, "user", uid);
    const querySnapshot = await getDoc(ref);
    // if (querySnapshot.exists()) {
    console.log(querySnapshot.data());
    res.send(querySnapshot.data());
    // } else {
    //   console.log("No such doc");
    // }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

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
      res.send("uploaded!");
    })
    .catch((e) => {
      console.log(e.message);
    });
};
