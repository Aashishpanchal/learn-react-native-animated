import React from "react";
import { PanResponder, Animated, useWindowDimensions } from "react-native";

const ImageUri =
  "https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200";

export default function Basic2() {
  const dimensions = useWindowDimensions();
  const pan = React.useRef(new Animated.ValueXY()).current;
  const scale = React.useRef(new Animated.Value(1)).current;

  const pointsDistance = ([xA, yA]: number[], [xB, YB]: number[]) => {
    return Math.sqrt(Math.pow(xA - xB, 2) + Math.pow(yA - YB, 2));
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const activeTouches = e.nativeEvent.changedTouches.length; // how many finger touch in your current set pan component. I am check only 1 and 2 finger touch on Image component
        if (activeTouches === 1) {
          pan.setValue({
            x: gestureState.dx,
            y: gestureState.dy,
          });
        } else if (activeTouches === 2) {
          const touches = e.nativeEvent.changedTouches;

          const touchA = touches[0];
          const touchB = touches[1];

          const distance = pointsDistance(
            [touchA.pageX, touchA.pageY],
            [touchB.pageX, touchB.pageY]
          );

          const screenMovePercents = distance / dimensions.width;

          //   scale.setValue(1 + screenMovePercents * 3);
          scale.setValue(1 + screenMovePercents);
        }
      },
      onPanResponderRelease(e, gestureState) {
        Animated.parallel([
          Animated.spring(pan, {
            toValue: {
              x: 0,
              y: 0,
            },
            bounciness: 30,
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            bounciness: 20,
          }),
        ]).start();
      },
    })
  ).current;

  return (
    <Animated.Image
      {...panResponder.panHandlers}
      source={{ uri: ImageUri }}
      className="w-11/12 h-60 rounded-lg"
      style={{
        transform: [{ translateX: pan.x }, { translateY: pan.y }, { scale }],
      }}
    />
  );
}
