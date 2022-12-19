import { View, Text, ImageBackground, Pressable, Image } from "react-native";
import styles from "./styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";

const Header = (props: { horizontal: number, vertical: number, onPress: (e: any, iCall: boolean)=> void}) => { // 0 -> left/top ; 1 -> right/bottom ; 2 - center
  const {horizontal, vertical, onPress} = props;
  return (
    <View style={[styles.containerOuter, horizontal ===1 ? { right: 0 } : horizontal ===0  && {left: 0},  vertical ===1 ? { bottom: 0 } : vertical ===0 && {top: 0}]}>
      <Pressable style={styles.container}
      onPress={() =>onPress(null, true)}>
        <Image
          style={styles.logo}
          source={require("../../assets/logo/pandaBlack1.png")}
        />
        <Text style={styles.title}>ПАНДИЦА ЗОО</Text>
      </Pressable>
    </View>
  );
};

export default Header;
