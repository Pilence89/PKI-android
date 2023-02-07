import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    image:{ height: 300, resizeMode: "contain",},
    overImage:{
        opacity: 0.5
    },
    overImegBox:{
        backgroundColor: "black",
        height: 300,
        width: "100%",
        position: "absolute",
        opacity: 0.5,
        display: "flex",
        justifyContent: "center"
    },
    overImegText:{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        position: "absolute",
        height: 300,
    },
    overPromotion:{
        color:"white",
        fontSize: 30,
        textAlign: "center",
        alignSelf: "center",
        opacity: 1,
        transform: [{ rotate: '-25deg'}]
    },
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
    }
});


export default styles;