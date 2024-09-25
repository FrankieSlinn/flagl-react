import { s } from "../../App.style.js";
import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Stars } from "../Stars/Stars";
import {useCorrectAnswer} from "../../utils/useCorrectAnswer";
import {flags } from '../../utils/countryTerritoryNames';


export function FeedbackScreen({
  currentFlag,
  setCurrentFlag,
  country,
  setCountry,
  countryUnderscore,
  setCountryUnderscore,
  icon,
  setIcon,
  turns,
  setTurns,
  arrayDailyFlags,
  setArrayDailyFlags,
  score,
  setScore,
correctAnswers,
setCorrectAnswers
}) {
  const employCorrectAnswer= useCorrectAnswer(countryUnderscore, currentFlag, setScore, correctAnswers, setCorrectAnswers)



  useEffect(() => {
countryWithUnderscore = country.replaceAll(" ", "_");
setCountryUnderscore(countryWithUnderscore);

    
  }, [country]);


  // Effect to handle when turns exceed 4
  useEffect(() => {

    if (turns ===4) {
      console.log("turns in finishgame use effect", turns)
      console.log("Turns are 4. Ending game...");
  
 
      handleFinishGame();
    }
  }, [turns]);


  function newTurn() {
    if(turns<=3){
    console.log("Countrybutton pressed");
    if(countryUnderscore === currentFlag){employCorrectAnswer()}

    
    setIcon(""); // Reset icon
    setTurns((prevTurns) => prevTurns + 1); // Use the functional updater to ensure correct state}

    // Update the current flag if the game is still within the allowed turns

      setCurrentFlag(arrayDailyFlags[turns + 1]); // Use the next turn's index
    

    console.log("Turns after newTurn:", turns);
    
  } 

}



//useCorrectAnswer(countryUnderscore, currentFlag, setScore, correctAnswers, setCorrectAnswers);
console.log("correctAnswers in Feedback Screen", correctAnswers)

  // Function called when the game is finished
  function handleFinishGame() {
    
    setIcon("finish");
    console.log("Game Finished. Current Icon:", icon);
    console.log("correctAnswers in Finish Screen", correctAnswers)

  }

  //const handleCorrectAnswer = useCorrectAnswer(countryUnderscore, currentFlag, setScore, correctAnswers, setCorrectAnswers);



  return (
    <View style={s.mainContent}>
      <Stars 
          correctAnswers={correctAnswers}
          setCorrectAnswers={setCorrectAnswers}/>
      <Text style={s.mainContentText}>Feedback</Text>
      
      <Text style={s.mainContentText}>
        {countryUnderscore === currentFlag
          ? `Congratulations. You Are Right. The Answer Is ${country}.`
          : `Unlucky. That Was Not Correct. The Answer Is ${flags[arrayDailyFlags[turns]]}.`}
        {'\n'}
      </Text>

      {turns <= 3&& (
        <TouchableOpacity style={s.countryButton} onPress={newTurn}>
          <Text style={s.countryButtonText}>Have Another Go</Text>
        </TouchableOpacity>
      )}


    </View>
  );
}

