import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import DocumentInfo from "./DocumentCard";
import { useSQLiteContext } from "expo-sqlite";
import { IDocument } from "@app/types/entities";
import {
    GestureHandlerRootView,
    Swipeable,
} from "react-native-gesture-handler";
import { STYLE_SYSTEM } from "@styles/styleSystem";
import DeleteDocument from "./DeleteDocument";
import { COLORS } from "@styles/colors";

export default function HomeScreen({ navigation }: { navigation: any }) {
    const db = useSQLiteContext();
    const [documents, setDocuments] = useState<IDocument[]>([]);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const refreshDocuments = () => setRefresh((r) => !r);
    useEffect(() => {
        setLoading(true);
        async function setup() {
            const result = await db.getAllAsync<any>(`SELECT * FROM documents 
              INNER JOIN images 
              ON documents.id = images.document_id
              GROUP BY documents.id
              `);
            setDocuments(result);
        }
        setup();
        setLoading(false);
    }, [refresh]);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.background,
            }}>
            <StatusBar />
            <View style={{ padding: 12, flex: 1 }}>
                <FlatList
                    keyExtractor={(item) => item.id.toString()}
                    data={documents}
                    ListHeaderComponentStyle={{
                        marginBottom: STYLE_SYSTEM.padding,
                    }}
                    onRefresh={() => refreshDocuments()}
                    refreshing={loading}
                    renderItem={({ item }) => (
                        <GestureHandlerRootView>
                            <Swipeable
                                enableTrackpadTwoFingerGesture
                                overshootLeft
                                overshootRight
                                overshootFriction={8}
                                renderRightActions={() => (
                                    <DeleteDocument
                                        document={item}
                                        refreshDocuments={refreshDocuments}
                                    />
                                )}>
                                <DocumentInfo
                                    onPress={() =>
                                        navigation.navigate("Info", {
                                            doc: item,
                                        })
                                    }
                                    key={item.id}
                                    document={item}
                                />
                            </Swipeable>
                        </GestureHandlerRootView>
                    )}
                    ItemSeparatorComponent={() => (
                        <View style={{ height: STYLE_SYSTEM.padding }} />
                    )}
                    ListEmptyComponent={() => <Text>No documents</Text>}
                />
            </View>
        </SafeAreaView>
    );
}
