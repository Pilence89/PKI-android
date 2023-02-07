import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Button, View } from "react-native";
import styles from "./styles";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

export interface StepperProps {
  steps: number;
  activeStep: number;
  arrows?: boolean;
  handleNext: ()=> void;
  handleBack: ()=> void;
  canGoNext: boolean[];
}

const CustomStepper = (props: StepperProps) => {
  //   const tabBarHeight = useBottomTabBarHeight();
  const { activeStep, arrows, steps, handleNext, handleBack, canGoNext } = props;

// console.log(canGoNext, canGoNext[activeStep]);
  // const handleStepChange = (step: number) => {
  //   setCurrentStep(step);
  // };

  return (
    <View style={styles.container}>
       <View style={styles.arrowLeft} >
        {arrows ? (
          <FontAwesome name="hand-o-left" size={24} color={activeStep -1 > 0 ? "#e1c1c2" : "#393772"} onPress={handleBack}/>
        ) : (
          <Button title="Назад" color={activeStep -1 > 0 ? "#db4345" : "#393772"} onPress={handleBack} />
        )}
      </View>
      <View style={styles.dotsContainer}>
        {[...Array(steps)].map((elementInArray, index) => (
          <View
            style={[styles.dots, index + 1 === activeStep && styles.activeDot]} key={index}
          />
        ))}
        {/* <View style={styles.dots} />
        <View style={[styles.dots, styles.activeDot]} />
        <View style={styles.dots} /> */}
      </View>

       <View style={styles.arrowRight}>
        {arrows ? (
          <FontAwesome name="hand-o-right" size={24} color={activeStep< steps ? "#e1c1c2": "#393772"} onPress={handleNext} />
        ) : (
          <Button title="Даље" color={activeStep< steps ? "#db4345": "#393772"} onPress={handleNext} disabled={canGoNext[activeStep-1]}/>
        )}
      </View>
    </View>
  );
};

export default CustomStepper;
