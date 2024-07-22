import {
    Pressable,
    Modal,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Text,
    Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { COLORS } from "../../styles/colors";
import { STYLE_SYSTEM } from "../../styles/styleSystem";
import Heading from "../general/Heading";
import Button from "../general/Button";
import { useSQLiteContext } from "expo-sqlite";
import { IImage } from "../../types/entities";

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

    const [currentIdx, setCurrentIdx] = useState(0);
    const [currentPreview, setCurrentPreview] = useState(images[currentIdx]);
    useEffect(() => {
        setCurrentPreview(images[currentIdx]);
    }, [currentIdx]);

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
                <Pressable
                    style={styles.buttonBg}
                    onPress={() => setIsModelVisible(true)}>
                    <Entypo
                        name="plus"
                        size={22}
                        color={COLORS.primaryForeground}
                        style={styles.buttonIcon}
                    />
                </Pressable>
            )}
            <Modal
                visible={isModelVisible}
                onRequestClose={() => setIsModelVisible(false)}
                animationType="slide"
                presentationStyle="pageSheet">
                <KeyboardAvoidingView
                    keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
                    style={{ padding: STYLE_SYSTEM.paddingLg, gap: 12 }}
                    behavior="padding">
                    <Pressable
                        style={[
                            styles.buttonBg,
                            {
                                width: 24,
                                height: 24,
                                backgroundColor: COLORS.muted,
                            },
                        ]}
                        onPress={() => setIsModelVisible(false)}>
                        <Entypo
                            name="cross"
                            size={18}
                            color={COLORS.mutedForeground}
                            style={styles.buttonIcon}
                        />
                    </Pressable>
                    <Heading style={{ marginTop: STYLE_SYSTEM.padding }}>
                        Add field
                    </Heading>
                    <Pressable
                        onPress={() =>
                            setCurrentIdx((ci) =>
                                ci + 1 < images.length ? ci + 1 : 0
                            )
                        }>
                        <Image
                            source={{ uri: currentPreview.uri }}
                            style={{
                                width: "100%",
                                aspectRatio:
                                    currentPreview.width /
                                    currentPreview.height,
                                borderRadius: STYLE_SYSTEM.borderRadius,
                            }}
                        />
                        <Text style={{ paddingTop: 4, color: COLORS.muted }}>
                            Tap to change preview
                        </Text>
                    </Pressable>
                    <TextInput
                        onChangeText={setKey}
                        value={key}
                        placeholder="key"
                        style={styles.input}
                    />
                    <TextInput
                        onChangeText={setValue}
                        value={value}
                        placeholder="value"
                        style={styles.input}
                    />
                    {!!error && <Text style={{ color: "red" }}>{error}</Text>}
                    <Button title="Add document" onPress={handleAddDocument} />
                </KeyboardAvoidingView>
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
    input: {
        backgroundColor: COLORS.accent,
        padding: STYLE_SYSTEM.paddingLg,
        borderRadius: STYLE_SYSTEM.borderRadius,
        fontSize: 16,
    },
    image: {
        width: 200,
        height: 200,
    },
});