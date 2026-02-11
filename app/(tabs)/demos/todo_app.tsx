import * as React from "react";
import { StyleSheet, View } from "react-native";
import { PaperProvider, Text, TextInput, Button, Card } from "react-native-paper";
import { Storage } from "@/components/utilities/db";
import { TodoList } from "@/components/ui/TodoList";

type Todo = {
    id: string;
    name: string;
    done: boolean;
};

export default function TodoApp() {
    const [todos, setToDos] = React.useState<Todo[]>(Storage.loadDataSync('todos') as Todo[] || []);

    // 3) Local form state (input field)
    const [text, setText] = React.useState("");

    const updateTodos = (newTodos: Todo[]) => {
        setToDos(newTodos);
        Storage.saveDataSync('todos', newTodos);
    };

    const addTodo = () => {
        const trimmed = text.trim();
        if (!trimmed) return;

        const newTodo: Todo = {
            id: String(Date.now()),
            name: trimmed,
            done: false,
        };

        updateTodos([...todos, newTodo]);
        setText("");
    };

    const toggleTodo = (id: string) => {
        updateTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    };

    const deleteTodo = (id: string) => {
        updateTodos(todos.filter((t) => t.id !== id));
    };

    return (
        <PaperProvider>
            <View style={styles.screen}>

                <Text variant="headlineMedium" style={styles.title}>
                    My TODOs
                </Text>

                <Card style={styles.card}>
                    <Card.Title title="Add a new task" />
                    <Card.Content>
                        <View style={styles.row}>
                            <TextInput
                                style={styles.input}
                                mode="outlined"
                                label="Task"
                                value={text}
                                onChangeText={setText}
                                placeholder="Add a new task…"
                            />
                            <Button mode="contained" onPress={addTodo} style={styles.addBtn}>
                                Add
                            </Button>
                        </View>
                    </Card.Content>
                </Card>

                <TodoList
                    todos={todos}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                />
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 16,
        gap: 12,
    },
    title: {
        fontWeight: "700",
    },
    card: {
        borderRadius: 16,
    },
    row: {
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
    },
    input: {
        flex: 1,
    },
    addBtn: {
        justifyContent: "center",
    },
});
