import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import Header from "./components/Header";
import Navigator from "./navigation/MainNavigation/MainNavigation";
import AnimalsList from "./screens/AnimalsScreen/AnimalsScreen";
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function App() {
  //   const translateY = useSharedValue(0);
  //   const lastContentOffset = useSharedValue(0);
  //   const isScrolling = useSharedValue(false);

  //   const actionBarStyle = useAnimatedStyle(() => {
  //     return {
  //       transform: [
  //         {
  //           translateY: withTiming(translateY.value, {
  //             duration: 750,
  //             easing: Easing.inOut(Easing.ease),
  //           }),
  //         },
  //       ],
  //     };
  //   });

  //   const scrollHandler = useAnimatedScrollHandler({
  //     onScroll: (event) => {
  //       if (
  //         lastContentOffset.value > event.contentOffset.y &&
  //         isScrolling.value
  //       ) {
  //         translateY.value = 0;
  //         console.log("scrolling up");
  //       } else if (
  //         lastContentOffset.value < event.contentOffset.y &&
  //         isScrolling.value
  //       ) {
  //         translateY.value = 100;
  //         console.log("scrolling down");
  //       }
  //       lastContentOffset.value = event.contentOffset.y;
  //     },
  //     onBeginDrag: (e) => {
  //       isScrolling.value = true;
  //     },
  //     onEndDrag: (e) => {
  //       isScrolling.value = false;
  //     },
  //   });

  return (
    <View style={styles.container}>
      {/* <Animated.View style={[actionBarStyle]}> */}
      <Header left={true} />
      {/* </Animated.View> */}
      <Navigator />
      {/* <Animated.ScrollView onScroll={scrollHandler} style={styles.scrollView}>
        <AnimalsList />
      </Animated.ScrollView> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 30,
  },
  action: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 25,
    padding: 15,
    position: "absolute",
    bottom: 5,
    backgroundColor: "#000",
    width: "50%",
    justifyContent: "space-around",
  },
  actionItem: {
    color: "#fff",
  },
});
