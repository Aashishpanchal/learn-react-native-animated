import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AnimateStackParamsList = {
  home: undefined;
  carouselAnimation: undefined;
  animatedInterpolate: undefined;
  scrollAnimation: undefined;
  basicAnimatedGesture: undefined;
  basicAnimations: undefined;
  carouselAnimation3d: undefined;
};

// my animate stack screen props
export type AnimateStackScreenProps<
  Screen extends keyof AnimateStackParamsList
> = NativeStackScreenProps<AnimateStackParamsList, Screen>;

// common callback function
export type EmptyCallback<R = void> = () => R;
