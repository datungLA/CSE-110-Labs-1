import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';

test("renders Create Note", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const createNoteElement = screen.getByText(/Create Note/i);
  expect(createNoteElement).toBeInTheDocument();
});