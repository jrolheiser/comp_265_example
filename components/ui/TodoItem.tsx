import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Checkbox, IconButton, Text } from "react-native-paper";
import { Todo, useTodos } from "../contexts/TodoContext";

export function TodoItem({
    todo,
}: {
    todo: Todo;
}) {
    // Use common / shared todo context
    const { toggleTodo, deleteTodo } = useTodos();

    return (
        <View style={styles.row}>
            <Checkbox
                status={todo.done ? "checked" : "unchecked"}
                onPress={() => toggleTodo(todo.id)}
            />
            <Text style={[styles.text, todo.done && styles.done]}>{todo.name}</Text>
            <IconButton icon="trash-can-outline" onPress={() => deleteTodo(todo.id)} />
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    text: {
        flex: 1,
        fontSize: 16,
    },
    done: {
        textDecorationLine: "line-through",
        opacity: 0.5,
    },
});
