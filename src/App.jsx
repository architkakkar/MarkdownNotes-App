import React from "react"
import Split from "react-split"
import { nanoid } from "nanoid"
// import { data } from "./data"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"

function App() {
  const [notes, setNotes] = React.useState([])
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes[0] && notes[0].id) || ""
  )

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here"
    }

    setNotes(prevNotes => [...prevNotes, newNote])
    setCurrentNoteId(newNote.id)
  }

  function findCurrentNote() {
    return notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0]
  }

  function updateNote(text) {
    setNotes(oldNotes => {
      return oldNotes.map(oldNote => {
        return oldNote.id === currentNoteId
          ? { ...oldNote, body: text }
          : oldNote
      })
    })
  }

  return (
    <main>
      {
        notes.length > 0
          ?
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
