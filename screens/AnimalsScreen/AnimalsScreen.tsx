import { View, Text, FlatList, Dimensions } from "react-native";
import styles from "./styles";
import { animals } from "../../data/zivotinje/animalsData";
import AnimalItem from "../../components/AnimalItem";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import Header from "../../components/Header";

interface IProp {
  onScrollhandle: (e: any) => void;
}

const AnimalsList = (props: IProp) => {
  //   const { title, colorScheme } = props;
  const { onScrollhandle } = props;
  //   const [offset, setOffset] = useState(0);
  const tabBarHeight = useBottomTabBarHeight();
  // console.log(tabBarHeight);
  //   const onScrollhandle = (e: any) => {
  //     console.log(e.nativeEvent.contentOffset.y);
  //   };
  // console.log(Dimensions.get("screen").height);
  return (
    <View style={{ marginTop: 20 }}>
      <FlatList
        data={animals}
        renderItem={({ item }) => <AnimalItem {...item} />}
        snapToAlignment={"start"}
        decelerationRate={"fast"}
        snapToInterval={Dimensions.get("window").height + 50}
        showsVerticalScrollIndicator={false}
        onScroll={onScrollhandle}
      />
      {/* <Header horizontal={1} vertical={1} onPress={onScrollhandle}/> */}
    </View>
  );
};

export default AnimalsList;
