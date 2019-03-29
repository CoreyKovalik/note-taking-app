const express = require('express');
const notes = express.Router();

const allNotes = require('./all-notes');
const singleNote = require('./single-note');

notes.all('/', allNotes);
notes.all('/:noteid', singleNote);

module.exports = notes;