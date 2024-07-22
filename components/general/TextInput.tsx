import { StyleSheet, TextInput as TextInputDefault } from "react-native";
import { COLORS } from "@styles/colors";
import { STYLE_SYSTEM } from "@styles/styleSystem";
import { Dispatch } from "react";

export default function TextInput({
    onChangeText,
    value,
    placeholder,
}: {
    onChangeText: Dispatch<React.SetStateAction<string>>;
    value: string;
    placeholder: string;
}) {
    return (
        <TextInputDefault
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            style={styles.input}
            placeholderTextColor={COLORS.muted}
        />
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
    input: {
        backgroundColor: COLORS.accent,
        padding: STYLE_SYSTEM.paddingLg * 1.5,
        marginBottom: 12,
        borderRadius: STYLE_SYSTEM.borderRadius,
        fontSize: 16,
    },
    image: {
        width: 200,
        height: 200,
    },
});
