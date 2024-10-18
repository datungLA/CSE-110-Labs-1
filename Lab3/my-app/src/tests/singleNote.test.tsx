import { render, screen, fireEvent } from "@testing-library/react";
import SingleNote from "../components/SingleNote";
import { Note, Label } from "../components/types";
import { AiFillEdit } from "react-icons/ai";
import '@testing-library/jest-dom';
describe('Reading StickyNote', () => {
    it('renders note title and content', () => {
        // Define a mock note
        const mockNote: Note = {
            id: 1,
            title: "Test Note",
            content: "This is a test note content.",
            label: "work" as Label,
            isLiked: false,
            isDone: false
        };

        // Mock setNotes function
        const mockSetNotes = jest.fn();

        // Render the SingleNote component
        render(<SingleNote note={mockNote} notes={[mockNote]} setNotes={mockSetNotes} />);

        // Check that the note's title is displayed
        const noteTitle = screen.getByText("Test Note");
        expect(noteTitle).toBeInTheDocument();

        // Check that the note's content is displayed
        const noteContent = screen.getByText("This is a test note content.");
        expect(noteContent).toBeInTheDocument();

        // Check that the note's label is displayed
        const noteLabel = screen.getByText("work");
        expect(noteLabel).toBeInTheDocument();

        // Verify that input fields for editing are not visible when not in edit mode
        const titleInput = screen.queryByRole("textbox");
        expect(titleInput).not.toBeInTheDocument();
    });

    it('allows editing and updates the note', () => {
        // Define a mock note
        const mockNote: Note = {
            id: 1,
            title: "Test Note",
            content: "This is a test note content.",
            label: "work" as Label,
            isLiked: false,
            isDone: false
        };

        // Mock setNotes function
        const mockSetNotes = jest.fn();

        // Render the SingleNote component
        render(<SingleNote note={mockNote} notes={[mockNote]} setNotes={mockSetNotes} />);

        // Simulate clicking the edit button
        const editButton = screen.getByTestId("edit-button");
        fireEvent.click(editButton);

        // Verify that input fields are now visible
        const titleInput = screen.getByDisplayValue("Test Note");
        expect(titleInput).toBeInTheDocument();
        const contentTextarea = screen.getByDisplayValue("This is a test note content.");
        expect(contentTextarea).toBeInTheDocument();

        // Simulate changing the title and content
        fireEvent.change(titleInput, { target: { value: "Updated Note Title" } });
        fireEvent.change(contentTextarea, { target: { value: "Updated note content." } });

        // Select a different label
        const labelSelect = screen.getByDisplayValue("work");
        fireEvent.change(labelSelect, { target: { value: "personal" } });

        // Simulate submitting the form to save the changes
        const saveButton = screen.getByText("Save");
        fireEvent.click(saveButton);

        // Ensure that setNotes was called with the updated note
        expect(mockSetNotes).toHaveBeenCalledWith([
            {
                id: 1,
                title: "Updated Note Title",
                content: "Updated note content.",
                label: "personal" as Label,
                isLiked: false,
                isDone: false
            }
        ]);

        // Verify that the updated title and content are displayed
        const updatedTitle = screen.getByText("Updated Note Title");
        expect(updatedTitle).toBeInTheDocument();
        const updatedContent = screen.getByText("Updated note content.");
        expect(updatedContent).toBeInTheDocument();
        const updatedLabel = screen.getByText("personal");
        expect(updatedLabel).toBeInTheDocument();
    });
})

describe('Deleting StickyNote', () => {
    it('deletes a note when the delete button is clicked', () => {
        // Define a mock note
        const mockNote: Note = {
            id: 1,
            title: "Test Note",
            content: "This is a test note content.",
            label: "work" as Label,
            isLiked: false,
            isDone: false
        };

        // Another note to ensure proper deletion
        const anotherNote: Note = {
            id: 2,
            title: "Another Note",
            content: "This is another note content.",
            label: "personal" as Label,
            isLiked: false,
            isDone: false
        };

        // Mock setNotes function
        const mockSetNotes = jest.fn();

        // Render the SingleNote component
        render(<SingleNote note={mockNote} notes={[mockNote, anotherNote]} setNotes={mockSetNotes} />);

        // Find the delete button (which is the 'x' span)
        const deleteButton = screen.getByText("x");

        // Simulate clicking the delete button
        fireEvent.click(deleteButton);

        // Assert that setNotes was called with the correct updated note list (without the deleted note)
        expect(mockSetNotes).toHaveBeenCalledWith([anotherNote]);  // The remaining notes after deletion
    });
})