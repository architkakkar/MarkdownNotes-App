import React, { useEffect, useState } from "react"
import Split from "react-split"
import { nanoid } from "nanoid"
// import { data } from "./data"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"

function App() {
  // Initialize notes from localStorage if exist or empty array
  // Using React Lazy State Initialization to not initialize everytime App Renders.
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes")) || [])
  // Set current note ID to first note's ID or empty string
  const [currentNoteId, setCurrentNoteId] = useState((notes[0] && notes[0].id) || "")

  // Update localStorage when notes state change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  // Create a new note with unique ID and default text
  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here"
    }

    setNotes(prevNotes => [...prevNotes, newNote])
    setCurrentNoteId(newNote.id)
  }

  // Find the current note by ID or return the first note
  function findCurrentNote() {
    return notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0]
  }

  // Update the body of the current note
  function updateNote(text) {
    setNotes(oldNotes => {
      return oldNotes.map(oldNote => {
        return oldNote.id === currentNoteId
          ? { ...oldNote, body: text }
          : oldNote
      })
    })
  }

  // Render the Main component
  return (
    <main>
      {
        // Checking if there are any notes
        notes.length > 0
          ?
          // If there are notes, render the Split component with Sidebar and Editor
          <Split
            sizes={[20, 80]}
            direction="horizontal"
            className="split"
          >
            <Sidebar
              newNote={createNewNote}
              notes={notes}
              currentNote={findCurrentNote()}
              setCurrentNoteId={setCurrentNoteId}
            />
            {
              currentNoteId &&
              notes.length > 0 &&
              <Editor
                currentNote={findCurrentNote()}
                updateNote={updateNote}
              />
            }
          </Split>
          :
          // If there are no notes, render a message and a button to create a new note
          <div className="no-notes">
            <h1>You have no notes</h1>
            <button
              className="first-note"
              onClick={createNewNote}
            >
              Create New Note
            </button>
          </div>
      }
    </main>
  )
}

export default App
