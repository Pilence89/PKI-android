import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { collection, doc, Timestamp, updateDoc } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import GlobalContext from "../../Context/Context";
import { db } from "../../firebase";
import styles from "./styles";

const NotifScreen = () => {
  const { karte } = useContext(GlobalContext);
  const tabBarHeight = useBottomTabBarHeight();

  useEffect(()=>{
    console.log("karte");
    console.log(karte);
  },[karte])


  async function onChangeHandle(keyInBase: string) {
    // let currUserInfo: ProfileItem = profileInfo!;
    // console.log(currUserInfo);
    // console.log(value,keyInBase, " MAPIRANJE");
    // currArray?.dogadjajID.push(id);
    // if(keyInBase=="adr"){
    //   currUserInfo.adr = value;
    // }else if(keyInBase == "imePrezime"){
    //   currUserInfo.imePrezime = value;
    // }else if(keyInBase == "telefon"){
    //   currUserInfo.telefon = value;
    // }
    const profilDataBase = doc(db, "karte", keyInBase);
    const update = updateDoc(profilDataBase, {vidjeno : true});
    await Promise.all([update]);
  }

  const getDate=(baseDate: Timestamp ) =>{
    let dateFormat = baseDate.toDate();
    var formatted = ('0' + dateFormat.getDate()).slice(-2) 
    + '-' + ('0' + (dateFormat.getMonth()+1)).slice(-2)
    + '-' + (dateFormat.getFullYear());
    return formatted;
  }

  return (
      <View style={{ bottom: tabBarHeight, marginTop: 50 }}>
        {karte.length > 0 ? <FlatList
          data={karte}
          renderItem={({ item, index }) => (
            <Pressable onPress={()=> item.vidjeno ? null : onChangeHandle(item.id)} style={[styles.container,{ borderTopWidth: 1, borderBottomWidth: 1, backgroundColor: item.vidjeno ?  "#ccc":"#ffa" }]}>
              <Text style={{marginTop: index!=0 ? 10 : 0 }}>Датум одобрења:   {getDate(item.datumTrazenja)}</Text>
              <View style={{marginTop: 10}}>
                <Text>Одлучили Сте се да нас посетите {item.datum}!</Text>
              </View>
              <View>
                <Text>
                  Купили Сте {item.Vkarte} {karteRec(item.Vkarte)} за одрасле,{" "}
                  {item.Skarte} {karteRec(item.Skarte)} за децу и {item.Mkarte}{" "}
                  {karteRec(item.Mkarte)} за бебце!
                </Text>
              </View>
              <View>
                <Text>
                  {item.promokod
                    ? "Искоришћени промо код: " + item.promokod
                    : "На жалост нисте искористили промо код :("}
                </Text>
              </View>
              {item.promoKodOpis && <View><Text>{item.promoKodOpis }</Text></View>}
            {item.promoCena && item.promoCena != 0 && <View><Text>Укупно за плаћање са промо кодом: {item.promoCena} динара</Text></View>}
              <View style={{alignItems: "flex-end", marginTop: 2}}><Text style={{textAlign: "right"}}>За плаћање: {item.cena} динара</Text></View>
            </Pressable>
          )}
          snapToAlignment={"start"}
          decelerationRate={"fast"}
        /> : <Text >Немате обавештења</Text>}
      </View>
  );
};

function karteRec(broj:number) {
    if(broj>=0){
    switch(broj){
        case 0: return "карата";
        case 1: return "карту";
        case 2: return "карте";
        case 3: return "карте";
        case 4: return "карте";
        default: {
            let pomBroj = broj%10;
            if(broj>20){
                if(pomBroj==1)
                return "карту"
                else if(pomBroj==2 || pomBroj==3 || pomBroj==4)
                return "карте"
            }

            return "карти";
        }
    }
    }
} 

export default NotifScreen;
