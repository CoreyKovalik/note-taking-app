import React, { Component } from 'react';
import './css/skeleton.css';
import './App.css';

import NoteSidebar from './NoteSidebar/NoteSidebar';
import Display from './Display/Display';

class App extends Component {
    state = {
        notes: [],
        currentNote: null,
        display: 'NewNote',
        editNote: false,
        deleteNote: false
    }

    // Updates state once NoteSidebar mounts
    getNotes = (notes) => {
        this.setState({
            notes: notes
        });
    }

    // Updates state when user clicks any note in the list
    handleSelectNote = (note) => {
        this.setState({
            currentNote: note,
            display: 'FullNote',
            editNote: false,
            deleteNote: false
        });
    }

    displayNewNote = () => {
        this.setState({
            display: 'NewNote'
        });
    }

    // Updates state when user clicks 'Create Note'
    handleCreateNote = (newNote) => {
        this.setState({
            notes: [...this.state.notes, newNote],
            currentNote: newNote,
            display: 'FullNote'
        });
    }

    // toggles the display of EditNote when user clicks 'Edit'
    toggleDisplayEditNote = () => {
        this.setState({
            editNote: !this.state.editNote,
            deleteNote: false
        })
    }

    // Updates state when user clicks 'Update Note'
    handleUpdateNote = (updatedNote) => {
        const notes = this.state.notes.map(note => {
            if (note.id === updatedNote.id)
                return updatedNote;
            return note;
        });

        this.setState({
            notes: notes,
            currentNote: updatedNote,
            editNote: false,
            deleteNote: false
        })
    }

    // Toggles ConfirmDelete prompt
    toggleConfirmDelete = () => {
        this.setState({
            deleteNote: !this.state.deleteNote
        });
    }

    handleDeleteNote = (deletednoteid) => {
        // re-map the notes array then filter out deleted note
        const notes = this.state.notes.map(note => {
            if (note.id === deletednoteid)
                return null;
            return note;
        }).filter(note => note !== null);

        // find index of deleted note and return index of note just before it
        let newCurrentNoteIndex = this.state.notes.findIndex(note => note.id === deletednoteid) - 1

        if (newCurrentNoteIndex === -1 && this.state.notes.length === 1) // if deleting the last note, display NewNote
        {
            newCurrentNoteIndex = 'empty';
            this.setState({
                currentNote: null,
                display: 'NewNote'
            })
        }
        else if (newCurrentNoteIndex === -1 && this.state.notes.length > 1)
        {
            newCurrentNoteIndex = 0; // otherwise return notes[0]
        }

        this.setState({
            notes: notes,
            currentNote: (newCurrentNoteIndex !== 'empty') ? notes[newCurrentNoteIndex] : null, // if not empty, assign new currentNote, otherwise set as null
            editNote: false,
            deleteNote: false
        });
    }

    cancelDelete = () => {
        this.setState({
            deleteNote: false
        });
    }

    render() {
        const {notes, display, currentNote, editNote, deleteNote } = this.state;
        return (
            <div className="app container">
                <div className="note-sidebar-container">
                    <NoteSidebar
                        getNotes={this.getNotes}
                        notes={notes}
                        handleSelectNote={this.handleSelectNote}
                        displayNewNote={this.displayNewNote} />
                </div>
                <div className="display-container">
                    <Display
                        display={display}
                        currentNote={currentNote}
                        editNote={editNote}
                        deleteNote={deleteNote}
                        handleCreateNote={this.handleCreateNote}
                        handleDeleteNote={this.handleDeleteNote}
                        handleUpdateNote={this.handleUpdateNote}
                        toggleConfirmDelete={this.toggleConfirmDelete}
                        toggleDisplayEditNote={this.toggleDisplayEditNote}
                        cancelDelete={this.cancelDelete} />
                </div>
            </div>
        );
    }
}

export default App;
