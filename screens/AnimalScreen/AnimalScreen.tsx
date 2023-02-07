import { View, Text, ImageBackground, Dimensions, ScrollView,StyleSheet} from "react-native";
import {
  AnimalItem,
  AnimalItem as Item,
} from "../../data/zivotinje/animalsData";
import StyledButton from "../../components/StyledButton";
import styles from "./styles";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Rating } from "react-native-ratings";
import {useState, useContext} from 'react';
import CustomRating from "../../components/CustomRating/CustomRating";
import StyledInput from "../../components/StyledInput";
import Comments from "../../components/Comments/Comments";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../../firebase";
import GlobalContext from "../../Context/Context";
import { collection, doc, onSnapshot, query, setDoc } from "firebase/firestore";
import Toast from 'react-native-root-toast';

interface IComments {
  id?: string,
  ime: string,
  komentar: string,
  ocena: number
}

const AnimalScreen = () => {
  const route = useRoute();
  const { title, description, image, position, colorScheme, dodatniOpis, id, idBase } = 
    route.params as AnimalItem;
    const {profileInfo} = useContext(GlobalContext);
    // console.log(idBase);
  const navigation = useNavigation();
    const [imageUri, setImageUri] = useState('');
    const [IsRenderScreen, setIsRenderScreen] = useState<boolean>(false);
    const [starRating, setStarRating] = useState<number | null>(null);
    const [newMessage, setNewMessage] = useState("");
    const [allComms, setAllComms] = useState<IComments[] | []>([]);
  var newImageRef = ref(storage, "animalImages/"+image);
  getDownloadURL(newImageRef).then((url) =>{
    setImageUri(url);
    setIsRenderScreen(true);
  });
  useEffect(() => {
    navigation.setOptions({ title: title });
  }, [title]);

  const [starCount, setStarCount] = useState(0);

  const onStarRatingPress = (rating:number) => {
    setStarCount(rating);
  };
  
  const commsQuery = query(
    collection(db, "animals", idBase!.toString(), "komentari")
  );

  useEffect(() => {
    // console.log(commsQuery);
    const unsubscribe = onSnapshot(commsQuery, (querySnapshot) => {
      const parsedComms = querySnapshot.docs.map((doc) => doc.data() as IComments)
      console.log(parsedComms);
      setAllComms(parsedComms);
    });
    return () => unsubscribe();
  }, []);
  async function handleCommSubmit () {
    console.log('TEST');
    if(newMessage == "" || newMessage == null || starRating== null){
      // console.warn("Нисте дали коментар или оцену!");
      let toast = Toast.show('Нисте дали коментар или оцену!', {
        duration: Toast.durations.SHORT,
      });
      return;
    }
    var commsSorted = allComms.sort((a,b)=> Number(a.id)-Number(b.id));
    var maxIndex = allComms && allComms.length>0 ? allComms[allComms.length-1].id?.toString() : "0";
    var maxIndexNumber = Number(maxIndex) +1; 
    const allComments = doc(db, "animals", idBase!.toString(), "komentari/"+ maxIndexNumber );
    console.log(maxIndex);
    // console.log(allComments);
    const writes = setDoc(allComments, { id: maxIndex ? maxIndexNumber : 1, ime: profileInfo?.imePrezime, komentar: newMessage, ocena: starRating });

    // const update = updateDoc(eventRef, { likes: likesNovi });
    // await Promise.all([writes]);
  }
  //   const { title, description, image, colorScheme = 1, position } = props;
  return (
    <View
      style={[
        styles.animalContainer,
        { height: Dimensions.get("screen").height },
      ]}
    >
      {IsRenderScreen && <ImageBackground source={{uri: imageUri}} style={styles.image} />}
      <ScrollView
        style={[
          styles.titles
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
        <View style={styles.textContainer}>
        <Text style={styles.text}>{dodatniOpis}</Text>
        {/* <Rating
        type="custom"
        ratingCount={5}
        imageSize={40}
        startingValue={0}
        jumpValue={0.1}
        fractions={1}
        onFinishRating={onStarRatingPress}
        style={{backgroundColor:"#ffa", paddingHorizontal: 10}}
        
      /> */}
      <View
  style={{
    paddingVertical: 4,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }}
/>
      <Comments newMessage={newMessage} setNewMessage={setNewMessage} staticCompo={false}/>
      <CustomRating starRating={starRating} setStarRating={setStarRating} staticComp={false}/>
      <StyledButton title="Пошаљи" onPress={handleCommSubmit}/>
      </View>
      <View style={[styles.textContainer, {marginBottom: 10}]}>
        <Text style={{fontSize: 16, fontWeight: "700", textAlign: "center", borderBottomWidth: 1, borderStyle: "dotted"}}>Коментари</Text>
      {allComms.map((com, index)=><Comments staticCompo={true} ime={com.ime} key={com.id} newMessage={com.komentar} ocena ={com.ocena} line={index==allComms.length ? false : true}/>)}
      </View>
      </ScrollView>

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
