import React from "react";
import { FlatList, Text, View } from "react-native";
import { AnimateStackScreenProps, AnimateStackParamsList } from "../../types";
import { Card } from "../components";

type List = {
  title: string;
  nav: keyof AnimateStackParamsList;
  img: string;
  header: string;
  description: string;
};

export default function Home({ navigation }: AnimateStackScreenProps<"home">) {
  const lists = React.useMemo(
    (): List[] => [
      {
        title: "Interpolate",
        nav: "animatedInterpolate",
        img: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*FTfbzkTfxCXF5JZWkYt9Bw.png",
        header: "React Native interpolate",
        description:
          "I make this through a evening kid blog medium and I learn this while learning react native animated api",
      },
      {
        title: "Animated and React Native ScrollView",
        nav: "scrollAnimation",
        img: "https://miro.medium.com/max/472/1*e7VYDdWC1uXv498uwAnobA.gif",
        header: "Animated and React Native ScrollView",
        description:
          "I make this through a evening kid blog medium and I learn this while learning react native animated api",
      },
      {
        title: "Basic React Native Gesture",
        nav: "basicAnimatedGesture",
        img: "https://miro.medium.com/max/720/1*GvqyhVNhVsBt63f-_J4SUw.webp",
        header: "The Basic of React Native Gestures",
        description:
          "I make this through a evening kid blog medium and I learn this while learning react native animated api",
      },
      {
        title: "Basic Animations",
        nav: "basicAnimations",
        img: "https://miro.medium.com/max/720/1*Iv8b2hF5eJbAbIWs0XxExw.webp",
        header: "The Basic of Animation in React Native",
        description:
          "I make this through a evening kid blog medium and I learn this while learning react native animated api",
      },
      {
        title: "Simple Card Slider",
        nav: "carouselAnimation",
        img: "https://cdn.dribbble.com/users/1980084/screenshots/14139308/media/f9966833ad63eaaddd19a460832b4864.gif",
        header:
          "Simple Carousel Animation in React Native using FlatList & Animated API",
        description:
          "it's simple image card slider. this is very easy, you need knowledge of react native animated api and interpolate method, you can make easily.",
      },
      {
        title: "3D Card Slider",
        nav: "carouselAnimation3d",
        img: "https://cdn.dribbble.com/users/1261701/screenshots/3147975/media/d7a2d02483a7a880d90bac353eea905a.gif",
        header:
          "Advanced 3D Carousel Animation in React Native using FlatList & Animated API",
        description:
          "It was very difficult but I tried to make it and I made it. if know normal the mathematical concept and React Native Animated API concept, then you can make it in a very easy way",
      },
    ],
    []
  );

  const onPressNav = (nav: keyof AnimateStackParamsList) => () =>
    navigation.navigate(nav);

  return (
    <View className="flex-1 p-2">
      <Text className="text-center font-bold text-gray-900">
        Basic of React Animate
      </Text>
      <View className="flex-1">
        <FlatList
          data={lists}
          renderItem={({ item }) => (
            <Card.Container onPress={onPressNav(item.nav)}>
              {/* image */}
              <Card.Image source={{ uri: item.img }} />
              {/* content */}
              <Card.Content>
                {/* header */}
                <Text className="text-lg">{item.header}</Text>
                {/* paragraph */}
                <Text className="text-xs">{item.description}</Text>
              </Card.Content>
            </Card.Container>
          )}
        />
      </View>
    </View>
  );
}
