import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NotImplementedScreen from "../NotImplementedScreen/NotImplementedScreen";
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();

const TicketsScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Појединачне / Групне"
        component={NotImplementedScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons name="family-restroom" size={24} color={color} />
              <MaterialCommunityIcons
                name="slash-forward"
                size={24}
                color="black"
              />
              <Entypo name="user" size={24} color={color} />
            </View>
            // <MaterialIcons name="groups" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Специјалне понуде"
        component={NotImplementedScreen}
        options={{
          tabBarIcon: ({ color }) => (
            // <Entypo name="user" size={24} color={color} />
            <MaterialCommunityIcons
              name="human-greeting-proximity"
              size={24}
              color="black"
            />
            // <MaterialIcons name="groups" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TicketsScreen;
