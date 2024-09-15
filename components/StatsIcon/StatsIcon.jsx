import {Image, TouchableOpacity} from "react-native";
import {s} from "./StatsIconStyle";


export function StatsIcon({onPress}){
return(<>
<TouchableOpacity  onPress={onPress}>
<Image source={require('../../assets/images/statsIcon.png')} style={s.stats}
/>
</TouchableOpacity>
</>

);
}