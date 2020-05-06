const express = require('express')
const app = express()
const cors = require('cors');

const DEV_MODE = process.argv[2] && process.argv[2] == "--dev";
const DEFAULT_PORT = DEV_MODE ? 3000 : 443;
const PORT = process.env.PORT || DEFAULT_PORT;

const db = require("./db");
let sessionModel = require("./models/session");

app.use(cors())

app.use(express.json());

app.get('/read', async (req, res) => {
    let sessions = await sessionModel.find().then(sessions => sessions);
    return res.send(sessions)
})

app.post('/read', (req, res) => {

    let newSession = sessionModel({ sessionID: req.body.sessionID, reads: req.body.history, fsr: req.body.fsr });
    newSession.save();
    return res.status(200).end();
});

app.listen(PORT, () => console.log(`meteor-server listening on port ${PORT}`))