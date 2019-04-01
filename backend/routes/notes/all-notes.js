const express = require('express');
const router = express.Router();

// firebase Add the SDK
const admin = require('firebase-admin');
const serviceAccount = require('../../utils/firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://express-note-taking-app.firebaseio.com/'
});

const db = admin.database().ref();
const notesRef = db.child("notes");

const { Store, Note } = require('../../utils/notes');
const { addMoreNotes, moreNotes } = require('../../utils/more-notes');
addMoreNotes(Store, Note, moreNotes); // add more notes to work with

// root/api/notes
router.route('/')
    .get((req, res) => {
        const notes = Store.getNotes();
        res.status(200).send(notes);
    })
    .post((req, res) => {
        if (!req.body.title || !req.body.message)
            return res.status(400).send('title and message require content');

        const note = {title: req.body.title, message: req.body.message};
        const newNoteRef = notesRef.push();
        const now = new Date();
        // create a note?
        newNoteRef.set({
            key: newNoteRef.key,
            title: note.title,
            message: note.message,
            createdAt: now.valueOf(),
            updatedAt: now.valueOf()
        });

        // const note = new Note(req.body.title, req.body.message);
        Store.writeNote(note);

        res.status(201).send(note);
    })

module.exports = router;