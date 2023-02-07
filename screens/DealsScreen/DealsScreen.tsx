import { FlatList, Text, View } from "react-native";
import DealItem from "../../components/DealItem/DealItem";
// import { deals } from "../../data/deals/dealsData";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useContext, useEffect } from "react";
import GlobalContext from "../../Context/Context";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";
import { DealItem as DI } from "../../data/deals/dealsData";

const DealsScreen = () => {
    const tabBarHeight = useBottomTabBarHeight();
    const { deals } = useContext(GlobalContext);
    //   const [offset, setOffset] = useState(0);
  return (
    <View style={{bottom:tabBarHeight }}>
      <FlatList
        data={deals}
        renderItem={({ item }) => <DealItem {...item} />}
        snapToAlignment={"start"}
        decelerationRate={"fast"}
      />
    </View>
  );
};

export default DealsScreen;
