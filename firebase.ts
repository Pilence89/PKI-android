import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  collection,
  CollectionReference,
  DocumentData,
  getFirestore,
  initializeFirestore,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { AnimalItem } from "./data/zivotinje/animalsData";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const firebaseConfig = {
  apiKey: "AIzaSyC4EO9z6nSm_78vvuSLkCLmFztPDMRsDT0",
  authDomain: "pki-android-a3cb6.firebaseapp.com",
  projectId: "pki-android-a3cb6",
  storageBucket: "pki-android-a3cb6.appspot.com",
  messagingSenderId: "896786784738",
  appId: "1:896786784738:web:49a6cd35dd6a9826f819bb",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
// export const db = getFirestore(app);

//u slucaju da ne radi ovaj gore
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
// export const firestore = getFirestore();
export function signIn(email: string, password: string) {
  // console.log(email, password);
  return signInWithEmailAndPassword(auth, email, password);
}

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};
// export const usersCol = createCollection<User>('users')
export const animalsCol = createCollection<AnimalItem>("animals");

export function assignTypes<T extends object>() {
  return {
    toFirestore(doc: T): DocumentData {
      return doc;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot): T {
      // console.log(snapshot.data());
      return snapshot.data()! as T;
    },
  };
}
