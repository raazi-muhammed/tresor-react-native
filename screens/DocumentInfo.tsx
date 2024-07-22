import { View, Text, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { ParamListBase } from "../App";
import { STYLE_SYSTEM } from "../styles/styleSystem";
import { useSQLiteContext } from "expo-sqlite";
import AddField from "../components/custom/AddField";
import { IField, IImage } from "../types/entities";
import { COLORS } from "../styles/colors";
import Feather from "@expo/vector-icons/Feather";
import Heading from "../components/general/Heading";
import * as Clipboard from "expo-clipboard";
import ImagesViewer from "../components/custom/ImagesViewer";

export default function DocumentInfo({
    route,
}: {
    route: RouteProp<ParamListBase, "Info">;
}) {
    const doc = route.params.doc;
    const db = useSQLiteContext();
    const [refresh, setRefresh] = useState(false);
    const refreshFields = () => setRefresh((r) => !r);

    const [images, setImages] = useState<IImage[]>([
        { uri: doc.uri || "", height: doc.height || 1, width: doc.width || 1 },
    ]);
    const [fields, setFields] = useState<IField[]>([]);

    const copyToClipboard = async (data: string) => {
        await Clipboard.setStringAsync(data);
    };

    useEffect(() => {
        async function setup() {
            const images = await db.getAllAsync<any>(
                `SELECT * FROM images
                WHERE images.document_id = ${doc.id}`
            );

            if (images.length) setImages(images);

            const fields = await db.getAllAsync<any>(
                `SELECT * FROM fields
                WHERE fields.document_id = ${doc.id}`
            );
            setFields(fields);
        }
        setup();
    }, [refresh]);

    return (
        <View style={{ padding: STYLE_SYSTEM.paddingLg }}>
            <ImagesViewer
                title={doc.title}
                caption={doc.caption}
                images={images}
            />
            <FlatList
                keyExtractor={(item) => item.field_id.toString()}
                data={fields}
                ListHeaderComponent={() => (
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}>
                        <Heading style={{ marginTop: 12 }}>Fields</Heading>
                        {!!fields.length && (
                            <AddField
                                documentId={doc.id}
                                images={images}
                                refreshFields={refreshFields}
                            />
                        )}
                    </View>
                )}
                ListHeaderComponentStyle={{
                    marginBottom: STYLE_SYSTEM.padding,
                }}
                renderItem={({ item }) => (
                    <View
                        key={item.field_id}
                        style={{
                            backgroundColor: COLORS.accent,
                            borderRadius: STYLE_SYSTEM.borderRadius,
                            padding: STYLE_SYSTEM.paddingLg,
                            flexDirection: "row",
                        }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: COLORS.muted }}>
                                {item.key}
                            </Text>
                            <Text style={{ fontSize: 18 }}>{item.value}</Text>
                        </View>
                        <Pressable
                            onPress={() => copyToClipboard(item.value)}
                            style={{ alignSelf: "center" }}>
                            <Feather
                                name="copy"
                                size={22}
                                color={COLORS.primary}
                            />
                        </Pressable>
                    </View>
                )}
                ItemSeparatorComponent={() => (
                    <View style={{ height: STYLE_SYSTEM.padding }} />
                )}
                ListEmptyComponent={() => (
                    <AddField
                        variant="lg"
                        documentId={doc.id}
                        images={images}
                        refreshFields={refreshFields}
                    />
                )}
            />
        </View>
    );
}
