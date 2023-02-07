import { ImageBackground, Text, View } from "react-native";
import { EventItem as Item } from "../../data/eventsData/eventsData";
// @ts-ignore
// import Heart from "react-animated-heart";
import styles from "./styles";
import { useState, useContext, useEffect } from "react";
import ExplodingHeart from "../CustomHeart/CustomHeart";
import { AntDesign } from "@expo/vector-icons";
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "../../firebase";
import { EventItem as EI } from "../../data/eventsData/eventsData";
import { addDoc, collection, CollectionReference, doc, DocumentData, DocumentReference, setDoc, updateDoc } from "firebase/firestore";
import GlobalContext from "../../Context/Context";
import { ProfileLikes } from '../../data/profile/profileItem';

const EventItem = (props: EI) => {
  const { title, opis, image, likes, id } = props;
  const [isClick, setClick] = useState(false);
  const [IsRenderScreen, setIsRenderScreen] = useState<boolean>(false);
  const { profileInfo, profileLikes } = useContext(GlobalContext);
  const [liked, setLiked] = useState(false);
  

  const [imageUri, setImageUri] = useState("");
  var newImageRef = ref(storage, "eventImages/" + image);
  getDownloadURL(newImageRef).then((url) => {
    setImageUri(url);
    setIsRenderScreen(true);
  });
  // const userLikes = collection(db, "usersLikes");
  
  const userLikes = doc(db, "usersLikes", profileInfo!.username.toString());
  const eventRef = doc(db, "dogadjaji", id.toString());

  useEffect(()=>{
    // console.log(profileLikes?.dogadjajID)
    if(profileLikes)
    for(let i=0; i< profileLikes!.dogadjajID.length;i++){
    // console.log(profileLikes.dogadjajID[i], id)
        if(profileLikes.dogadjajID[i]==id){
            setLiked(true);
            // console.log(id, "LIKOVANO");
        }
    }
  },[profileLikes, id])
  //TODO staviti da moze i da odlajkuje
  async function onSend(id: string, isLike: boolean) {
    let currArray: ProfileLikes | null = profileLikes;
     let novi : ProfileLikes = {dogadjajID: []};
    let nadjen = false;
    // console.log(currArray);
    if(currArray == null){
      currArray = novi;
      // console.log(currArray);
    }
    // console.log(currArray);
    var nadjenElem = currArray.dogadjajID.find(x=>x==id.toString());
    if(nadjenElem!= undefined){
      nadjen = true;
    }
    // for(let i=0 ; currArray.dogadjajID.length; i++){
    //   if(currArray.dogadjajID[i]==id.toString()){
    //         nadjen= true;
    //       }
    // }
    // currArray?.dogadjajID.forEach(like => {
    //   if(like==id){
    //     nadjen= true;
    //   }
    // })
    let likesNovi = likes ? likes : 0;
    if(isLike){
      likesNovi = likesNovi+1;
      if(!nadjen){
        currArray.dogadjajID.push(id.toString());
      }
    }
    else{
      likesNovi = likesNovi -1;
      if(likesNovi< 0)
      likesNovi = 0;
      if(nadjen){
        currArray.dogadjajID = currArray.dogadjajID.filter(x=>x!=id.toString());
      }
    } 
    // currArray?.dogadjajID.push(id);
    const writes = currArray?.dogadjajID ? updateDoc(userLikes, { dogadjajID: currArray.dogadjajID }) : setDoc(userLikes, { dogadjajID: currArray.dogadjajID });

    const update = updateDoc(eventRef, { likes: likesNovi });
    await Promise.all([writes,update]);
  }
  return (
    <View style={styles.container}>
      {IsRenderScreen && (
        <>
          <View style={styles.like}>
            <ExplodingHeart status={liked} onSend={onSend} id={id}/>
            {/* <Heart isClick={isClick} onClick={() => setClick(!isClick)} /> */}
          </View>
          <ImageBackground source={{ uri: imageUri }} style={styles.image} />
          <View style={styles.likes}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.heart}>
              <Text style={{ marginEnd: 5 }}>{likes}</Text>
              {likes && likes > 0 ? (
                <AntDesign name="heart" size={24} color="red" />
              ) : (
                <AntDesign name="hearto" size={24} color="black" />
              )}
            </View>
          </View>

          <Text style={styles.description}>{opis}</Text>
        </>
      )}
    </View>
  );
};

export default EventItem;
