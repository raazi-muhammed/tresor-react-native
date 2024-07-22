import React, { useEffect, useRef, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import * as Clipboard from "expo-clipboard";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, Text, Pressable, FlatList } from "react-native";
import { STYLE_SYSTEM } from "@styles/styleSystem";
import Heading from "@components/general/Heading";
import AddField from "../AddField";
import { IDocument, IField, IImage } from "@app/types/entities";
import DeleteField from "./DeleteField";
import { COLORS } from "@styles/colors";
import { useSQLiteContext } from "expo-sqlite";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";

function Field({ field }: { field: IField }) {
    const scale = useSharedValue(1);

    const timeout = useRef<ReturnType<typeof setTimeout>>();
    const copyToClipboard = async (data: string) => {
        clearTimeout(timeout.current);
        scale.value = withDelay(500, withTiming(0));
        await Clipboard.setStringAsync(data);
        timeout.current = setTimeout(
            () => (scale.value = withDelay(500, withTiming(1))),
            1000
        );
    };

    const animateStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });
    const animateReverseStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: 1 - scale.value }],
        };
    });

    return (
        <View
            style={{
                backgroundColor: COLORS.accent,
                borderRadius: STYLE_SYSTEM.borderRadius,
                padding: STYLE_SYSTEM.paddingLg,
                flexDirection: "row",
            }}>
            <View style={{ flex: 1 }}>
                <Text style={{ color: COLORS.muted }}>{field.key}</Text>
                <Text style={{ fontSize: 18 }}>{field.value}</Text>
            </View>
            <Pressable
                onPress={() => copyToClipboard(field.value)}
                style={{
                    height: "100%",
                    aspectRatio: 1,
                    alignSelf: "center",
                }}>
                <Animated.View
                    style={[
                        animateStyle,
                        {
                            position: "absolute",
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            alignItems: "center",
                            justifyContent: "center",
                        },
                    ]}>
                    <Feather name="copy" size={22} color={COLORS.primary} />
                </Animated.View>
                <Animated.View
                    style={[
                        animateReverseStyle,
                        {
                            position: "absolute",
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            alignItems: "center",
                            justifyContent: "center",
                        },
                    ]}>
                    <Feather name="check" size={22} color={COLORS.primary} />
                </Animated.View>
            </Pressable>
        </View>
    );
}

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
                        <Field field={item} />
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
