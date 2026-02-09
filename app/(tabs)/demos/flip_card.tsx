import React, { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

export default function FlipCard({
    question,
    answer,
}: {
    question: string;
    answer: string;
}) {
    const [flipped, setFlipped] = useState(false);

    // 0 = front, 1 = back
    const flip = useRef(new Animated.Value(0)).current;

    const flipTo = (toValue: 0 | 1) => {
        Animated.spring(flip, {
            toValue,
            speed: 1,
            useNativeDriver: true, // rotate transforms support native driver
        }).start();
    };

    const onToggle = () => {
        const next = !flipped;
        setFlipped(next);
        flipTo(next ? 1 : 0);
    };

    // Rotation for the FRONT face
    const frontRotateY = flip.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"],
    });

    // Rotation for the BACK face (offset by 180deg)
    const backRotateY = flip.interpolate({
        inputRange: [0, 1],
        outputRange: ["180deg", "360deg"],
    });

    return (
        <Pressable onPress={onToggle} style={styles.wrapper}>
            <View style={styles.cardContainer}>
                {/* FRONT */}
                <Animated.View
                    style={[
                        styles.card,
                        styles.cardFront,
                        { transform: [{ perspective: 1000 }, { rotateY: frontRotateY }] },
                    ]}
                >
                    <Text style={styles.label}>Question</Text>
                    <Text style={styles.mainText}>{question}</Text>
                    <Text style={styles.hint}>Tap to reveal answer</Text>
                </Animated.View>

                {/* BACK */}
                <Animated.View
                    style={[
                        styles.card,
                        styles.cardBack,
                        {
                            transform: [{ perspective: 1000 }, { rotateY: backRotateY }],
                        },
                    ]}
                >
                    <Text style={styles.label}>Answer</Text>
                    <Text style={styles.mainText}>{answer}</Text>
                    <Text style={styles.hint}>Tap to flip back to question</Text>
                </Animated.View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        alignSelf: "stretch",
    },

    cardContainer: {
        height: 180,
    },

    card: {
        position: "absolute",
        inset: 0,
        borderRadius: 16,
        padding: 16,
        borderWidth: StyleSheet.hairlineWidth,
        justifyContent: "center",

        // Required so the "back" doesn't show through when rotated
        backfaceVisibility: "hidden",
    },

    cardFront: {
        backgroundColor: "#FFFFFF",
    },

    cardBack: {
        backgroundColor: "#F3F4F6",
    },

    label: {
        fontSize: 12,
        fontWeight: "700",
        opacity: 0.6,
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: 1,
    },

    mainText: {
        fontSize: 18,
        fontWeight: "700",
    },

    hint: {
        marginTop: 12,
        fontSize: 12,
        opacity: 0.6,
    },
});
