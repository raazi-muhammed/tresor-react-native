import { Alert, Pressable } from "react-native";
import React from "react";
import { COLORS } from "@styles/colors";
import { STYLE_SYSTEM } from "@styles/styleSystem";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSQLiteContext } from "expo-sqlite";
import { IField } from "@app/types/entities";

export default function DeleteField({
    field,
    refreshFields,
}: {
    field: IField;
    refreshFields: () => void;
}) {
    const db = useSQLiteContext();

    async function deleteField() {
        await db.runAsync(
            "DELETE FROM fields WHERE field_id=?;",
            field.field_id
        );
        refreshFields();
    }

    function handlePress() {
        Alert.alert(
            "Are you sure?",
            `This will delete the ${field.key} document`,
            [
                {
                    text: "Cancel",
                },
                {
                    text: "Delete",
                    onPress: () => deleteField(),
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
