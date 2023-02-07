import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    image:{ height: 300 , resizeMode: "contain",},
    container:{
        paddingBottom: 15,
        marginBottom: 0,
        borderBottomWidth: 5
    },
    title:{
        fontSize:17,
        fontWeight: "700"
    },
    description:{
        fontSize: 13,
        color: "#787878"
    },
    like:{
        position: "absolute",
        right: 0,
        left: 0,
        top: 120,
        zIndex:5
    },
    likes:{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    heart:{
        flexDirection: "row",
    }
});


export default styles;