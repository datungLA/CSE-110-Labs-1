export enum Label {
    personal = "personal",
    study = "study",
    work = "work",
    other = "other",
}

export type Note = {
    id: number;
    title: string;
    content: string;
    label: Label;
    isLiked: boolean;
    isDone: boolean;
}

export const initialNoteValue: Note = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    isLiked: false,
    isDone: false,
};