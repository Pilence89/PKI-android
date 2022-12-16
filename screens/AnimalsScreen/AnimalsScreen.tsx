import { View, Text, FlatList, Dimensions } from "react-native";
import styles from "./styles";
import { animals } from "../../data/zivotinje/animalsData";
import AnimalItem from "../../components/AnimalItem";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useState } from "react";

interface IProp {
  onScrollhandle: (e: any) => void;
}

const AnimalsList = (props: IProp) => {
  //   const { title, colorScheme } = props;
  const { onScrollhandle } = props;
  //   const [offset, setOffset] = useState(0);
  const tabBarHeight = useBottomTabBarHeight();
  //   const onScrollhandle = (e: any) => {
  //     console.log(e.nativeEvent.contentOffset.y);
  //   };

  return (
    <View style={{ marginTop: 20 }}>
      <FlatList
        data={animals}
        renderItem={({ item }) => <AnimalItem {...item} />}
        snapToAlignment={"start"}
        decelerationRate={"fast"}
        snapToInterval={Dimensions.get("screen").height}
        showsVerticalScrollIndicator={false}
        onScroll={onScrollhandle}
      />
    </View>
  );
};

export default AnimalsList;
