import { View, Text, ImageBackground, Pressable } from "react-native";
import styles from "./styles";

interface IProps {
  title: string;
  //   toggler: React.FC<IDropdownTogglerProps>;
  //   position?: Placement;
  colorScheme?: number; // 1-dark , 2-light -> "rgb(211,83,83)"-#D35353 / "rgb(211,83,18)"-#D35312
}

const StyledButton = (props: IProps) => {
  const { title, colorScheme } = props;
  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.button,
          { backgroundColor: colorScheme === 1 ? "rgb(211,83,18)" : "#aaa" },
        ]}
        onPress={() => {
          console.warn("Hey there");
        }}
      >
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    </View>
  );
};

export default StyledButton;
