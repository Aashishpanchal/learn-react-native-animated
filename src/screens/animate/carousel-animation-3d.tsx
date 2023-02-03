import * as React from "react";
import {
  Image,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const { width } = Dimensions.get("screen");
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { DATA } from "../../constants";

const IMAGE_WIDTH = width * 0.65;
const IMAGE_HEIGHT = IMAGE_WIDTH * 0.7;
const SPACING = 20;

const Content = ({ item }: { item: typeof DATA[0] }) => {
  return (
    <>
      <Text
        className="text-center font-bold uppercase text-lg"
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {item.title}
      </Text>
      <Text style={{ fontSize: 12, opacity: 0.4 }}>{item.subtitle}</Text>
      <View className="flex-row" style={{ marginTop: SPACING }}>
        <Text
          className="font-black tracking-wider mr-5"
          style={{ fontSize: 42 }}
        >
          {item.price}
        </Text>
        <Text
          className="font-extrabold items-end"
          style={{ fontSize: 16, lineHeight: 36 }}
        >
          IND
        </Text>
      </View>
    </>
  );
};

export default function CarouselAnimation3D() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const progress = Animated.modulo(Animated.divide(scrollX, width), width);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const ref = React.useRef<FlatList>(null);

  const onNext = () => {
    ref.current?.scrollToOffset({
      offset: (activeIndex + 1) * width,
      animated: true,
    });
    setActiveIndex((prev) => (prev === DATA.length - 1 ? prev : prev + 1));
  };

  const onPrev = () => {
    ref.current?.scrollToOffset({
      offset: (activeIndex - 1) * width,
      animated: true,
    });
    setActiveIndex((prev) => (prev === 0 ? prev : prev - 1));
  };

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <View
        className="absolute top-0 bottom-0 left-0 right-0" // same all properties available inside StyleSheet.absoluteFillObject object
        // style={StyleSheet.absoluteFillObject}
      >
        {DATA.map((item, index) => {
          const inputRange = [
            (index - 1) * width, // previous
            index * width, // current
            (index + 1) * width, // next
          ];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });

          return (
            <Animated.Image
              key={`image-${index}`}
              source={{ uri: item.image }}
              style={[StyleSheet.absoluteFillObject, { opacity }]}
              blurRadius={50}
            />
          );
        })}
      </View>
      <SafeAreaView style={{ marginTop: SPACING * 4 }}>
        <View className="relative" style={{ height: IMAGE_HEIGHT * 2.1 }}>
          <Animated.FlatList
            ref={ref}
            className="flex-grow-0 "
            data={DATA}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            keyExtractor={(item) => item.key}
            horizontal
            pagingEnabled
            bounces={false}
            contentContainerStyle={{
              height: IMAGE_HEIGHT + SPACING * 2,
              paddingHorizontal: SPACING * 2,
            }}
            onMomentumScrollEnd={(e) => {
              setActiveIndex(
                Math.floor(Math.round(e.nativeEvent.contentOffset.x / width))
              );
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 1) * width, // previous
                index * width, // current
                (index + 1) * width, // next
              ];

              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0, 1, 0],
                extrapolate: "clamp",
              });

              const translateY = scrollX.interpolate({
                inputRange,
                outputRange: [50, 0, 50],
                extrapolate: "clamp",
              });
              return (
                <Animated.View
                  style={{
                    width,
                    paddingVertical: SPACING,
                    opacity,
                    transform: [{ translateY }],
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    className="rounded-lg"
                    style={{
                      width: IMAGE_WIDTH,
                      height: IMAGE_HEIGHT,
                      resizeMode: "cover",
                    }}
                  />
                </Animated.View>
              );
            }}
          />
          {/* All text data of image */}
          <View
            className="items-center"
            style={{
              width: IMAGE_WIDTH,
              paddingHorizontal: SPACING * 2,
              marginLeft: SPACING * 2,
            }}
          >
            {DATA.map((item, index) => {
              const inputRange = [
                (index - 0.2) * width, // previous
                index * width, // current
                (index + 0.2) * width, // next
              ];

              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0, 1, 0],
                extrapolate: "clamp",
              });

              const rotateY = scrollX.interpolate({
                inputRange,
                outputRange: ["45deg", "0deg", "45deg"],
                extrapolate: "clamp",
              });

              return (
                <Animated.View
                  key={index}
                  className="absolute"
                  style={{
                    opacity,
                    transform: [{ perspective: IMAGE_WIDTH * 4 }, { rotateY }],
                  }}
                >
                  <Content item={item} />
                </Animated.View>
              );
            })}
          </View>
          {/* white border behind of FlatList */}
          <Animated.View
            className="absolute bg-white bottom-0 rounded-lg"
            style={{
              width: IMAGE_WIDTH + SPACING * 2,
              backfaceVisibility: "visible",
              zIndex: -1,
              top: SPACING * 2,
              left: SPACING,
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 24,
              shadowOffset: {
                width: 0,
                height: 0,
              },
              transform: [
                {
                  perspective: IMAGE_WIDTH * 4,
                },
                {
                  rotateY: progress.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: ["0deg", "90deg", "180deg"],
                  }),
                },
              ],
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: IMAGE_WIDTH + SPACING * 4,
            paddingHorizontal: SPACING,
            paddingVertical: SPACING,
          }}
        >
          <TouchableOpacity
            disabled={activeIndex === 0}
            style={{ opacity: activeIndex === 0 ? 0.5 : 1 }}
            onPress={onPrev}
          >
            <View className="flex-row items-center">
              <AntDesign name="swapleft" size={42} color="black" />
              <Text className="font-extrabold" style={{ fontSize: 12 }}>
                PREV
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={activeIndex === DATA.length - 1}
            style={{ opacity: activeIndex === DATA.length - 1 ? 0.5 : 1 }}
            onPress={onNext}
          >
            <View className="flex-row items-center">
              <Text className="font-extrabold" style={{ fontSize: 12 }}>
                NEXT
              </Text>
              <AntDesign name="swapright" size={42} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
