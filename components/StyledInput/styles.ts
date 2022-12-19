import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "baseline",
    padding: 5,
    paddingHorizontal: 60,
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
  },
  title: {
    marginBottom: 4,
    color: "#D35312",
    // color: "white"
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,

    borderRadius: 50,
    borderColor: "#D35312",
    borderWidth: 1,
  },
  inputDesabled: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    color: "black",
    borderRadius: 50,
    borderColor: "lightgray",
    borderWidth: 1,
  },
  send: {
    backgroundColor: "royalblue",
    padding: 7,
    borderRadius: 15,
    overflow: "hidden",
  },
});

export default styles;
