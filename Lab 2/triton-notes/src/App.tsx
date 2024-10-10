import './App.css';
import React, { useEffect, useState, useContext, MouseEventHandler } from 'react';
import { Label } from "./types.ts"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants.ts";
import ClickCounter from './hooksExercise.tsx';
import ToggleTheme from './hooksExercise.tsx';
import { ThemeContext, themes } from "./ThemeContext.ts";

function App() {
  const [notes, setNotes] = useState(dummyNotesList); 
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState(initialNote);
  const [likes, setLikes] = useState([false, false, false, false, false, false]);

  const [selectedNote, setSelectedNote] = useState<{id: number;
                                                    title: string;
                                                    content: string;
                                                    label: Label;}>(initialNote);

  const [editList, setEditList] = useState([false, false, false, false, false, false]);

  useEffect(() => {
    const titleInput = document.getElementById("title");
    const contentTextarea = document.getElementById("content");

    const handleFocus = (event) => {
      event.target.style.backgroundColor = "#e0f7fa"; // Light blue background on focus
    };

    const handleBlur = (event) => {
      event.target.style.backgroundColor = ""; // Reset background on blur
    };

    if (titleInput) {
      titleInput.addEventListener("focus", handleFocus);
      titleInput.addEventListener("blur", handleBlur);
    }

    if (contentTextarea) {
      contentTextarea.addEventListener("focus", handleFocus);
      contentTextarea.addEventListener("blur", handleBlur);
    }

    // Clean up event listeners on unmount
    return () => {
      if (titleInput) {
        titleInput.removeEventListener("focus", handleFocus);
        titleInput.removeEventListener("blur", handleBlur);
      }

      if (contentTextarea) {
        contentTextarea.removeEventListener("focus", handleFocus);
        contentTextarea.removeEventListener("blur", handleBlur);
      }
    };
  }, []);
  const createNoteHandler = (event) => {
    event.preventDefault();
    if (!createNote.title || !createNote.content || !createNote.label) {
      alert("Please fill in all the fields before submitting.");
      return;
    }
  
    const newNote = {
      id: notes[notes.length - 1].id + 1, 
      title: createNote.title,
      content: createNote.content,
      label: createNote.label,
    };
  
    setNotes([...notes, newNote]);
  
    setCreateNote(initialNote);

    (document.getElementById("title") as HTMLInputElement).value = "";
    (document.getElementById("content") as HTMLInputElement).value = "";
  };
  
  const selectNote = (index : string | number) => {
    let selectArray = [...editList];
    selectArray[index] = "true";
    setEditList(selectArray);
    console.log(notes)
  }

  const updateId = () => {
    for (let i = 0; i < notes.length; i++) {
      notes[i].id = i;
    }
  }

  const handleLike = (index: string | number) =>{
    let likeArray = [...likes];
    let likeTemp = likes[index];
    likeArray[index] = !likeTemp;
    setLikes(likeArray);
  };

  const deleteHandler = (index: string | number) =>{
    console.log(notes[index].id, index, likes.length, notes.length);
    updateId();
    setNotes(notes.filter((_, i) => i !== index));
    setLikes(likes.filter((_, i) => i !== index));
  };

  const [currentTheme, setCurrentTheme] = useState(themes.light);
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
    document.body.style.background = currentTheme.foreground;
    document.body.style.color = currentTheme.background;
  };

  return (
    <div className='app-container'>
      <div className='note-creator'>
        <form className="note-form" onSubmit={createNoteHandler}>
          <div>
            <input
              placeholder="Note Title"
              id='title'
              onChange={(event) =>
                setCreateNote({ ...createNote, title: event.target.value })}
              required>
            </input>
          </div>
    
          <div>
            <textarea
            id='content'
              onChange={(event) =>
                setCreateNote({ ...createNote, content: event.target.value })}
              required>
            </textarea>
          </div>
    
        <div>
          <select
            onChange={(event) =>
              setCreateNote({ ...createNote, label: event.target.value as Label})}
            required>
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
        </div>
    
          <div><button type="submit">Create Note</button></div>
          <div className="favs">
            <div className='button' onClick={toggleTheme}> Toggle Theme </div>
            <h2>List of Favorites:</h2>
            {likes.map((like, index) => (
              <div>
                {likes[index] == true ? <p>{notes[index].title}</p> : <p></p>}
              </div>
            ))}
          </div>
        </form>
      </div>
      <div className="notes-grid">
        {notes.map((note, index) => (
          <div
            key={note.id}
            className="note-item"
            onClick={() => selectNote(index)}
          >
            <div className="notes-header">
              {likes[index] == true ? <button onClick={() => handleLike(index)}>heart</button> : <button onClick={() => handleLike(index)}>no heart</button>}
              <button onClick={() => deleteHandler(index)}>x</button>
            </div>
            <h2 contentEditable={editList[index]}> {note.title} </h2>
            <p contentEditable={editList[index]}> {note.content} </p>
            <p contentEditable={editList[index]}> {note.label} </p>
          </div>
        ))}
      </div>
    </div>  );
}

export default App;