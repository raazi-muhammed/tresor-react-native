import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen, { Document } from "./screens/HomeScreen";
import DocumentInfo from "./screens/DocumentInfo";
import AddDocument from "./components/custom/AddDocument";
import { COLORS } from "./styles/colors";
import { DbProvider } from "./db/Provider";

export type ParamListBase = {
    Tresor: {};
    Info: {
        doc: Document;
    };
};

const Stack = createNativeStackNavigator<ParamListBase>();

export default function App() {
    return (
        <DbProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Tresor">
                    <Stack.Screen
                        name="Tresor"
                        component={HomeScreen as any}
                        options={{
                            headerLargeTitle: true,
                            headerTitleStyle: {
                                color: COLORS.primary,
                            },
                            headerRight: () => <AddDocument />,
                        }}
                    />
                    <Stack.Screen
                        name="Info"
                        component={DocumentInfo as any}
                        options={({ route }) => ({
                            title: route.params.doc.title,
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </DbProvider>
    );
}
