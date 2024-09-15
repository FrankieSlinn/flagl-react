import {Text, View } from "react-native";
import {s} from "../../App.style.js";

import {Logo} from "../Logo/Logo";
import {HelpIcon} from "../HelpIcon/HelpIcon";
import {StatsIcon} from "../StatsIcon/StatsIcon";
export function Header({content, setContent, icon, setIcon, onPress}){


return <>
<View style = {s.header}>

<HelpIcon
content = {content}
setContent = {setContent}
onPress={() => setIcon("help")}/>
<Logo/>
<StatsIcon
content = {content}
setContent = {setContent}
onPress={() => setIcon("stats")}
/>
</View>

</>

}