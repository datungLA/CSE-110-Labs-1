import { Note, Label } from "./types"
import "../App.css"
import { ToggleTheme } from './hooksExercise'
type Props = {
    note: Note,
    setNote: React.Dispatch<React.SetStateAction<Note>>
    handleAdd: (e: React.FormEvent) => void
}

const InputField = ({ note, setNote, handleAdd }: Props) => {
    return (
        <div className="note-form">
            <form onSubmit={(e) => { handleAdd(e) }}>
                <div>
                    <input placeholder="Note Title" type="input" value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} required>
                    </input>
                </div>
                <div>
                    <textarea placeholder="Note Content" value={note.content} onChange={(e) => setNote({ ...note, content: e.target.value })} required>
                    </textarea>
                </div>
                <div>
                    <select value={note.label} onChange={(e) => setNote({ ...note, label: e.target.value as Label })}>
                        <option value={Label.personal}>Personal</option>
                        <option value={Label.study}>Study</option>
                        <option value={Label.work}>Work</option>
                        <option value={Label.other}>Other</option>
                    </select>
                </div>
                <div><button type="submit">Create Note</button></div>
            </form>
            <ToggleTheme />
        </div>
    )
}

export default InputField