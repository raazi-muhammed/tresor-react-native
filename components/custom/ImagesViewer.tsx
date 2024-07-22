import { View, Image, Text } from "react-native";
import React, { useRef, useState } from "react";
import { IImage } from "../../types/entities";
import { COLORS } from "../../styles/colors";
import { STYLE_SYSTEM } from "../../styles/styleSystem";
import PagerView, {
    PagerViewOnPageSelectedEvent,
} from "react-native-pager-view";
import IconButton from "../general/IconButton";

export default function ImagesViewer({ images }: { images: IImage[] }) {
    const [currentIdx, setCurrentIdx] = useState(0);
    const refPagerView = useRef<{ setPage: (n: number) => void }>();

    return (
        <View
            style={{
                height: 350,
                width: "100%",
                gap: STYLE_SYSTEM.padding,
            }}>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 4,
                }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                        Credit card
                    </Text>
                    <Text style={{ color: COLORS.muted }}>ending with..</Text>
                </View>
                <IconButton
                    style={{ alignSelf: "center" }}
                    onPress={() =>
                        requestAnimationFrame(() =>
                            refPagerView.current?.setPage(0)
                        )
                    }
                    iconName="chevron-thin-left"
                />
                <Text
                    style={{
                        color: COLORS.muted,
                    }}>{`${currentIdx + 1}/${images.length}`}</Text>
                <IconButton
                    style={{ alignSelf: "center" }}
                    onPress={() =>
                        requestAnimationFrame(() =>
                            refPagerView.current?.setPage(1)
                        )
                    }
                    iconName="chevron-thin-right"
                />
            </View>
            <PagerView
                overdrag
                onPageSelected={(e: PagerViewOnPageSelectedEvent) =>
                    setCurrentIdx(e.nativeEvent.position)
                }
                ref={refPagerView as any}
                style={{
                    flex: 1,
                    aspectRatio: 4 / 3,
                    maxWidth: "100%",
                }}
                initialPage={currentIdx}>
                {images.map((img, index) => (
                    <Image
                        key={index.toString()}
                        source={{ uri: img.uri }}
                        style={{
                            backgroundColor: COLORS.accent,
                            objectFit: "contain",
                            width: "auto",
                            maxWidth: "100%",
                            maxHeight: 300,
                            borderRadius: STYLE_SYSTEM.borderRadius,
                            aspectRatio: (img.width || 1) / (img.height || 1),
                            flex: 1,
                        }}
                    />
                ))}
            </PagerView>
        </View>
    );
}