import React, { useState, useContext } from 'react';
import './App.css';
import InputField from './components/InputField';
import NoteList from './components/NoteList';
import { Note, initialNoteValue } from "./components/types";
import { dummyNoteList } from './components/constant';
import { ThemeContext, themes } from './components/themeContext';
function App() {
  const [note, setNote] = useState<Note>(initialNoteValue);
  const [notes, setNotes] = useState<Note[]>(dummyNoteList.map(note => ({ ...note, isLiked: false, isDone: false })));
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (note) {
      setNotes([...notes, { id: Date.now(), title: note.title, label: note.label, content: note.content, isLiked: false, isDone: false }]);
      setNote(initialNoteValue);
    }
  }

  return (
    <div className="app-container">
      <InputField note={note} setNote={setNote} handleAdd={handleAdd} />
      <NoteList notes={notes} setNotes={setNotes} />
    </div>
  );
}

export default App;
