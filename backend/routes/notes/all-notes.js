const express = require('express');
const router = express.Router();

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
        const note = new Note(req.body.title, req.body.message);

        Store.writeNote(note);
        res.status(201).send(note);
    })

module.exports = router;