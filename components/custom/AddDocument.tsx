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
import { Document } from "../../App";
import Entypo from "@expo/vector-icons/Entypo";
import { COLORS } from "../../styles/colors";
import { STYLE_SYSTEM } from "../../styles/styleSystem";
import Heading from "../general/Heading";
import Button from "../general/Button";
import ImageSelector from "./ImageSelector";

export default function AddDocument({
    addDocument,
}: {
    addDocument: (data: Document) => void;
}) {
    const [isModelVisible, setIsModelVisible] = useState(false);
    const [title, setTitle] = useState("tet");
    const [caption, setCaption] = useState("");

    const [frontImage, setFrontImage] = useState<string | null>(null);
    const [backImage, setBackImage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAddDocument = () => {
        if (!title) {
            setError("Invalid name");
            return;
        }
        if (!frontImage) {
            setError("Invalid front image");
            return;
        }

        const images = [{ uri: frontImage }];
        if (backImage) images.push({ uri: backImage });

        addDocument({
            id: Date.now().toString(),
            caption,
            images,
            title,
        });
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
        borderRadius: STYLE_SYSTEM.borderRadius,
        fontSize: 16,
    },
    image: {
        width: 200,
        height: 200,
    },
});