import {
  AntDesign,
  MaterialIcons,
  FontAwesome5,
  EvilIcons,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";

const CustomIcons = (props: { type: string }) => {
  return (
    //           <FontAwesome name="mobile-phone" size={24} color="black" />
    //   <MaterialIcons name="place" size={24} color="black" />
    //   <FontAwesome5 name="user-secret" size={24} color="black" />
    //   <FontAwesome5 name="cat" size={24} color="black" />
    //   <CustomIcons type={icon ? icon : "cat"} />
    {
      phone: <MaterialIcons name="phone-android" size={24} color="black" />,
      address: <MaterialIcons name="place" size={24} color="black" />,
      "user-secret": (
        <FontAwesome5 name="user-secret" size={24} color="black" />
      ),
      cat: <FontAwesome5 name="cat" size={24} color="black" />,
      child: <FontAwesome5 name="child" size={24} color="black" />,
      human: <MaterialCommunityIcons name="human-handsup" size={24} color="black" />,
      baby: <FontAwesome5 name="baby" size={24} color="black" />,
      parents: <MaterialCommunityIcons name="human-male-female" size={24} color="black" />,
      qq: <FontAwesome5 name="qq" size={24} color="black" />,
      key: <AntDesign name="key" size={24} color="black" />
    }[props.type] || <FontAwesome5 name="cat" size={24} color="black" />
  );
};

export default CustomIcons;
