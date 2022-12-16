import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerOuter: {
    position: "absolute",
    top: 10,
    width: 90,
    zIndex: 100,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    // justifyContent: "flex-start",
    // alignSelf: "flex-start",
    width: 40,
    height: 40,
  },
  title: {
    color: "#ffa",
    fontWeight: "600",
    // alignSelf: "flex-start",
    fontSize: 11,
    marginLeft: 5,
    textShadow:
      "1px 1px 0 #000,-1px 1px 0 #000, 1px -1px 0 #000,-1px -1px 0 #000, 0px 1px 0 #000, 0px -1px 0 #000, -1px 0px 0 #000, 1px 0px 0 #000, 2px 2px 0 #000, -2px 2px 0 #000, 2px -2px 0 #000, -2px -2px 0 #000, 0px 2px 0 #000, 0px -2px 0 #000, -2px 0px 0 #000, 2px 0px 0 #000, 1px 2px 0 #000, -1px 2px 0 #000, 1px -2px 0 #000, -1px -2px 0 #000, 2px 1px 0 #000, -2px 1px 0 #000, 2px -1px 0 #000, -2px -1px 0 #000",
  },
});

export default styles;
