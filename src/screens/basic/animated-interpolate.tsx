import React from "react";
import { View, Text, Animated, Platform, Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

export default function AnimatedInterpolate() {
  const translation = React.useRef(new Animated.Value(0)).current;

  const onAnimationStart = () => {
    translation.setValue(0);
    Animated.timing(translation, {
      toValue: width - 100,
      duration: 1000,
      useNativeDriver: Platform.OS === "ios",
    }).start();
  };

  React.useEffect(() => {
    onAnimationStart();
  }, []);

  return (
    <View className="flex-1">
      <Text className="font-bold text-center py-1 text-lg">
        Basic of Interpolate
      </Text>
      <View className="flex-1">
        <View className="p-2 my-4 space-y-2">
          <Text className="font-bold">
            1. Interpolation is a way of estimating a function at intermediate
            points, learning from the ranges you provide.
          </Text>
          <Text className="font-bold">
            2. Interpolation animated values with interpolate. It maps an input
            range to values from an output range (numbers, colors, degrees)
          </Text>
          <Text className="font-bold">
            3. Extend or clamp an output range on the left, right or both sides
            with extrapolation.
          </Text>
        </View>
        <Animated.View
          style={{
            width: 100,
            height: 100,
            backgroundColor: translation.interpolate({
              inputRange: [0, width - 100],
              outputRange: ["red", "orange"],
            }),
            opacity: translation.interpolate({
              inputRange: [0, width / 2, width - 100],
              outputRange: [1, 0, 1],
            }),
            transform: [
              { translateX: translation },
              {
                rotate: translation.interpolate({
                  inputRange: [0, width - 100],
                  outputRange: ["0deg", "360deg"],
                }),
              },
            ],
          }}
        ></Animated.View>
      </View>
    </View>
  );
}
