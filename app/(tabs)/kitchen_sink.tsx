import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    TextInput
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

/*
- Mobile Design Thinking:
  - Primitives (Squares, Text, Images)
  - Patterns / Sections
    - Header
    - Nav Bar
    - Main Content
    - Footer
    - Layout Patterns
      - 1/3 2/3 column layout
      - Grid Pattern
    - Forms / Detail Views
    - Feeds
    - Filter Tables
  - Template Views
    - FormPage
    - MediaPlayer (Image Viewer, Video)
    - ConservationView
      - TextInputTray at the bottom
      - ListView
        - Chat Message Bubbles
          - isMine: bool
    - CommentTree
*/


function Card({ title, subtitle, children }) {
    return (
        <ThemedView style={styles.card}>
            <ThemedText style={styles.h2}>{title}</ThemedText>
            <ThemedText style={styles.p}>{subtitle}</ThemedText>
            <CenteredMessage>
                {children}
            </CenteredMessage>
        </ThemedView>
    );
}

function CenteredMessage({ children }) {
    return (
        <ThemedView style={styles.center}>
            {children}
        </ThemedView>
    );
}

/*
Goal for Today:
- Build a `DataPanel` component:
  - This is a Card component
    - But one that handles state gracefully
    - Think of it as a Stateful Card component
  - Props (properties) do I need?
    - state: string (loading | error | empty | success)
    - title: string
    - subtitle: string
    - successContent: <Elements>
    - retryCallback: function
    - errorMessage: string
    - emptyMessage: string
    - loadingMessage: string
*/

function DataPanel({ state, successContent }) {
    // If someone forgets to set `state`
    state = state || "empty";

    return (
        <>
            {state === "loading" && <Card title="Loading State" subtitle="Use when the app is waiting for data.">
                <ActivityIndicator />
                <ThemedText style={styles.muted}>Loading…</ThemedText>
            </Card>}

            {state === "error" && <Card title="Error State" subtitle="Use when something failed. Keep it human, and offer recovery.">
                <ThemedView style={styles.errorBox}>
                    <ThemedText style={styles.errorTitle}>Something went wrong</ThemedText>
                    <ThemedText style={styles.errorMessage}>
                        The server is having trouble. Please try again.
                    </ThemedText>

                    <Pressable
                        style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
                        onPress={() => Alert.alert("Retry", "This would re-fetch data.")}
                    >
                        <ThemedText style={styles.secondaryButtonText}>Retry</ThemedText>
                    </Pressable>
                </ThemedView>
            </Card>}

            {state === "empty" && <Card title="Empty State" subtitle="Use when the app is working, but there's nothing to show.">
                <ThemedText style={styles.muted}>
                    Nothing here yet.
                </ThemedText>
                <ThemedText style={styles.mutedSmall}>Try a different search or create a new item.</ThemedText>
            </Card>}

            {state === "success" && successContent}
        </>

    )
}

/**
 * KitchenSinkStatesScreen
 * - Shows "Loading / Error / Empty / Success" as simple cards.
 * - Uses only core React Native components.
 * - Includes a few extra primitives (TextInput, Switch, Image, Pressable)
 */
export default function KitchenSinkStatesScreen() {
    const [isOnline, setIsOnline] = useState(true);
    const [query, setQuery] = useState("");

    const state = "loading"; // loading | error | empty | success

    const successContent = <ThemedView style={styles.card}>
        <ThemedText style={styles.h2}>Success State</ThemedText>
        <ThemedText style={styles.p}>
            Use when you have data. Here we show a simple “profile” card.
        </ThemedText>

        <ThemedView style={styles.profile}>
            <Image
                source={{ uri: "https://picsum.photos/100" }}
                style={styles.avatar}
            />
            <ThemedView style={{ flex: 1 }}>
                <ThemedText style={styles.profileName}>Taylor Example</ThemedText>
                <ThemedText style={styles.mutedSmall}>Product Designer • Regina</ThemedText>

                <ThemedView style={styles.tagsRow}>
                    <Tag label="Calm UI" />
                    <Tag label="Readable" />
                    <Tag label="Consistent" />
                </ThemedView>
            </ThemedView>
        </ThemedView>

        <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={() => Alert.alert("Action", "Primary actions should be obvious.")}
        >
            <ThemedText style={styles.buttonText}>Primary Action</ThemedText>
        </Pressable>
    </ThemedView>

    return (
        <SafeAreaView style={styles.page}>
            <ScrollView contentContainerStyle={styles.content}>
                <ThemedView>
                    <ThemedText style={styles.h1}>UI States Kitchen Sink</ThemedText>
                    <ThemedText style={styles.p}>
                        This screen demonstrates core React Native building blocks and how a UI can
                        represent loading, error, empty, and success states.
                    </ThemedText>

                    <DataPanel></DataPanel>


                    {/* Small "controls" area to show inputs */}
                    <ThemedView style={styles.card}>
                        <ThemedText style={styles.h2}>Controls</ThemedText>

                        <ThemedText style={styles.label}>Search</ThemedText>
                        <TextInput
                            value={query}
                            onChangeText={setQuery}
                            placeholder="Type something…"
                            style={styles.input}
                        />

                        <ThemedView style={styles.row}>
                            <ThemedText style={styles.label}>Online</ThemedText>
                            <Switch value={isOnline} onValueChange={setIsOnline} />
                        </ThemedView>

                        <Pressable
                            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                            onPress={() => Alert.alert("Pressed", "Buttons should give feedback.")}
                        >
                            <ThemedText style={styles.buttonText}>Pressable Example</ThemedText>
                        </Pressable>
                    </ThemedView>

                    <ThemedText style={styles.footer}>
                        Next step: refactor each state card into a reusable DataPanel component.
                    </ThemedText>
                </ThemedView>
            </ScrollView>
        </SafeAreaView>
    );
}

function Tag({ label }) {
    return (
        <ThemedView style={styles.tag}>
            <ThemedText style={styles.tagText}>{label}</ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    page: { flex: 1 },
    content: { padding: 16, gap: 12 },

    h1: { fontSize: 24, fontWeight: "700" },
    h2: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
    p: { fontSize: 14, opacity: 0.85, marginBottom: 10 },

    card: {
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 14,
        padding: 14,
        gap: 8,
    },

    label: { fontSize: 14, fontWeight: "500" },

    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 6,
    },

    center: { alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 12 },
    muted: { opacity: 0.7, textAlign: "center" },
    mutedSmall: { opacity: 0.6, fontSize: 12, textAlign: "center" },

    button: {
        marginTop: 8,
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: "center",
        borderWidth: StyleSheet.hairlineWidth,
    },
    buttonPressed: { opacity: 0.7 },
    buttonText: { fontWeight: "600" },

    secondaryButton: {
        marginTop: 10,
        borderRadius: 12,
        paddingVertical: 10,
        alignItems: "center",
        borderWidth: StyleSheet.hairlineWidth,
    },
    secondaryButtonText: { fontWeight: "600", opacity: 0.85 },

    errorBox: {
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 12,
        padding: 12,
        gap: 6,
    },
    errorTitle: { fontSize: 16, fontWeight: "600" },
    errorMessage: { opacity: 0.85 },

    profile: { flexDirection: "row", gap: 12, alignItems: "center" },
    avatar: { width: 64, height: 64, borderRadius: 32 },

    profileName: { fontSize: 16, fontWeight: "700" },

    tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 8 },
    tag: {
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 999,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    tagText: { fontSize: 12, opacity: 0.8 },

    footer: { marginTop: 8, fontSize: 12, opacity: 0.6, textAlign: "center" },
});
