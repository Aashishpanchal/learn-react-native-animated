import React from "react";
import type { PropsWithChildren } from "react";
import { TouchableOpacity } from "react-native";
import { EmptyCallback } from "../../../types";

type CardContainerProps = PropsWithChildren<{
  onPress: EmptyCallback;
}>;

export default function Container({ onPress, children }: CardContainerProps) {
  return (
    <TouchableOpacity
      className="rounded-lg overflow-hidden bg-white mt-2"
      style={{ elevation: 1 }}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
}
