import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import DocumentInfo from "./components/custom/DocumentCard";
import AddDocument from "./components/custom/AddDocument";
import { COLORS } from "./styles/colors";
import Heading from "./components/general/Heading";

export type Document = {
    id: string;
    title: string;
    caption?: string;
    images: {
        uri: string;
    }[];
};
export default function App() {
    const [documents, setDocuments] = useState<Document[]>([
        {
            id: "1",
            title: "Credit Card",
            caption: "card ending with 3122",
            images: [
                {
                    uri: "null",
                },
            ],
        },
    ]);

    function addDocument(data: Document) {
        const d = documents;
        d.push(data);
        setDocuments([...d]);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar />
            <View style={{ padding: 12 }}>
                <AddDocument addDocument={addDocument} />
                <Heading variant="main">Tresor</Heading>
                <ScrollView>
                    {documents.map((doc, index) => (
                        <DocumentInfo key={index} document={doc} />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
