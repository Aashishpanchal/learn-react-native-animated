import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { EmptyCallback } from "../../../types";

type ButtonProps = {
  title: string;
  onPress?: EmptyCallback;
  className?: string;
};

export default function Button({
  title,
  onPress,
  className = "",
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      className={"rounded-md p-2 bg-orange-400 ".concat(className)}
      onPress={onPress}
      style={{ elevation: 1 }}
    >
      <Text className="font-bold text-white">{title}</Text>
    </TouchableOpacity>
  );
}
