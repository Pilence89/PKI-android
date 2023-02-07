import { Button, Dimensions, ImageBackground, Text, TextInput, View } from "react-native";
import styles from "./styles";
import { useState, useContext} from 'react';
import Context from '../../Context/Context';
import { auth, signIn } from "../../firebase";
import { ErrorData, ErrorFactory } from "@firebase/util";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import GlobalContext from "../../Context/Context";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const SignInScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("signIn");
    const [loading, setLoading] = useState(false);
    const {setCurrUser} = useContext(GlobalContext);

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const {
        theme: { colors },
      } = useContext(Context);

      async function handlePress() {
        if(email!="" && password!=""){
          if (mode === "signIn") {
            signIn(email, password).then(e=> { setCurrUser(auth.currentUser) }).catch(function(error) {
             // TODO: Notify user about error
             var errorCode = error.code;
             var errorMessage = error.message;
             console.log(errorCode)
             console.log(errorMessage)
             if (errorCode === 'auth/wrong-password') {
                 Toast.show("Погрешна лозинка", {duration: Toast.durations.SHORT})
             }
             else if (errorCode === 'auth/user-not-found') {
               Toast.show("Корисник није пронађен", {duration: Toast.durations.SHORT})
           }else if(errorCode ==="auth/too-many-requests"){
            Toast.show("Превише неуспелих покушаја, ресетујте лозинку!", {duration: Toast.durations.SHORT})
           }
         });
        }

        }else{
          Toast.show("Унесите корисничко име и лозинку!", {duration: Toast.durations.SHORT})
        }
      }
  return (
    <View
      style={[
        styles.animalContainer,
        { height: Dimensions.get("screen").height },
      ]}
    >
      <ImageBackground
        source={require("../../assets/login/papiga.jpg")}
        style={styles.image}
      />
      {loading && <LoadingScreen/>}
      <View style={{ marginTop: 20 }}>
        <TextInput
          placeholder="Имејл"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#fff"
          style={{
            borderBottomColor: colors.primary,
            borderBottomWidth: 2,
            width: 200,
            color: "white",
            textAlign: "center"
          }}
        />
        <TextInput
          placeholder="Лозинка"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholderTextColor="#ffa"
          style={{
            borderBottomColor: colors.primary,
            borderBottomWidth: 2,
            width: 200,
            marginTop: 20,
            color: "white",
            textAlign: "center"
          }}
        />
        <View style={{ marginTop: 20 }}>
          <Button
            title={mode === "signUp" ? "Sign Up" : "Пријавите се"}
            disabled={!password || !email}
            color={colors.secondary}
            onPress={handlePress}
          />
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;
