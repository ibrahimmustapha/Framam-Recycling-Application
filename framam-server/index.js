const express = require('express');
const app = express();
const cors = require('cors');
const {initializeApp} = require('firebase/app');
const auth = require('./routes/auth-router');
const userData = require('./routes/user-data-router');
const reward = require('./routes/reward-router');
const users = require("./routes/users-router");
const messages = require("./routes/messages-router");
const task = require("./routes/task-router");
const tips = require("./routes/tips-router");
const faq = require("./routes/faq-router");
const Config = require('./firebase-config');

// Initialize Firebase
initializeApp(Config.firebaseConfig);

const port = process.env.PORT || 4000;
app.use(express.static('public'));
app.use(express.json())
app.use(cors());
app.options('*',cors());

app.use(auth);
app.use(userData);
app.use(reward);
app.use(users);
app.use(messages);
app.use(tips);
app.use(task);
app.use(faq);

app.get('/', (req, res) => {
    res.send('Welcome to Framam Recycling!');
})

app.listen(port, () => {
    console.log(`framam-server listening at http://localhost:${port}`);
})