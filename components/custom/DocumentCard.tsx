import React from "react";
import {
    GestureResponderEvent,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { COLORS } from "../../styles/colors";
import { Document } from "../../screens/HomeScreen";

export default function DocumentInfo({
    document,
    onPress,
}: {
    document: Document;
    onPress: (e: GestureResponderEvent) => void;
}) {
    return (
        <Pressable style={styles.card} onPress={onPress}>
            <Image
                source={{ uri: document.uri }}
                style={{ width: 48, height: 48, flexGrow: 0, borderRadius: 8 }}
            />
            <View style={{ flexGrow: 1 }}>
                <Text style={styles.header}>{document.title}</Text>
                <Text style={styles.caption}>{document.caption}</Text>
            </View>
            <Entypo name="chevron-small-right" size={24} color={COLORS.muted} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.secondary,
        width: "100%",
        padding: 8,
        borderRadius: 12,
        marginBottom: 8,
        flex: 1,
        gap: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    header: { fontSize: 16, fontWeight: "semibold" },
    caption: { color: COLORS.muted },
});
