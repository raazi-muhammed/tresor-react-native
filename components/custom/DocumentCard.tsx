import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Document } from "../../App";
import Entypo from "@expo/vector-icons/Entypo";
import { COLORS } from "../../styles/colors";

export default function DocumentInfo({ document }: { document: Document }) {
    return (
        <View style={styles.card}>
            <Image
                source={{ uri: document.images[0].uri }}
                style={{ width: 48, height: 48, flexGrow: 0, borderRadius: 8 }}
            />
            <View style={{ flexGrow: 1 }}>
                <Text style={styles.header}>{document.title}</Text>
                <Text style={styles.caption}>{document.caption}</Text>
            </View>
            <Entypo name="chevron-small-right" size={24} color={COLORS.muted} />
        </View>
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
