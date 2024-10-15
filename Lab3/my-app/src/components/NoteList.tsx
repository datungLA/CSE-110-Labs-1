import { Note } from "./types"
import "../App.css"
import SingleNote from './SingleNote'
import FavoriteList from './FavoriteList'
type Props = {
    notes: Note[]
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>
}
const NoteList = ({ notes, setNotes }: Props) => {
    return (
        <>
            <div className="notes">
                <div className="notes-grid">
                    {
                        notes.map((note) => (
                            <SingleNote note={note} key={note.id} notes={notes} setNotes={setNotes} />
                        ))
                    }
                </div>
            </div>
            <FavoriteList notes={notes} />
        </>
    )
}

export default NoteList
