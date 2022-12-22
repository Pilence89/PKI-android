import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Button, View } from "react-native";
import styles from "./styles";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

export interface StepperProps {
  steps: number;
  activeStep: number;
  arrows: boolean;
}

const CustomStepper = (props: StepperProps) => {
  //   const tabBarHeight = useBottomTabBarHeight();
  const { activeStep, arrows, steps } = props;
  const [currentStep, setCurrentStep] = useState(activeStep);
  const handleNext = () => {
    console.log("NEXT")
    setCurrentStep((prevActiveStep) => prevActiveStep +1 > steps ? prevActiveStep : prevActiveStep + 1);
  };
  const maxSteps = 4;
  const handleBack = () => {
    console.log("BACK")
    setCurrentStep((prevActiveStep) => prevActiveStep - 1 > 0 ? prevActiveStep-1 : prevActiveStep);
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <View style={styles.container}>
       <View style={styles.arrowLeft} >
        {arrows ? (
          <FontAwesome name="hand-o-left" size={24} color={currentStep -1 > 0 ? "#e1c1c2" : "#393772"} onPress={handleBack}/>
        ) : (
          <Button title="Назад" color={currentStep -1 > 0 ? "#db4345" : "#393772"} onPress={handleBack}/>
        )}
      </View>
      <View style={styles.dotsContainer}>
        {[...Array(steps)].map((elementInArray, index) => (
          <View
            style={[styles.dots, index + 1 === currentStep && styles.activeDot]} key={index}
          />
        ))}
        {/* <View style={styles.dots} />
        <View style={[styles.dots, styles.activeDot]} />
        <View style={styles.dots} /> */}
      </View>

       <View style={styles.arrowRight}>
        {arrows ? (
          <FontAwesome name="hand-o-right" size={24} color={currentStep< steps ? "#e1c1c2": "#393772"} onPress={handleNext} />
        ) : (
          <Button title="Даље" color={currentStep< steps ? "#db4345": "#393772"} onPress={handleNext}/>
        )}
      </View>
    </View>
  );
};

export default CustomStepper;
