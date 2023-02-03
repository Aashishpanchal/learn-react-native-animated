import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AnimateStackParamsList } from "../../../types";
import {
  AnimatedInterpolate,
  BasicAnimatedGesture,
  BasicAnimations,
  CarouselAnimation,
  CarouselAnimation3D,
  Home,
  ScrollAnimation,
} from "../../screens";
import { Header } from "../../components";

const Stack = createNativeStackNavigator<AnimateStackParamsList>();

export default function AnimateStackNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "fade",
        header(props) {
          return <Header />;
        },
      }}
    >
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen
        name="animatedInterpolate"
        component={AnimatedInterpolate}
      />
      <Stack.Screen
        name="carouselAnimation"
        component={CarouselAnimation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="scrollAnimation"
        component={ScrollAnimation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="basicAnimatedGesture"
        component={BasicAnimatedGesture}
      />
      <Stack.Screen name="basicAnimations" component={BasicAnimations} />
      <Stack.Screen
        name="carouselAnimation3d"
        component={CarouselAnimation3D}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
