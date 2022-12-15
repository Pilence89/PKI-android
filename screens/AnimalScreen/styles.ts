import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  animalContainer: {
    width: "100%",
  },
  titles: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  buttonsContainer: {
    position: "absolute",
    width: "100%",
  },
});

export default styles;
