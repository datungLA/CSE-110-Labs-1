import { Note } from "./types"

type Props = {
    notes: Note[]
}

const FavoriteList = ({ notes }: Props) => {
    const favoriteTitles = notes.filter(note => note.isLiked)
    return (
        <div className="favorite-list">
            <h3>List of favorites:</h3>
            <ul>
                {favoriteTitles.map((note) => (
                    <li key={note.id}>{note.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default FavoriteList