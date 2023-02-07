import { StyleSheet } from "react-native";



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffa',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    stars: {
      display: 'flex',
      flexDirection: 'row',
    },
    starUnselected: {
      color: '#aaa',
      marginHorizontal: 4
    },
    starSelected: {
      color: '#ffb300',
      marginHorizontal: 4
    },
  });

  export default styles;