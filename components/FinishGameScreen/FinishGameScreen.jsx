import { s } from "../../App.style.js";
import { Stars } from "../Stars/Stars";
import {Text, View} from "react-native";
import {useCorrectAnswer} from "../../utils/useCorrectAnswer";
import {flags } from '../../utils/countryTerritoryNames';

export function FinishGameScreen({country, currentFlag, score, setScore,  countryUnderscore,
    setCountryUnderscore, correctAnswers, setCorrectAnswers, turns, setTurns, arrayDailyFlags, setArrayDailyFlags}){

      useCorrectAnswer(countryUnderscore, currentFlag, setScore, correctAnswers, setCorrectAnswers);
      

    return(

<View>
<Stars correctAnswers = {correctAnswers}
setCorrectAnswers={setCorrectAnswers}
/>
      <Text style={s.mainContentText}>
      {countryUnderscore === currentFlag
    ? `Congratulations. You Are Right. The Answer Is ${country}.`
    : `Unlucky. That Was Not Correct. The Answer Is ${flags[arrayDailyFlags[turns]]}.`}
  {'\n'}
</Text>
<Text style = {s.scoreText}>
    {`Your FLAGL Score is ${score}%`}
</Text>

</View>

    )


    
}