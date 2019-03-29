import React, { Component } from 'react';
import './NewNote.css';

import { createNote } from '../../utils/notes-api-helpers';

class NewNote extends Component {
    state = {
        title: "A new note title",
        message: "Message body for the new note"
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    
    createNote = async (event) => {
        const note = {title: this.state.title, message: this.state.message};
        const newNote = await createNote(note);
        this.props.handleCreateNote(newNote);
    }

    render() {
        return (
            <div data-test="form-newnote" className="new-note">
                <form>
                    <label>Title:</label>
                    <textarea
                        data-test="form-newnote-textarea-title"
                        type="text"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange} />
                    <label>Message:</label>
                    <textarea
                        data-test="form-newnote-textarea-message"
                        type="text"
                        name="message"
                        value={this.state.message}
                        onChange={this.handleChange} /><br />
                    <input
                        data-test="form-newnote-input-button-createnote"
                        className="button-primary"
                        type="button"
                        value="Create Note"
                        onClick={this.createNote} />
                </form>
            </div>
        );
    }
}

export default NewNote;
