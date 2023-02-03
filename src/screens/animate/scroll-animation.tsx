import { View, Text, StatusBar, Image, Animated } from "react-native";
import React from "react";

export default function ScrollAnimation() {
  const list = React.useMemo(
    () => [
      "https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200",
      "https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200",
      "https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200",
      "https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200",
      "https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200",
      "https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200",
      "https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200",
    ],
    []
  );

  const scrolling = React.useRef(new Animated.Value(0)).current;

  const translation = scrolling.interpolate({
    inputRange: [100, 230],
    outputRange: [-100, 0],
    extrapolate: "clamp",
  });

  const opacity = scrolling.interpolate({
    inputRange: [100, 230],
    outputRange: [0, 1],
  });

  return (
    <>
      {/* custom header */}
      <Animated.View
        className={`absolute left-0 right-0 h-20 bg-teal-500 justify-center px-2 z-10`}
        style={{
          transform: [{ translateY: translation }],
          opacity,
          paddingTop: StatusBar.currentHeight,
        }}
      >
        <Text className="font-bold text-lg text-center">
          React Native Scroll View
        </Text>
      </Animated.View>
      {/* main content */}
      <Animated.ScrollView
        className="flex-1"
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrolling,
                },
              },
            },
          ],
          { useNativeDriver: false }
        )}
      >
        <Text className="font-bold text-lg text-center py-3 bg-indigo-500 text-white">
          Image Cards
        </Text>
        <View
          className="space-y-2 pb-4 p-2"
          style={{
            paddingTop: StatusBar.currentHeight,
          }}
        >
          {list.map((item, index) => (
            <Image
              key={index}
              source={{ uri: item }}
              className="w-full h-96 rounded-lg"
            />
          ))}
        </View>
      </Animated.ScrollView>
    </>
  );
}
