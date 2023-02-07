import { NavigationContainer, useRoute } from "@react-navigation/native";
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
import { Image, LogBox, StyleSheet, Text, View } from "react-native";
import AnimalScreen from "../../screens/AnimalScreen/AnimalScreen";
import Header from "../../components/Header";
import { useState, useEffect, useContext } from "react";
import { Animated } from "react-native";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../../firebase";
import SignInScreen from "../../screens/SignInScreen/SignInScreen";
import GlobalContext from "../../Context/Context";
import { collection, onSnapshot, query } from "firebase/firestore";
import { ProfileItem, ProfileLikes } from "../../data/profile/profileItem";


LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

const Stack = createNativeStackNavigator();
const StackSign = createNativeStackNavigator();

const Navigator = () => {
  const [offset, setOffset] = useState(0);
  const [direction, setDirection] = useState(0); // 0 - down / 1 - up
  const [visible, setVisibility] = useState(true);
  const [heightZero] = useState(new Animated.Value(0));
  const {currUser, setCurrUser,profileInfo, setProfileInfo, setProfileLikes} = useContext(GlobalContext);
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

  // const [currUser, setCurrUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      
      if (user) {
        setCurrUser(user);
      }
    });
    return () => unsubscribe();
  }, []);

  const usersQuery = query(
    collection(db, "users")
  );

  useEffect(() => {
    if(currUser){
    const unsubscribe = onSnapshot(usersQuery, (querySnapshot) => {
      const parsedEvents = querySnapshot.docs.map((doc) => doc.data() as ProfileItem).find(x=>x.username==currUser?.email);
      console.log("PROFILE INFO", currUser?.email);
      // console.log(parsedEvents);
      setProfileInfo(parsedEvents ? parsedEvents : null);
    });
    return () => unsubscribe();
  }
  }, [currUser]);

  const usersLikes = query(
    collection(db, "usersLikes")
  );
  useEffect(() => {
    if(currUser){
      const unsubscribe = onSnapshot(usersLikes, (querySnapshot) => {
        const parsedEvents = querySnapshot.docs.filter(x=>x.id==currUser?.email).map((doc) => doc.data() as ProfileLikes);
        // console.log("LIKES");
        // console.log(parsedEvents);
        if(parsedEvents.length==1)
        setProfileLikes(parsedEvents[0]);
      });
      return () => unsubscribe();
    }
  }, [currUser]);
  // console.log(currUser);
  return (
    <NavigationContainer >
      { currUser ? (<Stack.Navigator
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
      </Stack.Navigator>) : 
      (<StackSign.Navigator screenOptions={{ headerStyle: { backgroundColor: "whitesmoke" }, headerRight: () => (
            <View style={{flexDirection
            :"row", alignItems:"center", flex:1, justifyContent:"space-between", marginLeft:25}}><Image
            source={require("../../assets/logo/pandaWhite1.png")}
            style={{ width: 40, height: 40 }}
          /><Text style={{fontWeight:"700"}}>ПАНДИЦА ЗОО</Text><Image
              source={require("../../assets/logo/pandaWhite1.png")}
              style={{ width: 40, height: 40 }}
            /></View>
          ) }}>
                <StackSign.Screen
          name="Уђите"
          component={SignInScreen}
          
        />
        </StackSign.Navigator>)}
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
