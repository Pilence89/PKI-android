import { View, Text, ImageBackground } from "react-native";
import { AnimalItem as Item } from "../../data/zivotinje/animalsData";
import StyledButton from "../StyledButton";
import styles from "./styles";

const AnimalItem = (props: Item) => {
  const { title, description, image, colorScheme = 1, position } = props;
  return (
    <View style={styles.animalContainer}>
      <ImageBackground source={image} style={styles.image} />
      <View
        style={[
          styles.titles,
          {
            top: position === "top" ? "5%" : "unset",
            bottom: position === "bottom" ? "20%" : "unset",
          },
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
      <View
        style={[
          styles.buttonsContainer,
          {
            top: position === "top" ? "15%" : "unset",
            bottom: position === "bottom" ? "10%" : "unset",
          },
        ]}
      >
        <StyledButton title="Више детаља" colorScheme={colorScheme} />
      </View>
    </View>
  );
};

export default AnimalItem;
