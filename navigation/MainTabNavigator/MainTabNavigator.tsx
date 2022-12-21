import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import NotImplementedScreen from "../../screens/NotImplementedScreen/NotImplementedScreen";
import AnimalsList from "../../screens/AnimalsScreen/AnimalsScreen";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useState, useRef } from "react";
import { Animated, Easing, Image, View } from "react-native";
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
import TicketsScreen from "../../screens/TicketsScreen/TicketsScreen";
import iconStyles from "../../components/Icons/IconStyles";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const [offset, setOffset] = useState(0);
  const [direction, setDirection] = useState(0); // 0 - down / 1 - up
  const [visible, setVisibility] = useState(true);
  const [heightZero] = useState(new Animated.Value(0));
  const [opacityZeroArrow] = useState(new Animated.Value(0));
  const [heightBar1, setHeight1] = useState(new Animated.Value(1));
  // let heightBar=new Animated.Value(48);
  const heightBar = useRef(new Animated.Value(1)).current;
  const onScrollHandler = (e: any, iCall: boolean = false) => {
    var directionCurrent = 0;
    if (!iCall) {
      const currentOffset = e.nativeEvent.contentOffset.y;
      directionCurrent =
        currentOffset > offset ? 0 : currentOffset < offset ? 1 : direction;
      setOffset(currentOffset);
      if (currentOffset <= 0) directionCurrent = 1;
    } else {
      // console.log(iCall);
      if (direction == 1) directionCurrent = 0;
      else directionCurrent = 1;
    }

    // console.log(heightBar, currentOffset)
    if (direction != directionCurrent) {
      setDirection(directionCurrent);
    }

    if (directionCurrent === 0) {
      if (visible) {
        setVisibility(false);
        Animated.timing(heightBar, {
          toValue: 0,
          duration: 150,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(({ finished }) => {
          // setHeight(new Animated.Value(0));
          if (finished) {
            setHeight1(new Animated.Value(0));
            console.log(visible, "direction 0");
          }

          // setTimeout(()=>{
          //   console.log("PALIM")
          //   onScrollHandler(null, true);
          // }, 3000)
        });
        Animated.timing(opacityZeroArrow, {
          toValue: 1,
          duration: 150,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start();
        // console.log(heightBar, "dole");
      }
    } else {
      if (!visible || iCall) {
        setVisibility(true);
        Animated.timing(heightBar, {
          toValue: 1,
          duration: 150,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(({ finished }) => {
          // setHeight(new Animated.Value(1));
          if (finished) {
            setHeight1(new Animated.Value(1));
            console.log(visible, "direction 1");
          }
        });
        Animated.timing(opacityZeroArrow, {
          toValue: 0,
          duration: 150,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start();
        // console.log(heightBar, "gore");
      }
    }
  };

  return (
    <>
      <Animated.View
        style={{
          zIndex: !visible ? 99 : 0,
          position: "absolute",
          bottom: 5,
          opacity: opacityZeroArrow,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <MaterialIcons
          name="arrow-drop-up"
          size={54}
          color="black"
          onPress={() => onScrollHandler(null, true)}
        /> */}
        <MaterialCommunityIcons
          // name="chevron-double-up"
          name="gesture-tap"
          size={27}
          color="black"
          style={{ backgroundColor: "white", borderRadius: 15, padding: 2 }}
          onPress={() => onScrollHandler(null, true)}
        />
      </Animated.View>
      <Tab.Navigator
        initialRouteName="Животиње"
        screenOptions={({ navigation }) => ({
          tabBarInactiveTintColor: "#b8e3fa",
          tabBarActiveTintColor: "#F9F8F3",
          tabBarActiveBackgroundColor: "#9353dc",
          tabBarStyle: [
            {
              backgroundColor: "transparent",
              shadowColor: "transparent",
              position: "absolute",
              opacity: heightBar,
              borderTopColor: "#9353dc",
            },
            !visible &&
              (heightBar1 as any)._value === 0 && {
                display: "none",
                height: 0,
              },
          ],
          tabBarIconStyle: { opacity: navigation.isFocused() ? 1 : 0.7 },
          // headerStyle: { backgroundColor: "whitesmoke" },
          // tabBarShowLabel: false,
          headerShown: true,
          tabBarHideOnKeyboard: true,
          tabBarLabelStyle: {
            backgroundColor: navigation.isFocused() ? "#9353dc" : "#2d6850",
            textTransform: "uppercase",
            paddingHorizontal: 4,
            borderRadius: 10,
            color: "white",
            fontWeight: "700",
          },
          headerRight: () => (
            <Image
              source={require("../../assets/logo/pandaWhite1.png")}
              style={{ width: 40, height: 40, marginRight: 10 }}
            />
          ),
        })}
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
            // console.log("state changed", e.data);

            // Do something with the `navigation` object
            if (!navigation.canGoBack()) {
              // console.log("we're on the initial screen");
            }
          },
        })}
      >
        <Tab.Screen
          name="Улазнице"
          component={TicketsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo
                name="ticket"
                size={size}
                color={color}
                style={iconStyles.tabBarIconStyle}
              />
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
                style={iconStyles.tabBarIconStyle}
              />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Догађаји"
          component={NotImplementedScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name="event"
                size={size}
                color={color}
                style={iconStyles.tabBarIconStyle}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Животиње"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo
                name="evernote"
                size={size}
                color={color}
                style={iconStyles.tabBarIconStyle}
              />
            ),
            headerShown: false,
            // tabBarStyle: [
            //   {
            //     opacity: heightBar,
            //   }
            //     // height: heightBar
            //     // visible && {transform: [{ translateY: heightBar }]}
            //   ,
            //   !visible &&
            //     (heightBar1 as any)._value === 0 && {
            //       display: "none",
            //       height: 0
            //     },
            // ],
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
              <AntDesign
                name="customerservice"
                size={size}
                color={color}
                style={iconStyles.tabBarIconStyle}
              />
            ),
            // headerShown: true,
            // headerRight: () => (
            //   <Image
            //     source={require("../../assets/logo/pandaWhite1.png")}
            //     style={{ width: 40, height: 40, marginRight: 10 }}
            //   />
            // ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default MainTabNavigator;
