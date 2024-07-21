import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, ScrollView, View } from "react-native";
import DocumentInfo from "../components/custom/DocumentCard";
import { useSQLiteContext } from "expo-sqlite";

export type Document = {
    id: string;
    title: string;
    caption?: string;
    imageFront: string;
    imageBack?: string;
};
export default function HomeScreen({ navigation }: { navigation: any }) {
    const db = useSQLiteContext();
    const [documents, setDocuments] = useState<Document[]>([]);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        async function setup() {
            const result = await db.getAllAsync<any>("SELECT * FROM documents");
            setDocuments(result);
        }
        setup();
    }, [refresh]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar />
            <Button title="refresh" onPress={() => setRefresh((r) => !r)} />
            <View style={{ padding: 12 }}>
                <ScrollView>
                    {documents.map((doc, index) => (
                        <DocumentInfo
                            onPress={() =>
                                navigation.navigate("Info", { doc: doc })
                            }
                            key={index}
                            document={doc}
                        />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
