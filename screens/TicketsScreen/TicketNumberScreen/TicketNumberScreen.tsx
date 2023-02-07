import { SetStateAction } from "react";
import { Text, TextInput, View } from "react-native";
import StyledInput from "../../../components/StyledInput";

import styles from "./styles";

interface IPropTickets {
    canGoNext: (can:boolean) => void;
    parentTickets: number;
    childTickets: number;
    babyTickets: number;
    setParentTickets: React.Dispatch<React.SetStateAction<number>>;
    setChildTickets:  React.Dispatch<React.SetStateAction<number>>;
    setBabyTickets:  React.Dispatch<React.SetStateAction<number>>;
  }

const TicketNumberScreen = (props: IPropTickets) =>{
    const {canGoNext, babyTickets,childTickets,parentTickets,setBabyTickets,setChildTickets,setParentTickets} = props;
return (
    <View>
        <Text style={styles.header}>Изаберите број карата</Text>
        <StyledInput icon="parents" title="Одрасли - 350 динара" numeric key={Math.random()} value={parentTickets+""} onChange={setParentTickets}/>
        <StyledInput icon="child" title="Деца - 150 динара" numeric key={Math.random()} value={childTickets+""} onChange={setChildTickets}/>
        <StyledInput icon="baby" title="Шврћани - бесплатно" numeric key={Math.random()} value={babyTickets+""} onChange={setBabyTickets}/>

        <View style={{backgroundColor: "#fff"}}>
            <Text style={{textAlign: "center", fontWeight:"700"}}>ПРОМОЦИЈЕ</Text>
            <Text style={{textAlign: "center"}}>- Купите три карте за одрасле и следећу добијате гратис -</Text>
            <Text style={{textAlign: "center"}}>- За 10-оро и више деце карта је по 75 динара -</Text>
            <Text style={{textAlign: "center"}}>- На свако четврто дете једна карта за одрасле гратис -</Text>
        </View>
    </View>
)
}

export default TicketNumberScreen;