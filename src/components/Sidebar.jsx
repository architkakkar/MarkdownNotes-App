import React from "react"

export default function Sidebar(props) {
    // Map over the notes array to create a list of note elements
    const noteElements = props.notes.map((note) => (
        <div key={note.id}>
            {/* Div for each note, with a class indicating if it's the selected note */}
            <div
                className={`title ${note.id === props.currentNote.id ? "selected-note" : ""}`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{(note.body).split('\n')[0]}</h4>
                <button
                    className="delete-btn"
                    onClick={(event) => props.deleteNote(event, note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    ))

    // Render the Sidebar component
    return (
        <section className="pane sidebar">
            <div className="sidebar-header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
