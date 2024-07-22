import {
    Pressable,
    Modal,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    View,
    Text,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { COLORS } from "../../styles/colors";
import { STYLE_SYSTEM } from "../../styles/styleSystem";
import Heading from "../general/Heading";
import Button from "../general/Button";
import ImageSelector from "./ImageSelector";
import { useSQLiteContext } from "expo-sqlite";
import { IImage } from "../../types/entities";
import IconButton from "../general/IconButton";
import TextInput from "../general/TextInput";

export default function AddDocument() {
    const db = useSQLiteContext();

    const [isModelVisible, setIsModelVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");

    const [frontImage, setFrontImage] = useState<IImage | null>(null);
    const [backImage, setBackImage] = useState<IImage | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAddDocument = async () => {
        if (!title) {
            setError("Invalid name");
            return;
        }
        if (!frontImage) {
            setError("Invalid front image");
            return;
        }

        const documentResult = await db.runAsync(
            "INSERT INTO documents (title, caption) VALUES (?, ?)",
            title,
            caption || ""
        );

        await db.runAsync(
            "INSERT INTO images (document_id, uri, height, width) VALUES (?, ?, ?, ?)",
            documentResult.lastInsertRowId,
            frontImage.uri,
            frontImage.height,
            frontImage.width
        );

        if (backImage) {
            await db.runAsync(
                "INSERT INTO images (document_id, uri, height, width) VALUES (?, ?, ?, ?)",
                documentResult.lastInsertRowId,
                backImage.uri,
                backImage.height,
                backImage.width
            );
        }

        setError(null);
        setIsModelVisible(false);
        setTitle("");
        setCaption("");
        setFrontImage(null);
        setBackImage(null);
    };

    return (
        <>
            <Pressable
                style={styles.buttonBg}
                onPress={() => setIsModelVisible(true)}>
                <Entypo
                    name="plus"
                    size={26}
                    color={COLORS.primaryForeground}
                    style={styles.buttonIcon}
                />
            </Pressable>
            <Modal
                visible={isModelVisible}
                onRequestClose={() => setIsModelVisible(false)}
                animationType="slide"
                presentationStyle="pageSheet">
                <ScrollView style={{ padding: STYLE_SYSTEM.paddingLg }}>
                    <IconButton
                        iconName="cross"
                        onPress={() => setIsModelVisible(false)}
                    />
                    <Heading>Add document</Heading>
                    <KeyboardAvoidingView
                        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
                        behavior="position">
                        <TextInput
                            onChangeText={setTitle}
                            value={title}
                            placeholder="title"
                        />
                        <TextInput
                            onChangeText={setCaption}
                            value={caption}
                            placeholder="caption"
                        />
                    </KeyboardAvoidingView>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: STYLE_SYSTEM.padding,
                            marginBottom: 8,
                        }}>
                        <ImageSelector
                            image={frontImage}
                            title="Front Image"
                            setImage={setFrontImage}
                        />
                        <ImageSelector
                            image={backImage}
                            title="Back Image"
                            setImage={setBackImage}
                        />
                    </View>
                    {!!error && <Text style={{ color: "red" }}>{error}</Text>}
                    <Button title="Add document" onPress={handleAddDocument} />
                </ScrollView>
            </Modal>
        </>
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
    image: {
        width: 200,
        height: 200,
    },
});
