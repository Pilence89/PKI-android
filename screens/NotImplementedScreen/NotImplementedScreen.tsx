import { View, Text, Image, StyleSheet } from "react-native";
import styles from "./styles";

const NotImplementedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Not Implemented!</Text>
      <Image
        source={{
          uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/capybara+copy.png",
        }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

export default NotImplementedScreen;
