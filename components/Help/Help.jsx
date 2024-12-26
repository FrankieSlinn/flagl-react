import {Text, View, Navigation} from "react-native";
import {s} from "../../App.style.js";
import { CloseButton } from "../CloseButton/CloseButton";
import  { useScreenContext } from '../../utils/helpLastScreen';


export function Help({setIcon, onPress, navigation, route}){
 
    const { lastScreen, setLastScreen } = useScreenContext();

    console.log("last screen in Help", lastScreen)
    


return ( <>
<View style={s.closeButtonContainer}>
  <CloseButton 
  onPress={() => lastScreen!=null?setIcon(lastScreen):null} />
  </View>
  <Text style={s.iconHeader}>The Daily Flag Quiz</Text>
  <Text style={s.helpBody}>
    {"\n"}
    <Text style={s.helpGuess}>Guess the Flag</Text>
    {"\n"}
    {"\n"}Every day all FLAGL Players will see the same five flags. The goal is to correctly name as many flags
    as you can. Start typing a flag name in the box under
    the flag. You will then see a list of countries and territories. Click on one of
    the country / territory buttons to make your choice.
    {"\n\n"}
    At the end of the flag quiz you will see what percentage of flags
    you got right. The statistics section on the top right shows your
    average score per game so you can see if you're getting better. Share and
    compare your score with friends by clicking the "Share Results"
    button. {"\n"}
    They might be wowed by your flag guessing ability. Or maybe not.
    
    {"\n"}
    {"\n"}
    Does this format look familiar? The game is inspired by the
    brilliant game Worlde created by the talented Josh Wardle.
    {"\n"}
    {"\n"}

    For a wider geography quiz see:{" "}
    <Text
      style={s.link}
      onPress={() => Linking.openURL("https://geografiend.com/")}
    >
      geografiend.com
    </Text>
    .{"\n\n"}
    Love tough word games? Go to:{" "}
    <Text
      style={s.link}
      onPress={() => Linking.openURL("https://wordominoes.net/")}
    >
      wordominoes.net
    </Text>
    .
    {"\n"}
  </Text>
</>)

}