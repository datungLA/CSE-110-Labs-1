import { Label } from "./types";
export const dummyNoteList = [
    {
        id: 1,
        title: "Random Thoughts",
        content: "This note contains random ideas and things.",
        label: Label.other,
    },
    {
        id: 2,
        title: "Personal Goals",
        content: "Here are my personal goals for the week.",
        label: Label.personal,
    },
    {
        id: 3,
        title: "Work Project Plan",
        content: "Project X needs to be completed by the end of the month.",
        label: Label.work,
    },
    {
        id: 4,
        title: "Study Plan for Finals",
        content: "Study topics: algorithms, data structures, and databases.",
        label: Label.study,
    },
    {
        id: 5,
        title: "Study Group Agenda",
        content: "Agenda for this week's study group.",
        label: Label.study,
    },
    {
        id: 6,
        title: "Weekend Plans",
        content: "Plans for the weekend.",
        label: Label.personal,
    },
]