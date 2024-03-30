import React, { useEffect, useState } from "react"
// External Packages
import Split from "react-split"
import { addDoc, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore"
// Other Files.
import { notesCollection, db } from "./firebase"
// React Components
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"

function App() {
  // Initializing notes as empty array
  const [notes, setNotes] = useState([])
  // Initializing currentNoteId as empty string
  const [currentNoteId, setCurrentNoteId] = useState("")
  // Initializing tempNoteText state to prevent note state to be updated on every change
  const [tempNoteText, setTempNoteText] = React.useState("")

  // Find the current note by ID or return the first note 
  const currentNote = notes.find(note => note.id === currentNoteId) || notes[0]
  // Array to store recently-modified note at the top
  const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt)

  // Sync up our local notes array with the snapshot data on firestore db
  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, function (snapshot) {
      const notesArr = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }))

      setNotes(notesArr)
    })

    return unsubscribe
  }, [])

  // Checks if currentNoteId is not set, then sets it to notes[0].id
  // Before setting checking notes array exist with optional chaining
  useEffect(() => {
    if (!currentNoteId)
      setCurrentNoteId(notes[0]?.id)
  }, [notes])

  // Sets the tempNoteText to the body of the currentNote whenever it changes
  useEffect(() => {
    if (currentNote) {
      setTempNoteText(currentNote.body)
    }
  }, [currentNote])

  // Create an effect that runs any time the tempNoteText changes
  // Delay the sending of the request to Firebase
  // Use setTimeout
  // Use clearTimeout to cancel the timeout
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (tempNoteText !== currentNote.body) {
        updateNote(tempNoteText)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [tempNoteText])


  // Create a new note with default text, firebase takes care to create a unique Id.
  async function createNewNote() {
    const newNote = {
      body: "# Type your markdown note's title here",
      createdAt: Date.now(),
      updatedAt: Date.now()
    }

    const newNoteRef = await addDoc(notesCollection, newNote)
    setCurrentNoteId(newNoteRef.id)
  }

  // Delete the note from firebase DB
  async function deleteNote(noteId) {
    const docRef = doc(db, "notes", noteId)
    await deleteDoc(docRef)
  }

  // Update the body of the current note in firebase DB
  async function updateNote(text) {
    const docRef = doc(db, "notes", currentNoteId)
    await setDoc(docRef, { body: text, updatedAt: Date.now() }, { merge: true })
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
              notes={sortedNotes}
              currentNote={currentNote}
              setCurrentNoteId={setCurrentNoteId}
              deleteNote={deleteNote}
            />
            <Editor
              tempNoteText={tempNoteText}
              setTempNoteText={setTempNoteText}
            />
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
