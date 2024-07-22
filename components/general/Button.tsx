import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "@styles/colors";
import { STYLE_SYSTEM } from "@styles/styleSystem";

export default function Button({
    onPress,
    title,
}: {
    title: string;
    onPress?: (event: GestureResponderEvent) => void;
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: COLORS.primary,
                padding: 12,
                borderRadius: STYLE_SYSTEM.borderRadius,
            }}>
            <Text
                style={{
                    fontSize: 16,
                    textAlign: "center",
                    color: COLORS.primaryForeground,
                    fontWeight: "semibold",
                }}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}
