const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
} = require("firebase/firestore");
const Config = require("../firebase-config");
const { getStorage, uploadBytes, ref } = require("firebase/storage");

// Initialize Firebase
const app = initializeApp(Config.firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth();

exports.addQuestion = async (req, res) => {
  const { id, title, description, answer } = req.body;
  try {
    const faqRef = collection(db, "faq");
    const newFaqRef = doc(faqRef);

    await addDoc(faqRef, {
      id: newFaqRef.id,
      title,
      description,
      answer: "NOT ANSWERED YET!",
      createdAt: new Date(),
    });

    res.status(200).json("Question added successfully...");
  } catch (e) {
    console.log(e);
    res.status(400).json(e.message);
  }
};

exports.allQuestion = async (req, res) => {
  try {
    const ref = collection(db, "faq");

    const faqs = await getDocs(ref);
    const allFaqs = [];

    faqs.forEach((faq) => {
      allFaqs.push(faq.data());
    });

    res.json(allFaqs);
  } catch (e) {
    res.status(401).json(e.message);
  }
};
