const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  where,
  query,
} = require("firebase/firestore");
const { uploadBytes, ref, getStorage } = require("firebase/storage");
const Config = require("../firebase-config");

// Initialize Firebase
const app = initializeApp(Config.firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

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
    res.send([querySnapshot.data()]);
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
  await uploadBytes(imageRef, file.buffer, metatype).then((snapshot) => {
    console.log(snapshot.metadata);
    res.send("uploaded!");
  }).catch((e) => {
    console.log(e.message);
  })
};