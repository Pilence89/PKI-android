import { StyleSheet, Text, TextInput, View } from "react-native";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import {useState} from 'react'
import StyledButton from "../StyledButton";
import CustomRating from "../CustomRating/CustomRating";

export interface IComments {
  newMessage?: string,
  setNewMessage?: React.Dispatch<React.SetStateAction<string>>,
  staticCompo: boolean,
  ime?: string,
  ocena?:number,
  line?:boolean
}

const Comments = (props:IComments) => {
    const {newMessage, setNewMessage, staticCompo, ime, ocena, line} = props;
    // const [newMessage, setNewMessage] = useState(value != undefined ? value : "");
  return (
     !staticCompo ? (<View>
       <Text style={styles.title}>Оставите коментар</Text>
      <TextInput
        value={newMessage}
        onChangeText={setNewMessage}
        style={styles.input}
        placeholder="..."
        multiline={true}
        numberOfLines={4}
      /> 
    </View>) :(
      <View style={{marginTop: 1}}>
        <View style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
        <Text style={styles.title}>{ime}</Text>
        <View><CustomRating starRating={ocena!} staticComp={true}/></View>
        </View>
        <Text style={styles.com}>{newMessage}</Text>
        { line && <View
  style={{
    paddingVertical: 4,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }}
/>}
      </View>
    )
  );
};

export default Comments;
