import { s } from "../../App.style.js";
import { Stars } from "../Stars/Stars";
import {Text, View} from "react-native";
//import {useCorrectAnswer} from "../../utils/useCorrectAnswer";
import {flags } from '../../utils/countryTerritoryNames';
import{useEffect} from "react";
import { storeScore } from '../../utils/asyncStorageUtils'; // Adjust the path as per your project structure

export function FinishGameScreen({ country, currentFlag, score, setScore, correctAnswers, setCorrectAnswers, countryUnderscore, setCountryUnderscore }) {
    // Use storeScore inside this component when needed
    useEffect(()=>
    setGameCount((prevGameCount)+1))
    
    useEffect(() => {
        if (score !== null && score !== undefined) {
            storeScore(score);
        }
    }, [score]);
      

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