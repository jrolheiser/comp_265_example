import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text>Demo Examples</Text>

            <Link href="/demos/exercise_1" style={styles.button}>
                Go to Basic Styled Weather App (Exercise 1)
            </Link>

            <Link href="/demos/feb_4" style={styles.button}>
                Go to Weather App with Tables (Feb 4th)
            </Link>

            <Link
                href={{
                    pathname: "/demos/kitchen_sink",
                }}
                style={styles.button}
            >
                Go to Kitchen Sink (Multi State Data Panel)
            </Link>

            <Link
                href={{
                    pathname: "/demos/flip_card",
                }}
                style={styles.button}
            >
                Go to Flip Card Example
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#007bff",
        color: "white",
        borderRadius: 5,
        textAlign: "center",
    },
});