import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    // position: "absolute",
    // alignItems: "flex-end",
    backgroundColor: "#393772",
    height: 50,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dotsContainer: {
    // flex: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  dots: {
    borderRadius: 50,
    backgroundColor: "#938bb6",
    height: 15,
    width: 15,
    marginHorizontal: 2,
  },
  activeDot: {
    backgroundColor: "#db4345",
  },
  arrowLeft: {
    marginLeft: 10,
  },
  arrowRight: {
    marginRight: 10,
  },
});

export default styles;
