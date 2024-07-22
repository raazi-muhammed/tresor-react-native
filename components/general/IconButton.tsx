import {
    StyleSheet,
    Pressable,
    GestureResponderEvent,
    StyleProp,
    ViewStyle,
} from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { COLORS } from "@styles/colors";

export default function IconButton({
    onPress,
    iconName,
    style,
}: {
    onPress: (event: GestureResponderEvent) => void;
    iconName: "plus" | "chevron-thin-right" | "chevron-thin-left" | "cross";
    style?: StyleProp<ViewStyle>;
}) {
    return (
        <Pressable
            style={[
                styles.buttonBg,
                {
                    width: 24,
                    height: 24,
                    backgroundColor: COLORS.muted,
                },
                style,
            ]}
            onPress={onPress}>
            <Entypo
                name={iconName}
                size={14}
                color={COLORS.mutedForeground}
                style={styles.buttonIcon}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonBg: {
        backgroundColor: COLORS.primary,
        borderRadius: 100,
        alignSelf: "flex-end",
        alignContent: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
    },
    buttonIcon: { margin: "auto" },
});
