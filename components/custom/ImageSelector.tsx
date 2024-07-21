import { Text, Image, StyleSheet, Pressable, View, Button } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import { STYLE_SYSTEM } from "../../styles/styleSystem";
import { COLORS } from "../../styles/colors";
import Entypo from "@expo/vector-icons/Entypo";

export default function ImageSelector({
    image,
    setImage,
    title,
}: {
    image: string | null;
    title: string;
    setImage: React.Dispatch<React.SetStateAction<string | null>>;
}) {
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    return (
        <Pressable style={styles.container} onPress={pickImage}>
            {image ? (
                <View>
                    <Image source={{ uri: image }} style={styles.image} />
                    <Pressable
                        style={{
                            position: "absolute",
                            bottom: 1,
                            right: 1,
                            padding: 4,
                            paddingHorizontal: 12,
                            borderRadius: 12,
                            backgroundColor: "red",
                        }}
                        onPress={() => setImage(null)}>
                        <Text style={{ color: "white" }}>Clear</Text>
                    </Pressable>
                </View>
            ) : (
                <View
                    style={{
                        width: "100%",
                        margin: "auto",
                        alignItems: "center",
                    }}>
                    <Entypo name="image" size={26} color={COLORS.muted} />
                    <Text style={{ color: COLORS.muted }}>{title}</Text>
                </View>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    image: {
        height: "100%",
        width: "100%",
        borderRadius: STYLE_SYSTEM.borderRadius,
        objectFit: "contain",
        backgroundColor: COLORS.secondary,
    },
    container: {
        aspectRatio: 1,
        borderWidth: 1,
        width: "100%",
        flex: 1,
        borderColor: COLORS.accent,
        borderRadius: STYLE_SYSTEM.borderRadius,
        justifyContent: "center",
        alignContent: "center",
    },
});
