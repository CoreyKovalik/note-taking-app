const request = require('superagent');
// couldn't get superagent to work with import, just used require per the docs

// helpers for making requests to backend API

const notes = '/api/notes';


const getNotes = async () => {
    const response = await request.get(notes);

    return response.body;
}

const createNote = async (note) => {
    const response = await request.post(notes).send(note);

    return response.body;
}

const getNote = async (id) => {
    const response = await request.get(notes + '/' + id);
    
    return response.body;
}

const updateNote = async (id, noteObject) => {
    const { title, message } = noteObject;

    let updatedNote = {};
    if (title !== undefined) updatedNote.title = title;
    if (message !== undefined) updatedNote.message = message;

    const response = await request.put(notes + '/' + id).send(updatedNote);

    return response.body;
}

const deleteNote = async (id) => {
    const response = await request.delete(notes + '/' + id);

    return response.status;
}

const notesAPI = {
    getNotes: getNotes,
    createNote: createNote,
    getNote: getNote,
    updateNote: updateNote,
    deleteNote: deleteNote
};

export {getNotes, createNote, getNote, updateNote, deleteNote};
export default notesAPI;