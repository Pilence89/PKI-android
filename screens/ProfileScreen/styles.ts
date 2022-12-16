import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    // justifyContent: "space-evenly",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
    top: 80,
  },
  inputsContainer: {
    marginTop: "16%",
  },
  titles: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "serif",
  },
  //   bg: {
  //     flex: 1,
  //   },
});

export default styles;
