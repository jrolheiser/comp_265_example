import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Demos" }} />
            <Stack.Screen name="exercise_1" options={{ title: "Exercise 1" }} />
            <Stack.Screen name="feb_4" options={{ title: "Feb 4th" }} />
            <Stack.Screen name="kitchen_sink" options={{ title: "Kitchen Sink" }} />
            <Stack.Screen name="flip_card" options={{ title: "Flip Card" }} />
        </Stack>
    );
}