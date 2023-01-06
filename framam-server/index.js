const express = require('express');
const app = express();
const cors = require('cors');
const {initializeApp} = require('firebase/app');
const auth = require('./routes/auth-router');
const userData = require('./routes/user_data_router');
const Config = require('./firebase-config');

// Initialize Firebase
initializeApp(Config.firebaseConfig);

const port = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(express.json())
app.use(cors());
app.options('*',cors());

app.use(auth);
app.use(userData);

app.get('/', (req, res) => {
    res.send('Welcome to Framam Recycling!');
})

app.listen(port, () => {
    console.log(`framam-server listening at http://localhost:${port}`);
})