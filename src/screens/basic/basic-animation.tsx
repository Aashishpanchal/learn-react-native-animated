import React from "react";
import { View, Animated, useWindowDimensions } from "react-native";
import { Button } from "../../components";

export default function BasicAnimation() {
  const dimensions = useWindowDimensions();
  const animate1 = React.useRef(new Animated.Value(0)).current;
  const animate2 = React.useRef(new Animated.Value(0)).current;
  const opacity = React.useRef(new Animated.Value(1)).current;

  const onAnimate1 = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(animate1, {
          toValue: dimensions.width - 200,
          useNativeDriver: true,
        }),
        Animated.spring(animate1, {
          toValue: 0,
          bounciness: 20,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: animate1.interpolate({
            inputRange: [0, dimensions.width - 200],
            outputRange: [0, 1],
            extrapolate: "clamp",
          }),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  const onAnimate2 = () => {
    Animated.sequence([
      Animated.timing(animate2, {
        toValue: -dimensions.height / 2,
        useNativeDriver: true,
      }),
      Animated.spring(animate2, {
        toValue: 0,
        damping: 10,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View className="flex-1 items-center justify-center">
      {/* timing method in animated api */}
      <Animated.View
        className="w-12 h-12 rounded-lg bg-yellow-500"
        style={{
          transform: [{ translateX: animate1 }, { translateY: animate2 }],
          opacity,
        }}
      ></Animated.View>
      <View className="flex-row">
        <Button
          className="self-center mt-3 mr-2"
          title="Right"
          onPress={onAnimate1}
        />
        <Button className="self-center mt-3" title="Top" onPress={onAnimate2} />
      </View>
    </View>
  );
}
