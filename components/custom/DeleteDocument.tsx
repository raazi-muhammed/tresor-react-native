import { Text, Pressable, Alert } from "react-native";
import React from "react";
import { IDocument } from "../../types/entities";
import { useSQLiteContext } from "expo-sqlite";
import AntDesign from "@expo/vector-icons/AntDesign";
import { COLORS } from "../../styles/colors";

export default function DeleteDocument({ document }: { document: IDocument }) {
    const db = useSQLiteContext();

    async function deleteDocument() {
        await db.runAsync("DELETE FROM documents WHERE id=?;", document.id);
    }

    function handlePress() {
        Alert.alert(
            "Are you sure?",
            `This will delete the ${document.title} document`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                },
                {
                    text: "Delete",
                    onPress: () => deleteDocument(),
                    style: "destructive",
                },
            ]
        );
    }
    return (
        <Pressable onPress={handlePress}>
            <AntDesign name="delete" size={22} color={COLORS.foreground} />
        </Pressable>
    );
}
