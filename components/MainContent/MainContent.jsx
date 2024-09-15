import {s} from "../../App.style.js";
import{Text} from "react-native";
import {StatsIcon} from "../StatsIcon/StatsIcon";
import {Stars} from "../Stars/Stars";

export function MainContent(){

    return(<>
             <Text style={s.iconHeader}>Main Part</Text>
             <Stars/>
    
    </>)
}