import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import {
  AntDesign,
  MaterialIcons,
  FontAwesome5,
  EvilIcons,
  FontAwesome,
} from "@expo/vector-icons";
import styles from "./styles";
import CustomIcons from "../Icons/Icon";

export interface IIntput {
  value?: string;
  editable?: boolean;
  placeholder?: string;
  title?: string;
  icon?: string;
}

const StyledInput = (props: IIntput) => {
  const { editable, value, icon, title, placeholder } = props;
  const [newMessage, setNewMessage] = useState(value != undefined  ? value : "");
  const [isEditable, setIsEditable] = useState<boolean>(
    editable != undefined ? editable : true
  );

  const onEditClick = () => {
    console.warn("Sending a new message: ", newMessage);

    setIsEditable((oldValue) => !oldValue);
  };

  const onSend = () => {
    console.warn("Sending a new message: ", newMessage);

    setNewMessage("");
  };
  return (
    <View style={styles.container}>
      {/* Icon */}
      {/* <AntDesign name="plus" size={20} color="royalblue" /> */}
      {/* Text Input */}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputContainer}>
        <CustomIcons type={icon ? icon : "cat"} />

        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          style={isEditable ? styles.input : styles.inputDesabled}
          placeholder="..."
          editable={isEditable}
        />

        {/* Icon */}
        {/* <MaterialIcons
        onPress={onSend}
        style={styles.send}
        name="send"
        size={16}
        color="white"
      /> */}
        {/* <AntDesign name="edit" size={24} color="black" /> */}
        {/* <FontAwesome5 name="expeditedssl" size={24} color="black" /> */}
        {editable != undefined &&
          (isEditable ? (
            <EvilIcons
              name="unlock"
              size={40}
              color="black"
              onPress={onEditClick}
              style={{ fontWeight: "700" }}
            />
          ) : (
            <EvilIcons
              name="lock"
              size={40}
              color="black"
              onPress={onEditClick}
              style={{ fontWeight: "700" }}
            />
          ))}
      </View>
    </View>
  );
};

export default StyledInput;
