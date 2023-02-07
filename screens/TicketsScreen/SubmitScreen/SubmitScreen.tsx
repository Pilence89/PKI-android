import { addDoc, collection, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native"
import Toast from "react-native-root-toast";
import StyledButton from "../../../components/StyledButton";
import GlobalContext from "../../../Context/Context";
import { db } from "../../../firebase";

import styles from "./styles";

interface ISubmitProp {
    date: string,
    parentTicket: number,
    childTicket: number,
    babyTicket: number,
    promoCode?: string,
    onSubmitHandle: ()=>void;
}

const SubmitScreen = (props: ISubmitProp) =>{
    const {date, babyTicket,childTicket,parentTicket,promoCode, onSubmitHandle}=props;
    const userTickets = collection(db, "karte");
    const {profileInfo, deals} = useContext(GlobalContext);
    const [cena, setCena] = useState(0);
    const [cenaPromo, setCenaPromo] = useState(0);
    const [isValid, setIsValid] = useState(false);
    const [gratisP, setGratisP] = useState(0);
    const [gratisC, setGratisC] = useState(0);

    useEffect(()=>{
        console.log(deals);
        var pTkonacno =parentTicket;
        var cTkonacno =childTicket;
        var cCena = 150;
        var pCena = 350;
        if(parentTicket>3){
            let numFree = Math.floor(parentTicket/3);
            pTkonacno = pTkonacno -numFree;
        }
        if(babyTicket>2){
            let numFree = Math.floor(babyTicket/2);
            pTkonacno = pTkonacno -numFree;
        }
        if(childTicket>10){
            cCena =75;
        }
        let cenaUkupno = pTkonacno * pCena + cTkonacno * cCena;
        let pTPromo =pTkonacno;
        let cTPromo = cTkonacno;
        if(promoCode!=""){
            let validPromo = deals.find(code=>code.promoKod==promoCode);
            if(validPromo){
                let izabranDatum = Math.floor(new Date(date).getTime() / 1000);
                console.log(izabranDatum, validPromo.kraj, izabranDatum<validPromo.kraj.seconds);
                if(izabranDatum<validPromo.kraj.seconds){
                    setIsValid(true);
                    switch(validPromo.operacija){
                        case "+":{
                            if(validPromo.brKarataODrasli != 0){
                                setGratisP(validPromo.racun);
                            }else if( validPromo.brKarataDeca != 0){
                                setGratisC(validPromo.racun);
                            }
                            break;
                        }
                        case "-":{
                            if(validPromo.brKarataODrasli != 0){
                                pTPromo = pTPromo - validPromo.brKarataODrasli;
                            }else if( validPromo.brKarataDeca == 0){
                                cTPromo = cTPromo - validPromo.brKarataDeca
                            }
                            break;
                        }
                        case "*":{
                            if(validPromo.brKarataODrasli != 0){
                                pCena = Math.floor(pCena*validPromo.racun)
                            }else if( validPromo.brKarataDeca == 0){
                                cCena = Math.floor(cCena*validPromo.racun)
                            }
                            break;
                        }
                    }
                    let cenaPromo = pTPromo * pCena + cTPromo * cCena;
                    setCenaPromo(cenaPromo);
                    //IZRACUNATI UKUPNU CENU KARATA
                }
            }    
        }

        setCena(cenaUkupno);
    },[babyTicket,childTicket,parentTicket,promoCode,date])

    async function onSend() {
        const writes = addDoc(userTickets, { Mkarte: babyTicket, Skarte: childTicket, Vkarte:parentTicket, datum: date, odobreno: false, promokod: isValid ? promoCode : "", username: profileInfo?.username, vidjeno: false ,id:"", datumTrazenja:Timestamp.now, cena:cena, promoCena: cenaPromo })
        .then(e=> updateDoc(e,{id:e.id}));

        let odgovor = await Promise.all([writes]);
        // console.log(odgovor);
        Toast.show(odgovor ? "Успешно сте послали резервацију за карте. Ускоро ћете добити потврду и одобрење!": "Дошло је до грешке!", {
            duration: 6000,
          } );
          onSubmitHandle();
      }
    return (
        <View style={styles.container}>
            <Text>За ово сте се одлучили</Text>
            <View ><Text>Одлучили Сте се да нас посетите {date}!</Text></View>
            <View><Text>Купили Сте {parentTicket} {karteRec(parentTicket)} за одрасле, {childTicket} {karteRec(childTicket)} за децу и {babyTicket} {karteRec(babyTicket)} за бебце!</Text></View>
            <View><Text>{promoCode ? "Ваш промо код: " +promoCode : "На жалост нисте искористили промо код :("}</Text></View>
            {promoCode && <View><Text style={{color: isValid ? "white" : "red"}}>{isValid ? gratisP != 0 || gratisC!=0 ? "Промо код Вам је донео гратис карте!": "Промо код Вам је донео умањење цене карата" : "Унели сте неважећи промо код!"}</Text></View>}
            <View><Text>Укупно за плаћање : {cena} динара</Text></View>
            {isValid && <View><Text>Укупно за плаћање са промо кодом: {cenaPromo} динара</Text></View>}
            <StyledButton title="Резервишите Ваше карте" onPress={onSend}/>
        </View>
    )
}

// function racunHandle(pK: number,sK:number,promo1: boolean, promo2:boolean, promo3: boolean, promoKod:){

// }

function karteRec(broj:number) {
    if(broj>=0){
    switch(broj){
        case 0: return "карата";
        case 1: return "карту";
        case 2: return "карте";
        case 3: return "карте";
        case 4: return "карте";
        default: {
            let pomBroj = broj%10;
            if(broj>20){
                if(pomBroj==1)
                return "карту"
                else if(pomBroj==2 || pomBroj==3 || pomBroj==4)
                return "карте"
            }

            return "карти";
        }
    }
    }
} 

export default SubmitScreen;