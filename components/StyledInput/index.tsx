import { useState, SetStateAction, useEffect } from "react";
import {
  Button,
  NativeSyntheticEvent,
  Pressable,
  StyleProp,
  Text,
  TextInput,
  TextInputFocusEventData,
  View,
  ViewProps,
} from "react-native";
import {
  AntDesign,
  MaterialIcons,
  FontAwesome5,
  EvilIcons,
  FontAwesome,
} from "@expo/vector-icons";
import styles from "./styles";
import CustomIcons from "../Icons/Icon";
import StyledButton from "../StyledButton/index";

export interface IIntput {
  value?: string;
  editable?: boolean;
  placeholder?: string;
  title?: string;
  icon?: string;
  numeric?: boolean;
  subText?: string;
  keyInBase?: string;
  onChange?: React.Dispatch<React.SetStateAction<number>>;
  onChangeHandle?: (value: string, key: string) => Promise<void>;
  onChangeTextInput?: React.Dispatch<React.SetStateAction<string>>;
  onChangeTextInputPromo?: React.Dispatch<React.SetStateAction<string>>;
}

const StyledInput = (props: IIntput) => {
  const {
    editable,
    value,
    icon,
    title,
    placeholder,
    numeric = false,
    subText,
    onChange,
    keyInBase,
    onChangeHandle,
    onChangeTextInput,
    onChangeTextInputPromo
  } = props;
  const [newMessage, setNewMessage] = useState(value != undefined ? value : "");
  const [text, setText] = useState(value != undefined ? value : "0");
  const [isEditable, setIsEditable] = useState<boolean>(
    editable != undefined ? editable : true
  );
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onEditClick = () => {
    // console.warn("Sending a new message: ", newMessage);
    if (isEditable) {
      if (onChangeHandle) onChangeHandle(newMessage, keyInBase!);
    }
    setIsEditable((oldValue) => !oldValue);
  };

  const onSend = () => {
    console.warn("Sending a new message: ", newMessage);

    setNewMessage("");
  };

  const onChangeText = (
    text: string,
    iCall: boolean = false,
    plus: boolean = false,
    focus?: boolean
  ) => {
    if (+text || +text == 0) {
      // console.log(+text + 1 + "", isFocused);
      if (iCall) {
        if (plus)
          setText(() => {
            onChange ? onChange(+text + 1) : null;
            return +text + 1 + "";
          });
        else if (+text > 0)
          setText(() => {
            onChange ? onChange(+text - 1) : null;
            return +text - 1 + "";
          });
      } else
        setText(() => {
          onChange && (!isFocused || (focus != undefined && focus))
            ? onChange(+text)
            : null;
          return text;
        });
    } else if (text == "") {
      setText(() => {
        onChange ? onChange(0) : null;
        return "0";
      });
    }
  };

  useEffect(()=>{
    if(onChangeTextInputPromo){
      onChangeTextInputPromo(newMessage);
    }
  },[newMessage])
  // const customChangeText =(valuee: string)=>{
  //   console.log("MENJAM");
  //   setNewMessage(valuee);
  //   if(onChangeTextInput){
  //     onChangeTextInput(valuee);
  //   }
  //   console.log(valuee);
  // }

  const Focushandler = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    console.log("FOCUS!");
    // console.log(e);
  };

  return (
    <View style={[styles.container, numeric && styles.containerCenterNumeric]}>
      {/* Icon */}
      {/* <AntDesign name="plus" size={20} color="royalblue" /> */}
      {/* Text Input */}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <CustomIcons type={icon ? icon : "cat"} />
        </View>
        {!numeric && (
          <TextInput
            value={newMessage}
            onChangeText={(e)=>{setNewMessage(e)}}
            style={isEditable ? styles.input : styles.inputDesabled}
            placeholder="..."
            editable={isEditable}
          />
        )}

        {numeric && (
          <View style={styles.numericInputContainer}>
            <TextInput
              keyboardType="numeric"
              value={text}
              style={isEditable ? [styles.inputNumeric] : [styles.inputNumeric]}
              onChangeText={onChangeText}
              onFocus={() => setIsFocused(true)}
              onBlur={() => {
                setIsFocused(false);
                onChangeText(text, false, false, true);
              }}
            />
            <Pressable
              style={styles.numericInputButton}
              onPress={() => onChangeText(text, true, true)}
            >
              <Text style={styles.text}>{"+"}</Text>
            </Pressable>

            <Pressable
              style={[styles.numericInputButton, styles.numericMinus]}
              onPress={() => onChangeText(text, true, false)}
            >
              <Text style={styles.text}>{"-"}</Text>
            </Pressable>
          </View>
        )}

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
