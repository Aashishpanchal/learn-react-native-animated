import React from "react";
import { View, Text, StatusBar } from "react-native";

export default function Header() {
  return (
    <View
      className={`bg-red-400`}
      style={{
        height: (StatusBar.currentHeight as number) + 45,
        elevation: 1,
      }}
    >
      <View
        className="flex-1 justify-center px-2"
        style={{ paddingTop: StatusBar.currentHeight }}
      >
        <Text className="font-bold text-gray-900 text-lg">React Animated</Text>
      </View>
    </View>
  );
}
