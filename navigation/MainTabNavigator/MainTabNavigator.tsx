import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import NotImplementedScreen from "../../screens/NotImplementedScreen/NotImplementedScreen";
import AnimalsList from "../../screens/AnimalsScreen/AnimalsScreen";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useState, useRef } from "react";
import { Animated, Image } from "react-native";
import Header from "../../components/Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import ProfileScreen from "../../screens/ProfileScreen/ProfileScreen";
import {
  default as Animated1,
  FadeInUp,
  FadeOutDown,
  FlipOutYLeft,
  Layout,
} from "react-native-reanimated";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const [offset, setOffset] = useState(0);
  const [direction, setDirection] = useState(0); // 0 - down / 1 - up
  const [visible, setVisibility] = useState(true);
  const [heightZero] = useState(new Animated.Value(0));
  // const [height, setHeight] = useState(new Animated.Value(48));
  const height = useRef(new Animated.Value(1)).current;
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
          useNativeDriver: true,
        }).start(() => {
          // setHeight(new Animated.Value(0));
        });
      }
    } else {
      if (!visible) {
        setVisibility(true);
        Animated.timing(height, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start(() => {
          // setHeight(new Animated.Value(48));
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
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props) => (
        <Animated1.View
          entering={FadeInUp}
          exiting={FlipOutYLeft}
          layout={Layout.duration(1000)}
        >
          {<BottomTabBar {...props} />}
        </Animated1.View>
      )}
      screenListeners={({ navigation }) => ({
        //OVO JE ZA ANIMACIJU DA JE MOZES POKRENUTI
        state: (e) => {
          // Do something with the state
          console.log("state changed", e.data);

          // Do something with the `navigation` object
          if (!navigation.canGoBack()) {
            console.log("we're on the initial screen");
          }
        },
      })}
    >
      <Tab.Screen
        name="Улазнице"
        component={NotImplementedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="ticket" size={size} color={color} />
          ),
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tab.Screen
        name="Промоције"
        component={NotImplementedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="party-popper"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Догађаји"
        component={NotImplementedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="event" size={24} color="black" />
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
              opacity: height,
            },
            !visible &&
              (height as any)._value === (heightZero as any)._value && {
                display: "none",
              },
          ],
        }}
      >
        {() => (
          // <Animated1.View
          //   entering={FadeInUp}
          //   exiting={FadeOutDown}
          //   layout={Layout.duration(200)}
          // >
          <AnimalsList onScrollhandle={onScrollHandler} />
          // {/* </Animated1.View> */}
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Профил"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="customerservice" size={size} color={color} />
          ),
          headerShown: true,
          headerRight: () => (
            <Image
              source={require("../../assets/logo/pandaWhite1.png")}
              style={{ width: 40, height: 40, marginRight: 10 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
