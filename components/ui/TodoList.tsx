import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { TodoItem } from "./TodoItem";


type Todo = {
    id: string;
    name: string;
    done: boolean;
};

export function TodoList({
    todos,
    onToggle,
    onDelete,
}: {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}) {
    return (
        <Card style={styles.card}>
            <Card.Title title="Tasks" subtitle={`${todos.length} total`} />
            <Card.Content>
                {todos.length === 0 ? (
                    <Text style={styles.empty}>No tasks yet — add one above.</Text>
                ) : (
                    <View style={styles.list}>
                        {todos.map((t) => (
                            <TodoItem key={t.id} todo={t} onToggle={onToggle} onDelete={onDelete} />
                        ))}
                    </View>
                )}
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
    },
    empty: {
        opacity: 0.6,
        paddingVertical: 8,
    },
    list: {
        gap: 10,
    },
});
