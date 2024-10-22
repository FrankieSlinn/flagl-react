

import {Text, View} from "react-native";
import {s} from "../../App.style.js";
import { StarIcon } from "react-native-heroicons/outline";

export function PracticeHeading(){


return <>
<View style={s.practiceHeading}>
<StarIcon style={s.star} fill="yellow" />
<Text style={s.practiceHeadingTitle} >FLAGL Practice</Text>
<StarIcon style={s.star} fill="yellow" />
</View>
</>

}