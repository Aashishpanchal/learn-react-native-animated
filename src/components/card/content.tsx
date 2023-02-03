import React from "react";
import { View } from "react-native";
import type { PropsWithChildren } from "react";

type CardContentProps = PropsWithChildren;

export default function Content({ children }: CardContentProps) {
  return <View className="p-4 space-y-2">{children}</View>;
}
