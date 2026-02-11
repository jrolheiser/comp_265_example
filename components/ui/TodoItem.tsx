import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Checkbox, IconButton, Text } from "react-native-paper";

type Todo = {
    id: string;
    name: string;
    done: boolean;
};

export function TodoItem({
    todo,
    onToggle,
    onDelete,
}: {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}) {
    return (
        <View style={styles.row}>
            <Checkbox
                status={todo.done ? "checked" : "unchecked"}
                onPress={() => onToggle(todo.id)}
            />
            <Text style={[styles.text, todo.done && styles.done]}>{todo.name}</Text>
            <IconButton icon="trash-can-outline" onPress={() => onDelete(todo.id)} />
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
