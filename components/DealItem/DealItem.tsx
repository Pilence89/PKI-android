import { ImageBackground, Pressable, Text, View } from "react-native";
import { DealItem as Item } from "../../data/deals/dealsData";
import { Rating } from "react-native-ratings";
import { useState } from "react";
import styles from "./styles";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";
import { Timestamp } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Toast from "react-native-root-toast";

const DealItem = (props: Item) => {
  const { title, opis, image, colorScheme = 1, position, id, promoKod, kraj } = props;
  const vremeSad = Timestamp.now();
  console.log(vremeSad, Number(kraj.seconds));
  const [IsRenderScreen, setIsRenderScreen] = useState<boolean>(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [imageUri, setImageUri] = useState("");
  var newImageRef = ref(storage, "promoImages/" + image);
  getDownloadURL(newImageRef).then((url) => {
    setImageUri(url);
    setIsRenderScreen(true);
  });


  return (
    <Pressable style={styles.container} onPress={() => IsRenderScreen && vremeSad.seconds<kraj.seconds ? navigation.navigate("Улазнице", { ...props}): Toast.show('Промоција је истекла!', {
      duration: Toast.durations.SHORT,
    })}>
      {IsRenderScreen && <ImageBackground source={{ uri: imageUri }} style={[styles.image, vremeSad.seconds>kraj.seconds && styles.overImage]} />}
      {vremeSad.seconds>kraj.seconds && <><View style={styles.overImegBox}/>
      <View style={styles.overImegText}><Text style={styles.overPromotion}>ИСТЕКЛО</Text></View></>}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{opis}</Text>
    </Pressable>
  );
};

export default DealItem;
