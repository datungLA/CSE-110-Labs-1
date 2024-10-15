import React, { useState } from 'react'
import { Note, Label } from './types'
import { AiFillEdit } from 'react-icons/ai'
type Props = {
    note: Note
    notes: Note[]
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>
}
const SingleNote = ({ note, notes, setNotes }: Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editNote, setEditNote] = useState<Note>(note);
    const handleFavorite = (id: number) => () => {
        setNotes(notes.map(note => note.id == id ? { ...note, isLiked: !note.isLiked } : note))
    }
    const handleDelete = (id: number) => () => {
        setNotes(notes.filter(note => note.id !== id))
    }
    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault()
        const updatedNotes = notes.map(note => note.id === id ? { ...note, title: editNote.title, content: editNote.content, label: editNote.label } : note)
        setNotes(updatedNotes)
        setEdit(false)
    }

    return (
        <div key={note.id} className='note-item'>
            <form onSubmit={(e) => handleEdit(e, note.id)}>
                <div className="notes-header">
                    <span onClick={() => setEdit(true)}>
                        <AiFillEdit />
                    </span>
                    <span onClick={handleFavorite(note.id)}>
                        {note.isLiked ? '❤️' : '♡'}
                    </span>
                    <span onClick={handleDelete(note.id)}>
                        x
                    </span>
                </div>
                {!edit ? (
                    <>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                        <p>{note.label}</p>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            value={editNote.title}
                            onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
                        />
                        <textarea
                            value={editNote.content}
                            onChange={(e) => setEditNote({ ...editNote, content: e.target.value })}
                        />
                        <select
                            value={editNote.label}
                            onChange={(e) => setEditNote({ ...editNote, label: e.target.value as Label })}
                        >
                            <option value={Label.personal}>Personal</option>
                            <option value={Label.study}>Study</option>
                            <option value={Label.work}>Work</option>
                            <option value={Label.other}>Other</option>
                        </select>
                        <button type="submit">Save</button>
                    </>
                )}
            </form>
        </div>
    )
}

export default SingleNote
