import React, { Component } from 'react';
import './EditNote.css';

import { updateNote } from '../../../utils/notes-api-helpers';

class EditNote extends Component {
    state = {
        title: this.props.currentNote.title,
        message: this.props.currentNote.message
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    updateNote = async (event) => {
        const note = {title: this.state.title, message: this.state.message};
        const updatedNote = await updateNote(this.props.currentNote.id, note);
        this.props.handleUpdateNote(updatedNote);
    }    

    render() {
        return (
            <div data-test="form-editnote" className="edit-note">
                <form>
                    <label>Edit Title:</label>
                    <textarea
                        data-test="form-editnote-textarea-title"
                        type="text"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange} />
                    <label>Edit Message:</label>
                    <textarea
                        data-test="form-editnote-textarea-message"
                        type="text"
                        name="message"
                        value={this.state.message}
                        onChange={this.handleChange} /><br />
                    <input 
                        data-test="form-editnote-input-button-updatenote"
                        className="button-primary"
                        type="button"
                        value="Update Note"
                        onClick={this.updateNote} />
                </form>
            </div>
        );
    }
}

export default EditNote;