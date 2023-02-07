import { useEffect, useState } from "react";
import { ImageBackground, View } from "react-native";
import StyledInput from "../../../components/StyledInput";
import styles from "./styles";

interface IPropPormoCode {
    promoCode: string;
    setPromoCode: React.Dispatch<React.SetStateAction<string>>;
  }

const PromoCodeScreen = (props: IPropPormoCode) =>{
    const {promoCode, setPromoCode} = props;
    const[pomCode] = useState(promoCode)
    useEffect(()=>{
        setPromoCode(promoCode);
        console.log("promoScreen useEffect");
    },[promoCode, props])
    return(
        <View>
            <StyledInput title="Унесите Ваш промо код" icon="qq" value={pomCode} onChangeTextInputPromo={setPromoCode} />
        </View>
    )
}

export default PromoCodeScreen;