import React, { Component } from 'react';
import './NotesList.css';

class NotesList extends Component {
    
    selectNote = (event) => {
        const note = JSON.parse(event.target.attributes['data-note'].value);
        this.props.handleSelectNote(note);
    }

    render() {
        const notes = this.props.notes.map((note, index) => {
            return (
                <div
                    data-test-notes={"id-" + note.id}
                    key={note.id}
                    className="note"
                    onClick={this.selectNote}
                    data-note={JSON.stringify(note)}
                >
                    <h5 className="title-overflow" data-note={JSON.stringify(note)}>{note.title}</h5>
                    <p className="message-overflow" data-note={JSON.stringify(note)}>{note.message}</p>
                </div>
            );

        });

        return (
            <div className="notes-list">
                <div className="notes" data-test="notes-list">{notes}</div>
            </div>
        );        
    }
}

export default NotesList;