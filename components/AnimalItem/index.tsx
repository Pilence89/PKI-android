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
import { storage } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import {useState, useContext} from 'react'
import GlobalContext from "../../Context/Context";

const AnimalItem = (props: Item) => {
  const { title, description, image, colorScheme = 1, position, dodatniOpis, id } = props;
  const tabBarHeight = useBottomTabBarHeight();
  const [IsRenderScreen, setIsRenderScreen] = useState<boolean>(false);
  const {setCurrentAnimal} = useContext(GlobalContext);
  const [imageUri, setImageUri] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  var newImageRef = ref(storage, "animalImages/"+image);
  getDownloadURL(newImageRef).then((url) =>{
    setImageUri(url);
    setIsRenderScreen(true);
  });
  // async function getPublicImageUrl() {
  //   const publicImageUrl = await getDownloadURL(newImageRef);
  //   return publicImageUrl;
  // }
  // const imageUri = getPublicImageUrl();
  // console.log(dodatniOpis, id);
  return (
    // <View
    //   style={[
    //     styles.animalContainer,
    //     // { height: Dimensions.get("screen").height - tabBarHeight },
    //     { height: Dimensions.get("screen").height },
    //   ]}
    // >
    <Pressable
      onPress={() => IsRenderScreen ? navigation.navigate("Animal", { ...props}): null}
      style={[
        styles.animalContainer,
        {
          height:
            title != "Јелен"
              ? Dimensions.get("screen").height 
              : Dimensions.get("screen").height - 55,
        },
        // { height: Dimensions.get("window").height },
      ]}
    >
      {IsRenderScreen && <ImageBackground source={{ uri: imageUri }} style={styles.image} />}
      {IsRenderScreen && <View
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
      </View>}
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
