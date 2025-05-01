import {Text, View, Linking} from "react-native";
import {s} from "../../App.style.js";
import { CloseButton } from "../CloseButton/CloseButton";
import  { useScreenContext } from '../../utils/helpLastScreen';


export function Help({setIcon, onPress, navigation, route}){
  //to get back to screen the user was on before
    const { lastScreen, setLastScreen } = useScreenContext();

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
    {"\n"}Every day all FLAGL Players get the same five flags. Start typing the flag name in the box underneath
    the flag. You will then see buttons with the names of countries and territories. Click on a button to make your choice.
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
      onPress={async () => {
        const url = "https://wordominoes.net/";
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          console.warn("Can't open URL:", url);
        }
      }}
      
    >
      wordominoes.net
    </Text>
    .
    {"\n"}
    {"\n"}
  </Text>
</>)

}