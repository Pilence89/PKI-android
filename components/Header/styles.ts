import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10,
    width: "100%",
    zIndex: 100,
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    justifyContent: "flex-start",
    width: 40,
    height: 40,
  },
  title: {
    color: "#ffa",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 5,
  },
});

export default styles;
