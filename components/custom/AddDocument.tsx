import {
    Pressable,
    Modal,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    View,
    Text,
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
                <KeyboardAvoidingView
                    keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
                    style={{ padding: STYLE_SYSTEM.paddingLg, gap: 12 }}
                    behavior="position">
                    <IconButton
                        iconName="cross"
                        onPress={() => setIsModelVisible(false)}
                    />
                    <Heading style={{ marginTop: STYLE_SYSTEM.padding }}>
                        Add document
                    </Heading>
                    <TextInput
                        onChangeText={setTitle}
                        value={title}
                        placeholder="title"
                        style={styles.input}
                    />
                    <TextInput
                        onChangeText={setCaption}
                        value={caption}
                        placeholder="caption"
                        style={styles.input}
                    />
                    <View
                        style={{
                            flexDirection: "row",
                            gap: STYLE_SYSTEM.padding,
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
                </KeyboardAvoidingView>
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
    input: {
        backgroundColor: COLORS.accent,
        padding: STYLE_SYSTEM.paddingLg,
        marginBottom: STYLE_SYSTEM.paddingLg,
        borderRadius: STYLE_SYSTEM.borderRadius,
        fontSize: 16,
    },
    image: {
        width: 200,
        height: 200,
    },
});
