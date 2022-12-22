import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Button, View } from "react-native";
import styles from "./styles";
import { FontAwesome } from "@expo/vector-icons";

export interface StepperProps {
  steps: number;
  activeStep: number;
  arrows: boolean;
}

const CustomStepper = (props: StepperProps) => {
  //   const tabBarHeight = useBottomTabBarHeight();
  const { activeStep, arrows, steps } = props;
  const handleRight = () => {};

  const handleLeft = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.arrowLeft}>
        {arrows ? (
          <FontAwesome name="hand-o-left" size={24} color="#e1c1c2" />
        ) : (
          <Button title="Назад" color="#db4345" />
        )}
      </View>
      <View style={styles.dotsContainer}>
        {[...Array(steps)].map((elementInArray, index) => (
          <View
            style={[styles.dots, index + 1 === activeStep && styles.activeDot]}
          />
        ))}
        {/* <View style={styles.dots} />
        <View style={[styles.dots, styles.activeDot]} />
        <View style={styles.dots} /> */}
      </View>

      <View style={styles.arrowRight}>
        {arrows ? (
          <FontAwesome name="hand-o-right" size={24} color="#e1c1c2" />
        ) : (
          <Button title="Даље" color="#db4345" />
        )}
      </View>
    </View>
  );
};

export default CustomStepper;
