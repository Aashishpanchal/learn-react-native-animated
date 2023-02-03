import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import AppNavigation from "./src/navigation";

export default function App() {
  return (
    <View className="flex-1 bg-white">
      <AppNavigation />
      <StatusBar style="auto" />
    </View>
  );
}
