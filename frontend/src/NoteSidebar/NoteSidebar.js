import React, { Component } from 'react';
import './NoteSidebar.css';
import NotesList from './NotesList/NotesList';
import { getNotes } from '../utils/notes-api-helpers'

class NoteSidebar extends Component {
    
    componentDidMount = async () => {
        const notes = await getNotes();
        this.props.getNotes(notes);
    }    

    render() {
        const { notes, displayNewNote, handleSelectNote } = this.props;
        return (
            <div className="note-sidebar">
                <NewNoteButton displayNewNote={displayNewNote} />
                <NotesList 
                    notes={notes}
                    handleSelectNote={handleSelectNote} />
            </div>
        );
    }
}

const NewNoteButton = (props) => {
    const { displayNewNote } = props;
    return (
        <div className="new-note-button">
            <button
                data-test="button-newnote"
                className="button-primary" 
                type="button"
                value="New"
                onClick={displayNewNote}>New</button>
        </div>
    );
}

export default NoteSidebar;