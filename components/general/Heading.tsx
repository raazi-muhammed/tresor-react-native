import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import React from "react";
import { COLORS } from "@styles/colors";

export default function Heading({
    children,
    variant = "default",
    style = {},
}: {
    children: string;
    variant?: "default" | "main";
    style?: StyleProp<TextStyle>;
}) {
    switch (variant) {
        case "main":
            return <Text style={[styles.main, style]}>{children}</Text>;
        default:
            return <Text style={[styles.default, style]}>{children}</Text>;
    }
}

const styles = StyleSheet.create({
    main: {
        fontSize: 32,
        fontWeight: "bold",
        color: COLORS.primary,
    },
    default: {
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.foreground,
        marginBottom: 12,
    },
});
