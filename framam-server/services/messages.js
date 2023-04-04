const { initializeApp } = require("firebase/app");
const {
  collection,
  getFirestore,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  QuerySnapshot,
} = require("firebase/firestore");
const Config = require("../firebase-config");

const app = initializeApp(Config.firebaseConfig);

// initialize firebase firestore db
const db = getFirestore(app);

// send message to group
exports.sendMessage = async (req, res) => {
  try {
    const uid = req.params.uid;
    const { id, createdAt, text, user: { _id, name, avatar } = {} } = req.body;

    // get all user data
    const userRef = collection(db, "user");
    const users = await getDocs(userRef);
    const date = new Date();
    let isMessageSent = false;
    // iterate through all the users
    users.forEach((user) => {
      // if a user id is the same as uid.params then set it details with e message
      if (user.data().uid === uid) {
        data = {
          id: uid,
          createdAt: date,
          text,
          user: {
            _id: user.data().email,
            name: user.data().fullname?.firstname,
            avatar: user.data().image?.url,
          },
        };
        const ref = collection(db, "chat");
        addDoc(ref, data);
        isMessageSent = true;
      }
    });
    if (isMessageSent) {
      console.log("Message sent :)")
      res.status(200).json("Message sent :)");
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(400).json("Error: " + err.message);
  }
};

exports.allMessages = async (req, res) => {
  try {
    const ref = collection(db, "chat");
    const q = query(ref, orderBy("createdAt", "desc"));
    const allMessages = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      allMessages.push(doc.data());
    });
    res.status(200).json(allMessages);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Error: " + error.message);
  }
};
