import React/*, { Component }*/ from 'react';
import './Display.css';

import FullNote from './FullNote/FullNote';
import NewNote from './NewNote/NewNote';

const Display = (props) => {
    const { display, currentNote, editNote, deleteNote, handleDeleteNote, cancelDelete,
    toggleDisplayEditNote, handleUpdateNote, toggleConfirmDelete, handleCreateNote } = props;

    return (
        <div className="display">
            {display === 'FullNote' && 
                <FullNote 
                    currentNote={currentNote}
                    editNote={editNote}
                    deleteNote={deleteNote}
                    handleDeleteNote={handleDeleteNote}
                    cancelDelete={cancelDelete}
                    toggleDisplayEditNote={toggleDisplayEditNote}
                    handleUpdateNote={handleUpdateNote}
                    toggleConfirmDelete={toggleConfirmDelete} />
            }
            {display === 'NewNote' && 
                <NewNote handleCreateNote={handleCreateNote} />
            }
        </div>
    );
}

export default Display;
