import { View, Text, Image } from "react-native";
import React from "react";
import { RouteProp } from "@react-navigation/native";
import { ParamListBase } from "../App";

export default function DocumentInfo({
    route,
}: {
    route: RouteProp<ParamListBase, "Info">;
}) {
    return (
        <View>
            <Text>{route.params.doc.title}</Text>
            <Text>{route.params.doc.caption}</Text>
            <Image
                source={{ uri: route.params.doc.imageFront }}
                style={{ width: "50%", aspectRatio: 1 }}
            />
            <Image
                source={{ uri: route.params.doc.imageBack }}
                style={{ width: "50%", aspectRatio: 1 }}
            />
        </View>
    );
}
