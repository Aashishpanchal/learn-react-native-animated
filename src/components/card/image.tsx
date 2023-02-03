import React from "react";
import { View, Image as ReactNativeImage } from "react-native";
import type { ImageSourcePropType } from "react-native";

type CardImageProps = {
  source: ImageSourcePropType;
};

export default function Image({ source }: CardImageProps) {
  return (
    <View className="w-full h-56 bg-white">
      <ReactNativeImage
        resizeMode="center"
        className="w-full h-full"
        source={source}
      />
    </View>
  );
}
