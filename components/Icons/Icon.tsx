import {
  AntDesign,
  MaterialIcons,
  FontAwesome5,
  EvilIcons,
  FontAwesome,
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
    }[props.type] || <FontAwesome5 name="cat" size={24} color="black" />
  );
};

export default CustomIcons;
