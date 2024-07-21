import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import React from "react";
import { COLORS } from "../../styles/colors";

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
            return <Text style={[style, styles.main]}>{children}</Text>;
        default:
            return <Text style={[style, styles.default]}>{children}</Text>;
    }
}

const styles = StyleSheet.create({
    main: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 8,
        color: COLORS.primary,
    },
    default: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
        color: COLORS.foreground,
    },
});
