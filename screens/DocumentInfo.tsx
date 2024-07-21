import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { ParamListBase } from "../App";
import { STYLE_SYSTEM } from "../styles/styleSystem";
import { useSQLiteContext } from "expo-sqlite";

export default function DocumentInfo({
    route,
}: {
    route: RouteProp<ParamListBase, "Info">;
}) {
    const doc = route.params.doc;
    const db = useSQLiteContext();

    const [images, setImages] = useState([
        { uri: doc.uri, height: doc.height, width: doc.width },
    ]);

    useEffect(() => {
        async function setup() {
            const images = await db.getAllAsync<any>(
                `SELECT * FROM images
                WHERE images.document_id = ${doc.id}
            `
            );
            if (images.length) setImages(images);
        }
        setup();
    }, []);

    return (
        <View>
            <Text>{doc.title}</Text>
            <Text>{doc.caption}</Text>
            <View>
                {images.map((img) => (
                    <Image
                        source={{ uri: img.uri }}
                        style={{
                            width: "50%",
                            borderRadius: STYLE_SYSTEM.borderRadius,
                            aspectRatio: (img.width || 1) / (img.height || 1),
                        }}
                    />
                ))}
            </View>
        </View>
    );
}
