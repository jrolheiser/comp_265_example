import React from "react";
import { TodoContext, Todo } from "./TodoContext";
import { Storage } from "@/components/utilities/db";

export function TodoProvider({ children }: { children: React.ReactNode }) {
    // Todo list state data, hydrated from Storage
    const [currentTodos, setToDos] = React.useState<Todo[]>(Storage.loadDataSync('todos') as Todo[] || []);

    // Helper to update local state and persist to Storage
    const updateTodos = (newTodos: Todo[]) => {
        setToDos(newTodos);
        Storage.saveDataSync('todos', newTodos);
    };

    // Cleans the text, makes and adds a new Todo element
    const addTodo = (text: string) => {
        const trimmed = text.trim();
        if (!trimmed) return;

        const newTodo: Todo = {
            id: String(Date.now()),
            name: trimmed,
            done: false,
        };

        updateTodos([...currentTodos, newTodo]);
    };

    // Checks off a Todo
    const toggleTodo = (id: string) => {
        updateTodos(currentTodos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    };

    // Deletes a Todo
    const deleteTodo = (id: string) => {
        updateTodos(currentTodos.filter((t) => t.id !== id));
    };

    const value = {
        todos: currentTodos,
        addTodo,
        toggleTodo,
        deleteTodo,
    };

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}