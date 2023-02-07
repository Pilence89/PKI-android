import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from "./styles";

{/* <MaterialCommunityIcons name="emoticon-cry-outline" size={24} color="black" /> */}
{/* <MaterialCommunityIcons name="emoticon-cry-outline" size={24} color="black" /> */}
interface IProps {
  starRating: number | null,
  setStarRating? : React.Dispatch<React.SetStateAction<number | null>>,
  staticComp: boolean
}
const CustomRating = (props:IProps) => {
  const starRatingOptions = [1, 2, 3, 4, 5];
  const {starRating, setStarRating, staticComp} = props;

  // const [starRating, setStarRating] = useState<number | null>(null);

  const animatedButtonScale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.5,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }],
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* <Text style={styles.heading}>
          {starRating ? `${starRating}*` : "Tap to rate"}
        </Text> */}
        <View style={styles.stars}>
          {starRatingOptions.map((option) => (
            <TouchableWithoutFeedback
              onPressIn={() => staticComp ? null : handlePressIn()}
              onPressOut={() => staticComp ? null :  handlePressOut()}
              onPress={() => staticComp ? null : setStarRating!(option)}
              key={option}
            >
              <Animated.View style={animatedScaleStyle}>
                <MaterialCommunityIcons
                  name={
                    starRating && starRating >= option ? "emoticon-cool-outline" : "emoticon-cry-outline"
                  }
                  size={32}
                  style={
                    starRating && starRating >= option
                      ? styles.starSelected
                      : styles.starUnselected
                  }
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CustomRating;
