const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  getDoc,
  doc,
  getDocs,
  addDoc,
  orderBy,
  query,
} = require("firebase/firestore");
const Config = require("../firebase-config");

// Initialize Firebase
const app = initializeApp(Config.firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// get user based on uid
exports.addNewTip = async (req, res) => {
  const {
    id,
    title,
    description,
    createdAt,
    details: { item1, item2, item3, item4, item5 },
  } = req.body;
  try {
    const ref = collection(db, "tips");
    const newTipRef = doc(ref);
    const newTip = await addDoc(ref, {
      id: newTipRef.id,
      title,
      description,
      createdAt: new Date(),
      details: { item1, item2, item3, item4, item5 },
    });
    if (newTip) {
      res.status(200).json("Tip added successfully");
    }
  } catch (e) {
    console.log(e);
    res.status(200).json(e.message);
  }
};

// first five things in asc order
exports.getFirstFourTips = async (req, res) => {
    try {
        const ref = collection(db, "tips");
        const q = query(ref, orderBy("createdAt", "asc"));
        const tips = await getDocs(q);
        const allTips = [];
        tips.forEach((tip) => {
          allTips.push(tip.data());
        });
        res.status(200).json(allTips.slice(0, 4));
      } catch (e) {
        res.status(401).json(e.message);
      }
}

// all tips here
exports.getAllTips = async (req, res) => {
  try {
    const ref = collection(db, "tips");
    const q = query(ref, orderBy("createdAt", "asc"));
    const tips = await getDocs(q);
    const allTips = [];
    tips.forEach((tip) => {
      allTips.push(tip.data());
    });
    res.status(200).json(allTips);
  } catch (e) {
    res.status(401).json(e.message);
  }
};
