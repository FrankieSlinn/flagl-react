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
    {"\n"}Every day you will see the same flags as all the other FLAGL
    players. The goal of course is to correctly identify as many flags
    as you can. All you need to do is to start typing in the box under
    the flag to get a list of countries and territories. Click on one of
    the country or territory buttons to make your choice.
    {"\n\n"}
    At the end of the flag quiz you will see what percentage of flags
    you got right. The statistics section on the top right shows your
    average score per game so you can see if you're improving. Share and
    compare your score with friends by selecting the "Share Results"
    button in the statistics section. {"\n"}
    They might be wowed by your flag guessing ability. Or maybe not.
    There's only one way of telling.
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
  </Text>
</>)

}