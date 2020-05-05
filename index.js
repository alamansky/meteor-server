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
    //console.log(req.body);

    let read = {
        correct: req.body.correct,
        providedRead: req.body.read,
        userRead: req.body.userRead
    }
    sessionModel.findOneAndUpdate({ sessionID: req.body.sessionID }, { $push: { reads: read } }, (err, session) => {

        if (err) {
            console.log(err);
        }
        else if (session) {
            console.log(session);
        } else if (!session) {
            console.log('no session matches that ID. Creating session...');
            let newSession = sessionModel({ sessionID: req.body.sessionID, read: [{ correct: req.body.correct, providedRead: req.body.read, userRead: req.body.userRead }], fsr: req.body.fsr });
            newSession
                .save()
                .then(session => {
                    console.log(
                        `added the following session to database:\n ${JSON.stringify(
                            session,
                            null,
                            2
                        )}`
                    );
                });
        }

        /*  sessionModel.findOne({ sessionID: req.body.sessionID }, function (err, session) {
             if (err) {
                 console.log(err);
             }
             else if (session) {
                 console.log(session);
             } else if (!session) {
                 console.log('no sessions match that ID')
             }
         }) */

        /* let newSession = sessionModel(req.body);
        newSession
          .save()
          .then(book => {
            console.log(
              `added the following book to database:\n ${JSON.stringify(
                book,
                null,
                2
              )}`
            ); */
    });
});

app.listen(PORT, () => console.log(`meteor-server listening on port ${PORT}`))