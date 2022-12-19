import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Pressable,
} from "react-native";
import { AnimalItem as Item } from "../../data/zivotinje/animalsData";
import StyledButton from "../StyledButton";
import styles from "./styles";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const AnimalItem = (props: Item) => {
  const { title, description, image, colorScheme = 1, position } = props;
  const tabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    // <View
    //   style={[
    //     styles.animalContainer,
    //     // { height: Dimensions.get("screen").height - tabBarHeight },
    //     { height: Dimensions.get("screen").height },
    //   ]}
    // >
      <Pressable
        onPress={() => navigation.navigate("Animal", { ...props })}
        style={[
          styles.animalContainer,
          { height: title != "Јелен" ? Dimensions.get("screen").height : Dimensions.get("screen").height - 34 },
          // { height: Dimensions.get("window").height },
        ]}
      >
        <ImageBackground source={image} style={styles.image} />
        <View
          style={[
            styles.titles,
            position === "top" && { top: "5%" },
            position === "bottom" && { bottom: "20%" },
          ]}
        >
          <Text
            style={[
              styles.title,
              { color: colorScheme === 1 ? "#000" : "#fff" },
            ]}
          >
            {title}
          </Text>
          <Text
            style={[
              styles.description,
              { color: colorScheme === 1 ? "#000" : "#ffa" },
            ]}
          >
            {description}
          </Text>
        </View>
        {/* <View
        style={[
          styles.buttonsContainer,
          position === "top" && { top: "15%" },
          position === "bottom" && { bottom: "10%" },
        ]}
      >
        <StyledButton title="Више детаља" colorScheme={colorScheme} />
      </View> */}
      </Pressable>
    // </View>
  );
};

export default AnimalItem;
