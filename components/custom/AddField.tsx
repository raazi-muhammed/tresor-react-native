import {
    Pressable,
    Modal,
    StyleSheet,
    Platform,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    Dimensions,
    SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { COLORS } from "../../styles/colors";
import { STYLE_SYSTEM } from "../../styles/styleSystem";
import Heading from "../general/Heading";
import Button from "../general/Button";
import { useSQLiteContext } from "expo-sqlite";
import { IImage } from "../../types/entities";
import IconButton from "../general/IconButton";
import ImagesViewer from "./ImagesViewer";
import TextInput from "../general/TextInput";

export default function AddField({
    documentId,
    images,
    refreshFields,
    variant = "default",
}: {
    documentId: number;
    images: IImage[];
    refreshFields: () => void;
    variant?: "default" | "lg";
}) {
    const db = useSQLiteContext();

    const [isModelVisible, setIsModelVisible] = useState(false);
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleAddDocument = async () => {
        if (!key || !value) {
            setError("Invalid data");
            return;
        }

        await db.runAsync(
            "INSERT INTO fields (document_id, key, value) VALUES (?, ?, ?)",
            documentId,
            key,
            value
        );

        refreshFields();
        setError(null);
        setIsModelVisible(false);
        setKey("");
        setValue("");
    };

    return (
        <>
            {variant === "lg" ? (
                <Pressable
                    onPress={() => setIsModelVisible(true)}
                    style={{
                        marginTop: 16,
                        backgroundColor: COLORS.accent,
                        padding: STYLE_SYSTEM.padding,
                        borderRadius: STYLE_SYSTEM.borderRadius,
                        aspectRatio: 2 / 1,
                        width: "100%",
                    }}>
                    <Entypo
                        name="plus"
                        size={64}
                        color={COLORS.primary}
                        style={styles.buttonIcon}
                    />
                </Pressable>
            ) : (
                <IconButton
                    onPress={() => setIsModelVisible(true)}
                    iconName="plus"
                />
            )}
            <Modal
                visible={isModelVisible}
                onRequestClose={() => setIsModelVisible(false)}
                animationType="slide"
                presentationStyle="pageSheet">
                <ScrollView style={{ padding: STYLE_SYSTEM.paddingLg }}>
                    <IconButton
                        onPress={() => setIsModelVisible(false)}
                        iconName="cross"
                    />
                    <ImagesViewer
                        title={"Document"}
                        caption="Scroll to change"
                        images={images}
                    />
                    <Heading style={{ marginTop: STYLE_SYSTEM.padding }}>
                        Add field
                    </Heading>
                    <KeyboardAvoidingView
                        keyboardVerticalOffset={100}
                        behavior="padding">
                        <TextInput
                            onChangeText={setKey}
                            value={key}
                            placeholder="key"
                        />
                        <TextInput
                            onChangeText={setValue}
                            value={value}
                            placeholder="value"
                        />
                        {!!error && (
                            <Text style={{ color: "red" }}>{error}</Text>
                        )}
                        <Button title="Add field" onPress={handleAddDocument} />
                    </KeyboardAvoidingView>
                </ScrollView>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    buttonBg: {
        backgroundColor: COLORS.muted,
        borderRadius: 100,
        alignSelf: "flex-end",
        alignContent: "center",
        justifyContent: "center",
        width: 26,
        height: 26,
    },
    buttonIcon: { margin: "auto" },
    image: {
        width: 200,
        height: 200,
    },
});
