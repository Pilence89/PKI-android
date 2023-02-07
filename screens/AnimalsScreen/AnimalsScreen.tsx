import { View, Text, FlatList, Dimensions } from "react-native";
import styles from "./styles";
import { AnimalItem as AI } from "../../data/zivotinje/animalsData";
import AnimalItem from "../../components/AnimalItem";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import Header from "../../components/Header";
import { animalsCol, assignTypes, db } from "../../firebase";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import NotImplementedScreen from "../NotImplementedScreen/NotImplementedScreen";
import {useEffect, useContext} from 'react'
import GlobalContext from "../../Context/Context";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

interface IProp {
  onScrollhandle: (e: any) => void;
}

const AnimalsList = (props: IProp) => {
  //   const { title, colorScheme } = props;
  const { animals, setAnimals } = useContext(GlobalContext);
  const { onScrollhandle } = props;
  //   const [offset, setOffset] = useState(0);
  const tabBarHeight = useBottomTabBarHeight();

  const animalsQuery = query(
    collection(db, "animals")
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(animalsQuery, (querySnapshot) => {
      const parsedAnimals = querySnapshot.docs.map((doc) => doc.data() as AI)
      setAnimals(parsedAnimals.sort((a,b)=> Number(a.id)-Number(b.id)));
    });
    return () => unsubscribe();
  }, []);

// console.log(animals[0].image);

  // const animalsRef = collection(db, "animals").withConverter(assignTypes<AI>());
  // const animalsQuery = query<AI>(animalsRef);
  // console.log(animalsQuery);
  // const [animalsDataBase] = useCollectionData<AI>(animalsQuery);
  // const animalsRef = await getDocs(animalsCol);
  // const [animalsDataBase] = useCollectionData<AnimalItem[]>(animalsRef);
  // console.log(animalsDataBase, "animals");
  // console.log(tabBarHeight);
  //   const onScrollhandle = (e: any) => {
  //     console.log(e.nativeEvent.contentOffset.y);
  //   };
  // console.log(Dimensions.get("screen").height);
  return (
    <View style={{ marginTop: 20 }}>
      {animals && animals?.length > 0 ? <FlatList
        data={animals}
        renderItem={({ item }) => <AnimalItem {...item} />}
        snapToAlignment={"start"}
        decelerationRate={"fast"}
        snapToInterval={Dimensions.get("window").height + 50}
        showsVerticalScrollIndicator={false}
        onScroll={onScrollhandle}
      /> : <LoadingScreen/>}
      {/* <Header horizontal={1} vertical={1} onPress={onScrollhandle}/> */}
    </View>
  );
};

export default AnimalsList;
