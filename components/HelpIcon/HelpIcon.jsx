import {Image, TouchableOpacity, Text} from "react-native";
import {s} from "./HelpIconStyle";


export function HelpIcon({onPress}){
return(<>

<TouchableOpacity onPress={onPress}>
<Image source={require('../../assets/images/helpIcon.png')} style={s.help} />
</TouchableOpacity>
</>

);
}