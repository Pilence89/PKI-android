import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import Navigator from "./navigation/MainNavigation/MainNavigation";
import { useState, useEffect} from 'react'
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebase";
import ContextWrapper from "./Context/ContextWrapper";
import { RootSiblingParent } from 'react-native-root-siblings';


export default function App() {


  return (
    
    <ContextWrapper>
      <RootSiblingParent>
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Navigator />
    </View>
    </RootSiblingParent>
    </ContextWrapper>
    
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
