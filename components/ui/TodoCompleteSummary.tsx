import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { Todo, useTodos } from "../contexts/TodoContext";


export function TodoCompleteSummary({ }: {}) {
    // Use common / shared todo logic
    const { todos } = useTodos();

    const completedTodos = todos.filter((t) => t.done);
    const completionSummaryTitle = `${completedTodos.length} of ${todos.length} tasks completed`;
    const completionSummaryMessage = (completedTodos.length === todos.length)
        ? "Great job! You've completed all your tasks."
        : "Keep going! You're almost there.";
    let completionSummaryList = `\nYou have completed: `;
    completedTodos.forEach((todo) => {
        completionSummaryList += `\n- ${todo.name}`;
    });

    return (
        <Card style={styles.card}>
            <Card.Title title="Completed Tasks" subtitle={completionSummaryTitle} />
            <Card.Content>
                <Text>{completionSummaryMessage}</Text>
                <Text>{completionSummaryList}</Text>
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
