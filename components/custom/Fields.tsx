import React, { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import * as Clipboard from "expo-clipboard";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, Text, Pressable, FlatList } from "react-native";
import { STYLE_SYSTEM } from "../../styles/styleSystem";
import Heading from "../general/Heading";
import AddField from "./AddField";
import { IDocument, IField, IImage } from "../../types/entities";
import DeleteField from "./DeleteField";
import { COLORS } from "../../styles/colors";
import { useSQLiteContext } from "expo-sqlite";

export default function Fields({
    document,
    images,
}: {
    document: IDocument;
    images: IImage[];
}) {
    const db = useSQLiteContext();

    const [fields, setFields] = useState<IField[]>([]);
    const [refresh, setRefresh] = useState(false);
    const refreshFields = () => setRefresh((r) => !r);

    const copyToClipboard = async (data: string) => {
        await Clipboard.setStringAsync(data);
    };

    useEffect(() => {
        async function setup() {
            const fields = await db.getAllAsync<any>(
                `SELECT * FROM fields
              WHERE fields.document_id = ${document.id}`
            );
            setFields(fields);
        }
        setup();
    }, [refresh]);

    return (
        <FlatList
            keyExtractor={(item) => item.field_id.toString()}
            data={fields}
            ListHeaderComponent={() => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: STYLE_SYSTEM.paddingLg,
                    }}>
                    <Heading
                        style={{
                            marginBottom: 0,
                        }}>
                        Fields
                    </Heading>
                    {!!fields.length && (
                        <AddField
                            documentId={document.id}
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
                <GestureHandlerRootView>
                    <Swipeable
                        enableTrackpadTwoFingerGesture
                        overshootLeft
                        overshootRight
                        overshootFriction={8}
                        renderRightActions={() => (
                            <DeleteField
                                field={item}
                                refreshFields={refreshFields}
                            />
                        )}>
                        <View
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
                                <Text style={{ fontSize: 18 }}>
                                    {item.value}
                                </Text>
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
                    </Swipeable>
                </GestureHandlerRootView>
            )}
            ItemSeparatorComponent={() => (
                <View style={{ height: STYLE_SYSTEM.padding }} />
            )}
            ListEmptyComponent={() => (
                <AddField
                    variant="lg"
                    documentId={document.id}
                    images={images}
                    refreshFields={refreshFields}
                />
            )}
        />
    );
}
