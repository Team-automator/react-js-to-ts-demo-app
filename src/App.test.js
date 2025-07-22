import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Mocking child components
jest.mock("./components/TodoForm", () => () => (
    <div data-testid="mock-todo-form">Mock TodoForm</div>
));

jest.mock("./components/TodoList", () => () => (
    <div data-testid="mock-todo-list">Mock TodoList</div>
));

jest.mock("./components/FilterButtons", () => () => (
    <div data-testid="mock-filter-buttons">Mock FilterButtons</div>
));

describe("React 17 Todo App (with mocked components)", () => {
    test("renders app title", () => {
        render(<App />);
        const title = screen.getByTestId("app-title");
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent("React 17 Todo App");
    });

    test("renders mocked components", () => {
        render(<App />);
        expect(screen.getByTestId("mock-todo-form")).toBeInTheDocument();
        expect(screen.getByTestId("mock-todo-list")).toBeInTheDocument();
        expect(screen.getByTestId("mock-filter-buttons")).toBeInTheDocument();
    });
});
