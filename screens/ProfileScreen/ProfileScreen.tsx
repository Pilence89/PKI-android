import {
  ImageBackground,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import StyledInput, { IIntput } from "../../components/StyledInput";
import styles from "./styles";
import { useState } from "react";

const profileInputs: IIntput[] = [
  {
    editable: false,
    title: "Име и презиме",
    placeholder: "Како се зовете",
    icon: "user-secret",
    value: "Леми1 Пандица",
  },
  {
    editable: false,
    title: "Телефон",
    placeholder: "Ваш телефон",
    icon: "phone",
    value: "0646665555",
  },
  {
    editable: false,
    title: "Адреса",
    placeholder: "Одакле сте ?",
    icon: "address",
    value: "Негде лепо",
  },
];

const ProfileScreen = () => {
  const [inputs] = useState(profileInputs);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/profil/cat2.jpg")}
        style={styles.image}
      />
      <View style={styles.titles}>
        <Text style={[styles.title, { color: "black" }]}>{"Ваши подаци"}</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // style={styles.bg}
      >
        <View style={styles.inputsContainer}>
          {profileInputs.map((input) => (
            <StyledInput {...input} key={Math.random()} />
          ))}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ProfileScreen;
