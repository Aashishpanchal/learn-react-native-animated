import React from "react";
import { useWindowDimensions, Animated } from "react-native";

const CURSOR_SIDE_SIZE = 20;
const CURSOR_HALF_SIDE_SIZE = CURSOR_SIDE_SIZE / 2;

export default function BasicAnimatedGestures() {
  const dimension = useWindowDimensions();
  const touch = React.useRef(
    new Animated.ValueXY({
      x: dimension.width / 2 + CURSOR_HALF_SIDE_SIZE,
      y: dimension.height / 2 + CURSOR_HALF_SIDE_SIZE,
    })
  ).current;

  return (
    <Animated.View
      className="flex-1"
      onStartShouldSetResponder={() => true}
      onResponderMove={Animated.event(
        [{ nativeEvent: { locationX: touch.x, locationY: touch.y } }],
        { useNativeDriver: false }
      )}
      onResponderRelease={() => {
        Animated.spring(touch, {
          toValue: {
            x: dimension.width / 2 + CURSOR_HALF_SIDE_SIZE,
            y: dimension.height / 2 + CURSOR_HALF_SIDE_SIZE,
          },
          useNativeDriver: false,
        }).start();
      }}
    >
      <Animated.View
        className="absolute bg-orange-400"
        style={{
          left: touch.x,
          top: touch.y,
          height: CURSOR_SIDE_SIZE,
          width: CURSOR_SIDE_SIZE,
          borderRadius: CURSOR_HALF_SIDE_SIZE,
        }}
      ></Animated.View>
    </Animated.View>
  );
}
