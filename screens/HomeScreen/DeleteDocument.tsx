import { Pressable, Alert } from "react-native";
import React from "react";
import { IDocument } from "@app/types/entities";
import { useSQLiteContext } from "expo-sqlite";
import AntDesign from "@expo/vector-icons/AntDesign";
import { COLORS } from "@styles/colors";
import { STYLE_SYSTEM } from "@styles/styleSystem";

export default function DeleteDocument({
    document,
    refreshDocuments,
}: {
    document: IDocument;
    refreshDocuments: () => void;
}) {
    const db = useSQLiteContext();

    async function deleteDocument() {
        await db.runAsync("DELETE FROM documents WHERE id=?;", document.id);
        refreshDocuments();
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
        <Pressable
            onPress={handlePress}
            style={{
                backgroundColor: COLORS.danger,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: STYLE_SYSTEM.paddingXl,
                borderRadius: STYLE_SYSTEM.borderRadius,
                marginLeft: 12,
            }}>
            <AntDesign
                name="delete"
                size={22}
                color={COLORS.dangerForeground}
            />
        </Pressable>
    );
}
