import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AnimateStackNav } from "./animate-nav";

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <AnimateStackNav />
    </NavigationContainer>
  );
}
