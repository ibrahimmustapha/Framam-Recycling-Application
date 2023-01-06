const { initializeApp } = require('firebase/app');
const { getFirestore, addDoc, collection, getDocs, setDoc } =  require('firebase/firestore');
const Config = require("../firebase-config");

// Initialize Firebase
const app = initializeApp(Config.firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

exports.addUserDetails = async (req, res) => {
    try {
        const { firstname, lastname, age, address} = req.body;
        const docRef = await addDoc(collection(db, "user_details"), {
            firstname: firstname,
            lastname: lastname,
            age: age,
            address: address
        });
        console.log("Document added with ID: ", docRef.id);
        res.send("Successfully Added to database");
    } catch (e) {
        console.log("Error occurred while adding user details: ", e);
    }
}

exports.getUserDetails = async (req, res) => {
    try {
        const querySnapshot = await getDocs(collection(db, "user_details"))
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            res.json(doc.data());
        })
        // res.redirect("/");
    } catch (e) {
        console.log("Error occurred while getting user details: ", e);
    }
}