import { View, Text, ImageBackground, Dimensions } from "react-native";
import {
  AnimalItem,
  AnimalItem as Item,
} from "../../data/zivotinje/animalsData";
import StyledButton from "../../components/StyledButton";
import styles from "./styles";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

const AnimalScreen = () => {
  const route = useRoute();
  const { title, description, image, position, colorScheme } =
    route.params as AnimalItem;
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: title });
  }, [title]);
  //   const { title, description, image, colorScheme = 1, position } = props;
  return (
    <View
      style={[
        styles.animalContainer,
        { height: Dimensions.get("screen").height },
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
          style={[styles.title, { color: colorScheme === 1 ? "#000" : "#fff" }]}
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
    </View>
  );
};

export default AnimalScreen;
