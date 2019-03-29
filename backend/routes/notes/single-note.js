const express = require('express');
const router = express.Router();

const { Store, Note } = require('../../utils/notes');

// root/api/notes/:noteid
router.route('/:noteid')
    .get((req, res) => {
        const id = req.params.noteid;
        const note = Store.getNote(id);
        if (note === null)
            return res.status(400).send(`id ${id} does not exist`);

        res.status(200).send(note);
    })
    .put((req, res) => {
        const id = req.params.noteid;
        const note = Store.getNote(id);

        if (req.body.title !== undefined)
            note.title = req.body.title;
        if (req.body.message !== undefined)
            note.message = req.body.message;
        
        Store.writeNote(note);
        res.status(200).send(note);
    })
    .delete((req, res) => {
        const id = req.params.noteid;
        const note = Store.getNote(id);
        if (note === null)
            return res.status(400).send(`No note with id ${id}`);

        Store.deleteNote(note.id);
        res.status(204).send();
    })
    
module.exports = router;