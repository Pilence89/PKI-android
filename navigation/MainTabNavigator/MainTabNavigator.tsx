import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NotImplementedScreen from "../../screens/NotImplementedScreen/NotImplementedScreen";
import AnimalsList from "../../screens/AnimalsScreen/AnimalsScreen";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useState, useRef } from "react";
import { Animated } from "react-native";
import Header from "../../components/Header";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
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
    <Tab.Navigator
      initialRouteName="Животиње"
      screenOptions={{
        tabBarStyle: { backgroundColor: "whitesmoke" },
        // headerStyle: { backgroundColor: "whitesmoke" },

        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Status"
        component={NotImplementedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="logo-whatsapp" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Calls"
        component={NotImplementedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="call-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={NotImplementedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="camera-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Животиње"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="evernote" size={size} color={color} />
          ),
          tabBarStyle: [
            {
              height: height,
            },
            !visible &&
              (height as any)._value === (heightZero as any)._value && {
                display: "none",
              },
          ],
        }}
      >
        {() => <AnimalsList onScrollhandle={onScrollHandler} />}
      </Tab.Screen>
      <Tab.Screen
        name="Settings"
        component={NotImplementedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="customerservice" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
