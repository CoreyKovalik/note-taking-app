import React, { Component } from 'react';
import './FullNote.css';
import moment from 'moment';

import EditNote from './EditNote/EditNote';
import { deleteNote } from '../../utils/notes-api-helpers';

class FullNote extends Component {

    handleDeleteNote = () => {
        const noteid = this.props.currentNote.id;
        deleteNote(noteid);
        this.props.handleDeleteNote(noteid);
    }

    render() {
        const { currentNote, toggleDisplayEditNote, toggleConfirmDelete, deleteNote,
        cancelDelete, handleUpdateNote, editNote } = this.props;
        const updated = moment(currentNote.updatedAt).fromNow(); // ex: 12 minutes ago
        const created = moment(currentNote.createdAt).format("LLLL"); // ex: Sunday, March 3, 2019 8:33 PM

        return (

            <div className="full-note">
                <div className="modify-note">
                    <EditNoteButton toggleDisplayEditNote={toggleDisplayEditNote} />
                    <DeleteNoteButton toggleConfirmDelete={toggleConfirmDelete} />
                    {deleteNote &&
                    <ConfirmDelete 
                        handleDeleteNote={this.handleDeleteNote}
                        cancelDelete={cancelDelete} />
                    }
                </div>
                <div data-test={"full-note-id-" + currentNote.id} className="note">
                    <h2 data-test="full-note-title" className="note-title">{currentNote.title}</h2>
                    <p>
                        last updated: {updated}
                        <br />
                        <em>originally created: {created}</em>
                    </p>
                    <p data-test="full-note-message" className="note-message">{currentNote.message}</p>
                </div>
                {editNote &&
                    <EditNote 
                        currentNote={currentNote}
                        handleUpdateNote={handleUpdateNote} />
                }
            </div>
        );
    }
}

const EditNoteButton = (props) => {
    const { toggleDisplayEditNote } = props;
    return (
        <div className="edit-note-button">
            <button
                data-test="button-editnote"
                className="button-primary" 
                type="button"
                value="Edit"
                onClick={toggleDisplayEditNote}>Edit</button>
        </div>
    );
}

const DeleteNoteButton = (props) => {
    const { toggleConfirmDelete } = props;
    return (
        <div className="delete-note-button">
            <button
                data-test="button-deletenote"
                className="button-primary" 
                type="button"
                value="Edit"
                onClick={toggleConfirmDelete}>Delete</button>
        </div>
    );
}

const ConfirmDelete = (props) => {
    const { handleDeleteNote, cancelDelete } = props;
    return (
        <div className="confirm-delete">
            <span className="confirm-prompt">Are you sure?</span>
            <button
                data-test="button-confirm-deletenote"
                className="delete-button button-primary"
                type="button"
                value="Delete"
                onClick={handleDeleteNote}>Delete</button>
            <button
                data-test="button-cancel-deletenote"
                className="cancel-button button-primary"
                type="button"
                value="Cancel"
                onClick={cancelDelete}>Cancel</button>
        </div>
    );
}

export default FullNote;
