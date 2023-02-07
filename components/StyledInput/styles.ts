import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "baseline",
    justifyContent: "center",
    padding: 5,
    paddingHorizontal: 60,
    marginVertical: 10,
  },
  containerCenterNumeric:{
    alignItems: "center"
  },
  iconContainer:{
    width: 30
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
  numericInputContainer: {
    display: "flex",
    flexDirection: "row",
  },
  inputNumeric: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,

    borderRadius: 10,
    borderColor: "#D35312",
    borderWidth: 1,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  numericInputButton: {
    flex: 1,
    width: 40,
    // marginHorizontal: 5,
    // paddingVertical: 1,
    backgroundColor: "transparent",
    borderColor: "#D35312",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  numericMinus:{
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10
  },
  text: {
    fontSize: 20,
    fontWeight: "800",
    textTransform: "uppercase",
    color: "black"
  },
});

export default styles;
