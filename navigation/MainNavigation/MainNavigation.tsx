import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AnimalsList from "../../screens/AnimalsScreen/AnimalsScreen";
import MainTabNavigator from "../MainTabNavigator/MainTabNavigator";

// import Animated, {
//   Easing,
//   useAnimatedScrollHandler,
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from "react-native-reanimated";
import { StyleSheet } from "react-native";
import AnimalScreen from "../../screens/AnimalScreen/AnimalScreen";
import Header from "../../components/Header";
import { useState, useRef } from "react";
import { Animated } from "react-native";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const [offset, setOffset] = useState(0);
  const [direction, setDirection] = useState(0); // 0 - down / 1 - up
  const [visible, setVisibility] = useState(true);
  const [heightZero] = useState(new Animated.Value(0));
  const [height, setHeight] = useState(new Animated.Value(48));
  const onScrollHandler = (e: any) => {
    const currentOffset = e.nativeEvent.contentOffset.y;
    var directionCurrent =
      currentOffset > offset ? 0 : currentOffset < offset ? 1 : direction;
    if (direction != directionCurrent) {
      setDirection(directionCurrent);
    }
    setOffset(currentOffset);
    if (directionCurrent === 0) {
      if (visible) {
        setVisibility(false);
        Animated.timing(height, {
          toValue: 0,
          duration: 150,
          useNativeDriver: false,
        }).start(() => {
          setHeight(new Animated.Value(0));
        });
      }
    } else {
      if (!visible) {
        setVisibility(true);
        Animated.timing(height, {
          toValue: 48,
          duration: 150,
          useNativeDriver: false,
        }).start(() => {
          setHeight(new Animated.Value(48));
        });
      }
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerStyle: { backgroundColor: "whitesmoke" } }}
      >
        <Stack.Screen
          name="Home"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Животиње"
          options={{
            headerShown: false,
          }}
        >
          {() => <AnimalsList onScrollhandle={onScrollHandler} />}
        </Stack.Screen>
        <Stack.Screen
          name="Animal"
          component={AnimalScreen}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Navigator;
