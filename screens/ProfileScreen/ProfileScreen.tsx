import {
  ImageBackground,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Modal,
  Alert,
  TextInput,
} from "react-native";
import StyledInput, { IIntput } from "../../components/StyledInput";
import styles from "./styles";
import { useState, useContext, useEffect } from "react";
import CustomIcons from "../../components/Icons/Icon";
import { EmailAuthProvider, reauthenticateWithCredential, signOut, updatePassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import GlobalContext from "../../Context/Context";
import { collection, doc, onSnapshot, query, setDoc, updateDoc } from "firebase/firestore";
import { ProfileItem } from "../../data/profile/profileItem";
import Toast from "react-native-root-toast";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LoadingScreen from "../LoadingScreen/LoadingScreen";


const ProfileScreen = () => {
  
  const [showModal, setShowModal] = useState(false);
  const [newLozinka, setNewLozinka] = useState("");
  const [oldLozinka, setOldLozinka] = useState("");
  const {profileInfo, setCurrUser} = useContext(GlobalContext);
  const profilDataBase = doc(db, "users", profileInfo!.id);
  const [loading, setLoading] = useState(false);

  // const onChangeHandle = (value: string, keyInBase: string) =>{

  // }

  async function onChangeHandle(value: string, keyInBase: string) {
    if(value == ""){
      Toast.show("Поље не сме бити празно!", {duration: Toast.durations.SHORT,})
      return;
    }
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
    const update = updateDoc(profilDataBase, {[keyInBase] : value});
    await Promise.all([update]);
  }
  const [imePrezime, setImePrezime] = useState(profileInfo!.imePrezime);
  const [telefon, setTelefon] = useState(profileInfo!.telefon);
  const [adresa, setAdresa] = useState(profileInfo!.adr);
  const lozinka = {
    editable: false,
    title: "Лозинка",
    placeholder: "Нова лозинка",
    icon: "key",
    value: "",
  };
  const profileInputs: IIntput[] = [
    {
      keyInBase: "imePrezime",
      editable: false,
      title: "Име и презиме",
      placeholder: "Како се зовете",
      icon: "user-secret",
      value: imePrezime,
      onChangeHandle: onChangeHandle,
      onChangeTextInput: setImePrezime
    },
    {
      keyInBase: "telefon",
      editable: false,
      title: "Телефон",
      placeholder: "Ваш телефон",
      icon: "phone",
      value: telefon,
      onChangeHandle: onChangeHandle,
      onChangeTextInput: setTelefon
    },
    {
      keyInBase: "adr",
      editable: false,
      title: "Адреса",
      placeholder: "Одакле сте ?",
      icon: "address",
      value: adresa,
      onChangeHandle: onChangeHandle,
      onChangeTextInput: setAdresa
    },
  ];

  
  
  // const animalsQuery = query(
  //   collection(db, "animals")
  // );

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(animalsQuery, (querySnapshot) => {
  //     const parsedAnimals = querySnapshot.docs.map((doc) => doc.data() as AI)
  //     setAnimals(parsedAnimals.sort((a,b)=> Number(a.id)-Number(b.id)));
  //   });
  //   return () => unsubscribe();
  // }, []);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [inputs] = useState(profileInputs);
  const reauthenticate = () => {
    var user = auth.currentUser;
    var email = user?.email ? user.email : "";
    var cred = EmailAuthProvider.credential(email, oldLozinka);
    return reauthenticateWithCredential(user!, cred);
  };

  const handlePasswordChange = () => {
    reauthenticate()
      .then(() => {
        var user = auth.currentUser;
        updatePassword(user!, newLozinka)
          .then(() => {
            Toast.show("Успешно сте ажурирали лозинку!", {duration: Toast.durations.SHORT,})
          })
          .catch((error) => {
            console.log(error);
            Toast.show("Дошло је до грешке. Молимо Вас покушајте касније.", {duration: Toast.durations.SHORT,})
          });
      })
      .catch((error) => {
        console.log(error);
        Toast.show("Унели сте погрешну постојећу лозинку!", {duration: Toast.durations.SHORT,})
      });
      setShowModal(!showModal)
  };

  function logOut() {
    
    return signOut(auth)
      .then((result) => {
        console.log(result);
        setCurrUser(null);
        setLoading(true);setTimeout(()=>{setLoading(false)}, 1500)
        
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={logOut} style={{position: "absolute", top:18, right: 15}}><AntDesign name="logout" size={24} color="black" /></Pressable>
      <ImageBackground
        source={require("../../assets/profil/cat2-yellow.png")}
        style={styles.image}
      />
      {loading && <LoadingScreen/>}
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
      <Pressable onPress={() => setShowModal(true)}>
        <Text style={styles.lozinka}>Промените лозинку</Text>
      </Pressable>

      {showModal && (
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setShowModal(!showModal);
            }}
          >
            <View style={styles.centeredView}>
              
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Промена лозинке!</Text>
                <Text style={styles.close} onPress={() => setShowModal(false)}>X</Text>
                <View style={styles.modalInput}>
                  <View style={styles.iconContainer}>
                    <CustomIcons type={lozinka.icon} />
                  </View>
                  <TextInput
                    value={oldLozinka}
                    onChangeText={setOldLozinka}
                    style={styles.input}
                    placeholder="Стара лозинка"
                  />
                </View>
                <View style={styles.modalInput}>
                  <View style={styles.iconContainer}>
                    <CustomIcons type={lozinka.icon} />
                  </View>
                  <TextInput
                    value={newLozinka}
                    onChangeText={setNewLozinka}
                    style={styles.input}
                    placeholder="Нова лозинка"
                  />
                </View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => handlePasswordChange()}
                >
                  <Text style={styles.textStyle}>Промени</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;
