import { View, Text, ImageBackground, Pressable, Image } from "react-native";
import styles from "./styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";

const Header = (props: { left: boolean }) => {
  console.log(props.left);
  return (
    <View style={[styles.containerOuter, props.left && { right: 0 }]}>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../../assets/logo/pandaBlack1.png")}
        />
        <Text style={styles.title}>ПАНДИЦА ЗОО</Text>
      </View>
    </View>
  );
};

export default Header;
