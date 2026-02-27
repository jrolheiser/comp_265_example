import * as React from "react";
import { StyleSheet, View } from "react-native";
import { PaperProvider, Text, TextInput, Button, Card } from "react-native-paper";
import { TodoList } from "@/components/ui/TodoList";
import { useTodos } from "@/components/contexts/TodoContext";
import { TodoProvider } from "@/components/contexts/TodoProvider";
import { TodoCompleteSummary } from "@/components/ui/TodoCompleteSummary";

export default function TodoAppScreen() {
    return (
        <PaperProvider>
            <TodoProvider>
                <TodoApp></TodoApp>
            </TodoProvider>
        </PaperProvider>
    )
}

function TodoApp() {
    const { addTodo } = useTodos();

    // Text input for new Todo
    const [text, setText] = React.useState("");

    const handleAddPress = () => {
        addTodo(text);
        setText("");
    };

    return (

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
                        <Button mode="contained" onPress={handleAddPress} style={styles.addBtn}>
                            Add
                        </Button>
                    </View>
                </Card.Content>
            </Card>

            <TodoList />
            <TodoCompleteSummary />
        </View>
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
