import { IconSymbol } from "@/components/ui/icon-symbol";
import { Spacing } from "@/constants/theme";
import * as React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
    Appbar,
    Card,
    Divider,
    IconButton,
    List,
    Text,
} from "react-native-paper";

type ForecastRow = {
    day: string;
    icon: string;  // MaterialIcon name, e.g. "weather-cloudy"
    high: number;
    low: number;
};

type Props = {
    city: string;
    temperature: number;
    condition: string;
    high: number;
    low: number;
    forecast: ForecastRow[];
};

export function WeatherHeroPaperView({
    city = "New York",
    temperature = 20,
    condition = "Cloudy",
    high = 20,
    low = 12,
    forecast = [
        { day: "Monday", icon: "cloud.sun.bolt.fill", high: 19, low: 10 },
        { day: "Tuesday", icon: "sun.horizon", high: 20, low: 12 },
        { day: "Wednesday", icon: "cloud.snow", high: 21, low: 13 },
        { day: "Thursday", icon: "sun.horizon", high: 34, low: 21 },
        { day: "Friday", icon: "cloud", high: 13, low: 8 },
    ]
}: Props) {
    return (
        <View style={styles.screen}>
            {/* Top row */}
            <Appbar.Header style={styles.appbar}>
                <View style={styles.topRow}>
                    <View style={styles.tempRow}>
                        <Text variant="displayLarge" style={styles.tempText}>
                            {temperature}
                        </Text>
                        <Text variant="headlineMedium" style={styles.degreeMark}>
                            °
                        </Text>

                        <View style={styles.metaRight}>
                            <Text variant="labelLarge" style={styles.conditionText}>
                                {condition.toUpperCase()}
                            </Text>
                            <Text variant="labelMedium" style={styles.hiloText}>
                                {high}/{low}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.cityRow}>
                        <Text variant="labelLarge" style={styles.cityText}>
                            {city.toUpperCase()}
                        </Text>

                        <IconButton
                            icon="map-marker"
                            size={18}
                            iconColor="rgba(255,255,255,0.95)"
                            style={styles.iconBtnTight}
                        // onPress={onOpenCityMenu}
                        />

                        <IconButton
                            icon="chevron-down"
                            size={18}
                            iconColor="rgba(255,255,255,0.95)"
                            style={styles.iconBtnTight}
                        // onPress={onOpenCityMenu}
                        />
                        <IconButton
                            icon="cog-outline"
                            size={22}
                            iconColor="rgba(255,255,255,0.95)"
                            style={styles.iconBtnTight}
                        // onPress={onPressSettings}
                        />
                    </View>

                </View>
            </Appbar.Header>

            {/* Hero Section */}
            <View style={styles.hero}>
                <View style={styles.illustrationWrap}>
                    <IconSymbol
                        name="sun.horizon"
                        size={150}
                        color="rgba(245, 242, 18, 0.95)"
                    />
                </View>
            </View>

            {/* Vertical Forecast List */}
            <View style={styles.forecastCard}>
                {forecast.map((row, idx) => (
                    <React.Fragment key={row.day}>
                        <List.Item
                            title={row.day}
                            titleStyle={styles.forecastDay}
                            left={() => (
                                <IconSymbol size={22} name={row.icon} color="rgba(255,255,255,0.9)" />
                            )}
                            right={() => (
                                <Text style={styles.forecastTemps}>
                                    {row.high}/{row.low}
                                </Text>
                            )}
                            style={styles.forecastRow}
                        />
                        {idx < forecast.length - 1 ? (
                            <Divider style={styles.divider} />
                        ) : null}
                    </React.Fragment>
                ))}
            </View>

            {/* Horizontal Forecast List */}
            <View style={styles.forecastListHorizontal}>
                <Text variant="labelLarge" style={styles.hScrollTitle}>
                    Next days
                </Text>

                <FlatList
                    data={forecast}
                    horizontal
                    keyExtractor={(item) => item.day}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Card style={styles.miniCard} mode="contained">
                            <Card.Content style={styles.miniCardContent}>
                                <Text style={styles.miniDay}>{item.day}</Text>

                                <IconSymbol size={22} name={item.icon} color="rgba(255,255,255,0.9)" />

                                <Text style={styles.miniTemps}>
                                    {item.high}/{item.low}
                                </Text>
                            </Card.Content>
                        </Card>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#2F8FEA",
        padding: Spacing.lg,
        gap: Spacing.md,
    },

    appbar: {
        backgroundColor: "transparent",
    },

    topRow: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    cityRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },

    cityText: {
        color: "rgba(255,255,255,0.95)",
        fontWeight: "700",
    },

    iconBtnTight: {
        width: 28,
        height: 28,
    },

    hero: {
        alignItems: "center",
    },

    tempRow: {
        flexDirection: "row",
        alignItems: "flex-start",
    },

    tempText: {
        color: "rgba(255,255,255,0.95)",
        fontWeight: "300",
    },

    degreeMark: {
        color: "rgba(255,255,255,0.95)",
    },

    metaRight: {
        marginLeft: 14,
        marginTop: 22,
    },

    conditionText: {
        color: "rgba(255,255,255,0.95)",
        fontWeight: "700",
    },

    hiloText: {
        color: "rgba(255,255,255,0.95)",
        fontWeight: "600",
    },

    illustrationWrap: {
        alignItems: "center",
        justifyContent: "center",
    },

    forecastCard: {
        borderRadius: 16,
        padding: Spacing.md,

        backgroundColor: "rgba(255,255,255,0.25)",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(255,255,255,0.25)",
    },

    forecastRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    forecastDay: {
        color: "rgba(255,255,255,0.95)",
        fontWeight: "700",
    },

    forecastTemps: {
        color: "rgba(255,255,255,0.95)",
        fontWeight: "700",
    },

    divider: {
        opacity: 0.25,
    },

    hScrollTitle: {
        color: "rgba(255,255,255,0.95)",
        fontWeight: "700",
        marginBottom: 10,
    },

    miniCard: {
        width: 120,
        marginRight: 12,
        borderRadius: 16,

        backgroundColor: "rgba(255,255,255,0.25)",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(255,255,255,0.25)",
    },

    miniCardContent: {
        alignItems: "center",
    },

    miniDay: {
        color: "rgba(255,255,255,0.95)",
        fontWeight: "700",
    },

    miniTemps: {
        color: "rgba(255,255,255,0.95)",
        fontWeight: "800",
    },

});

export default WeatherHeroPaperView;
