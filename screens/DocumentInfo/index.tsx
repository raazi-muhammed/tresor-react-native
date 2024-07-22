import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { ParamListBase } from "../../App";
import { STYLE_SYSTEM } from "@styles/styleSystem";
import { useSQLiteContext } from "expo-sqlite";
import { IImage } from "@app/types/entities";
import ImagesViewer from "@components/image/ImagesViewer";
import Fields from "./Fields";

export default function DocumentInfo({
    route,
}: {
    route: RouteProp<ParamListBase, "Info">;
}) {
    const doc = route.params.doc;
    const db = useSQLiteContext();

    const [images, setImages] = useState<IImage[]>([
        { uri: doc.uri || "", height: doc.height || 1, width: doc.width || 1 },
    ]);

    useEffect(() => {
        async function setup() {
            const images = await db.getAllAsync<any>(
                `SELECT * FROM images
                WHERE images.document_id = ${doc.id}`
            );

            if (images.length) setImages(images);
        }
        setup();
    }, []);

    return (
        <View style={{ padding: STYLE_SYSTEM.paddingLg, flex: 1 }}>
            <ImagesViewer
                title={doc.title}
                caption={doc.caption}
                images={images}
            />
            <Fields images={images} document={doc} />
        </View>
    );
}
