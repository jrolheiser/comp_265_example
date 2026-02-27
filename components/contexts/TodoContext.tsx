import React from "react";

// Todo item type / shape / schema
export type Todo = {
    id: string;
    name: string;
    done: boolean;
};

// The shape / schema of our TodoContext object
type TodoContextValue = {
    todos: Todo[];
    addTodo: (name: string) => void;
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
};

// Asking React to create a new context object for us
export const TodoContext = React.createContext<TodoContextValue | null>(null);

// A custom hook that anyone can use to get the current ToDoContext
export function useTodos() {
    const ctx = React.useContext(TodoContext);
    if (!ctx) throw new Error("useTodos must be used inside <TodoProvider>");
    return ctx;
}