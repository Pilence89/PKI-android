import { View, Text, ImageBackground, Pressable, Image } from "react-native";
import styles from "./styles";

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/logo/pandaBlack1.png")}
      />
      <Text style={styles.title}>ПАНДИЦА ЗОО</Text>
    </View>
  );
};

export default Header;
