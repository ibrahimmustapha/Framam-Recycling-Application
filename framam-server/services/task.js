const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  getDoc,
  updateDoc,
} = require("firebase/firestore");
const Config = require("../firebase-config");
const { getStorage, uploadBytes, ref } = require("firebase/storage");

// Initialize Firebase
const app = initializeApp(Config.firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth();

const storage = getStorage();

// get user based on uid
exports.addNewTask = async (req, res) => {
  const { id, title, description, location, status, createdAt } = req.body;
  try {
    const taskRef = collection(db, "tasks");
    const newTaskRef = doc(taskRef);

    // Upload image to Firebase Storage if an image is provided
    const file = req.file;
    const imageRef = ref(storage, file.originalname);
    const metatype = { contentType: file.mimetype, name: file.originalname };

    // upload task image and update url and name in db storage
    await uploadBytes(imageRef, file.buffer, metatype);

    await addDoc(taskRef, {
      id: newTaskRef.id,
      title,
      description,
      location: "East Legon. Ghana",
      status: status,
      image: {
        name: file.originalname,
        url: `https://firebasestorage.googleapis.com/v0/b/framam-recycling-application.appspot.com/o/${file.originalname}?alt=media&token=84102417-ad8c-4b73-9eae-829bee3fb6a3`,
      },
      createdAt: new Date(),
    });

    res.status(200).json("Task added successfully...");
  } catch (e) {
    console.log(e);
    res.status(200).json(e.message);
  }
};

// get task based on uid
exports.getTaskDetail = async (req, res) => {
  const uid = req.params.uid;
  console.log(uid);
  try {
    const ref = doc(db, "tasks", uid);
    const querySnapshot = await getDoc(ref);
    console.log(querySnapshot.data());
    res.send(querySnapshot.data());
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

// get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const ref = collection(db, "tasks");

    const tasks = await getDocs(ref);
    const allTasks = [];
    tasks.forEach((task) => {
      allTasks.push(task.data());
    });
    res.send(allTasks);
  } catch (e) {
    res.status(401).json(e.message);
  }
};

// upload user photo
exports.uploadPhoto = async (req, res) => {
  const file = req.file;
  const imageRef = ref(storage, file.originalname);
  const metatype = { contentType: file.mimetype, name: file.originalname };
  const currentUserId = auth.currentUser.uid;
  await uploadBytes(imageRef, file.buffer, metatype)
    .then((snapshot) => {
      const ref = doc(collection(db, "tasks"), currentUserId);
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
