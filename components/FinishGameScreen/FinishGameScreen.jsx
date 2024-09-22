import { s } from "../../App.style.js";
import { Stars } from "../Stars/Stars";
import {Text, View} from "react-native"

export function FinishGameScreen({country, currentFlag, score, setScore,  countryUnderscore,
    setCountryUnderscore}){
    return(

<View>
<Stars/>


      
      <Text style={s.mainContentText}>
      {countryUnderscore === currentFlag
    ? `Congratulations. You Are Right. The Answer Is ${country}.`
    : `Unlucky. That Was Not Correct. The Answer Is ${country}.`}
  {'\n'}
</Text>
<Text style = {s.scoreText}>
    {`Your FLAGL Score is ${score}%`}
</Text>

</View>

    )


    
}