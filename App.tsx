import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import DocumentInfo from "./screens/DocumentInfo";
import { COLORS } from "./styles/colors";
import { DbProvider } from "./db/Provider";
import { IDocument } from "./types/entities";
import AddDocument from "./screens/AddDocument";

export type ParamListBase = {
    Tresor: {};
    Info: {
        doc: IDocument;
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
                            headerShadowVisible: false,
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
