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
import {
    Avatar,
    Button,
    Card as PCard,
    Text as PText
} from "react-native-paper";

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
    - ConversationView
      - TextInputTray at the bottom
      - ListView
        - Chat Message Bubbles
          - isMine: bool // Controls whether the message is displayed on the right or left side
    - CommentTree
*/


function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
    return (
        <ThemedView style={styles.card}>
            <ThemedText style={styles.h2}>{title}</ThemedText>
            {subtitle && <ThemedText style={styles.p}>{subtitle}</ThemedText>}
            <CenteredMessage>
                {children}
            </CenteredMessage>
        </ThemedView>
    );
}

function CenteredMessage({ children }: { children: React.ReactNode }) {
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
    - loadingMessage: string
    - errorMessage: string
    - emptyMessage: string
*/

// Typescript has a very important new keyword: `type`
type DataPanelProps = {
    state: "loading" | "error" | "empty" | "success"; // union or enum type
    title: string;
    subtitle?: string;
    successContent?: React.ReactNode;
    loadingMessage?: string;
    errorMessage?: string;
    emptyMessage?: string;
}

// Schema (What is the shape of my data?)
// "What is a great simple data schema for...XYZ?"

function DataPanel(
    { state, title, subtitle, successContent, loadingMessage, errorMessage, emptyMessage }: DataPanelProps
) {
    // If someone forgets to set `state`
    state = state || "empty";

    subtitle = subtitle || "No content available";

    errorMessage = errorMessage || "Something went wrong. Please try again.";
    emptyMessage = emptyMessage || "Nothing here yet.";
    loadingMessage = loadingMessage || "Loading…";

    return (
        <>
            {state === "loading" && <Card title={title} subtitle={subtitle}>
                <ActivityIndicator />
                <ThemedText style={styles.muted}>{loadingMessage}</ThemedText>
            </Card>}

            {state === "error" && <Card title={title} subtitle={subtitle}>
                <ThemedView style={styles.errorBox}>
                    <ThemedText style={styles.errorMessage}>
                        {errorMessage}
                    </ThemedText>

                    <Pressable
                        style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
                        onPress={() => Alert.alert("Retry", "This would re-fetch data.")}
                    >
                        <ThemedText style={styles.secondaryButtonText}>Retry</ThemedText>
                    </Pressable>
                </ThemedView>
            </Card>}

            {state === "empty" && <Card title={title} subtitle={subtitle}>
                <ThemedText style={styles.muted}>
                    {emptyMessage}
                </ThemedText>
            </Card>}

            {state === "success" && <Card title={title} subtitle={subtitle}>
                {successContent}
            </Card>}
        </>

    )
}

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const PaperCardExample = () => (
    <PCard>
        <PCard.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
        <PCard.Content>
            <PText variant="titleLarge">Social Post</PText>
            <PText variant="bodyMedium">Feed Content</PText>
        </PCard.Content>
        <PCard.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <PCard.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
        </PCard.Actions>
    </PCard>
);

/**
 * KitchenSinkStatesScreen
 * - Shows "Loading / Error / Empty / Success" as simple cards.
 * - Uses only core React Native components.
 * - Includes a few extra primitives (TextInput, Switch, Image, Pressable)
 */
export default function KitchenSinkStatesScreen() {
    const state = "error"; // loading | error | empty | success
    const loadingMessage = "We're getting your data"
    const successContent = <ProfileExample />;

    return (
        <SafeAreaView style={styles.page}>
            <ScrollView contentContainerStyle={styles.content}>
                <ThemedView>
                    <ThemedText style={styles.h1}>UI States Kitchen Sink</ThemedText>
                    <ThemedText style={styles.p}>
                        This screen demonstrates core React Native building blocks and how a UI can
                        represent loading, error, empty, and success states.
                    </ThemedText>

                    <DataPanel
                        state={state}
                        title="Example Card"
                        successContent={successContent}
                        loadingMessage={loadingMessage}
                    >
                    </DataPanel>

                    <ControlsExample></ControlsExample>

                    <ThemedText style={styles.footer}>
                        Next step: refactor each state card into a reusable DataPanel component.
                    </ThemedText>
                </ThemedView>

                <ThemedView>
                    <PaperCardExample></PaperCardExample>
                </ThemedView>
            </ScrollView>
        </SafeAreaView>
    );
}

function Tag({ label }: { label: string }) {
    return (
        <ThemedView style={styles.tag}>
            <ThemedText style={styles.tagText}>{label}</ThemedText>
        </ThemedView>
    );
}

function ProfileExample() {
    return (
        <>
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
        </>
    )
}

function ControlsExample() {
    const [isOnline, setIsOnline] = useState(true);
    const [query, setQuery] = useState("");

    return (
        <>
            <Card title="Form Control Examples" subtitle="Common input controls used in mobile apps.">
                <ThemedView>
                    <ThemedText style={styles.label}>Search</ThemedText>
                    <TextInput
                        value={query}
                        onChangeText={setQuery}
                        placeholder="Type something…"
                        style={styles.input}
                    />

                </ThemedView>

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
            </Card>
        </>
    )
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
