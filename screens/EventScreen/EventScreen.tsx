import { FlatList, Text, View } from "react-native";
import {useContext, useEffect} from 'react';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import EventItem from "../../components/EventItem/EventItem";
import { EventItem as EI } from "../../data/eventsData/eventsData";
import ExplodingHeart from "../../components/CustomHeart/CustomHeart";
import GlobalContext from "../../Context/Context";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";

const EventScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const { events, setEvents } = useContext(GlobalContext);
  //   const [offset, setOffset] = useState(0);
  const eventsQuery = query(
    collection(db, "dogadjaji")
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(eventsQuery, (querySnapshot) => {
      const parsedEvents = querySnapshot.docs.map((doc) => doc.data() as EI)
      setEvents(parsedEvents);
    });
    return () => unsubscribe();
  }, []);
  return (
    <View style={{ bottom: tabBarHeight, marginTop:50 }}>
      <FlatList
        data={events}
        renderItem={({ item }) => <EventItem {...item} />}
        snapToAlignment={"start"}
        decelerationRate={"fast"}
      />
    </View>
  );
};

export default EventScreen;
