import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  animalContainer: {
    width: "100%",
    flex: 1,
    marginTop: 80
  },
  titles: {
    // position: "absolute",
    // width: "100%",
    // alignItems: "center",
    // backgroundColor: "white",
    // height: "100%",
    // top: "50%"
  },
  title: {
    marginTop: "95%",
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center"
  },
  description: {
    fontSize: 16,
    alignSelf: "center"
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
  textContainer:{
    backgroundColor:"#ffa",
    marginTop: 30,
    width:"85%",
    alignSelf:"center",
    paddingHorizontal: 10,
    borderRadius: 5
  },
  text:{
    fontSize: 20,
    textAlign: "center"
  }
});

export default styles;
