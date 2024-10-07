import { s } from "../../App.style.js";
import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Stars } from "../Stars/Stars";
//import {useCorrectAnswer} from "../../utils/useCorrectAnswer"

import {flags } from '../../utils/countryTerritoryNames';
import { FaceSmileIcon } from "react-native-heroicons/outline";


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
correctAnswers,
setCorrectAnswers,
haveAnswer, setHaveAnswer
}) {
  






  // Effect to handle when turns exceed 4
  useEffect(() => {


  if (turns ===4) {
      console.log("turns in finishgame use effect", turns)
      console.log("Turns are 4. Ending game...");
  
 
      handleFinishGame();
    }
  }, [turns]);




console.log("correctAnswers in Feedback Screen", correctAnswers)

  // Function called when the game is finished
  function handleFinishGame() {
    
    setIcon("finish");
    console.log("Game Finished. Current Icon:", icon);
    console.log("correctAnswers in Finish Screen", correctAnswers)

  }

 

function handleFeedbackButtonPress(){

   // Reset icon
  newTurn();
  console.log("resetting icon to main content")
  console.log("setHaveAnswer", setHaveAnswer);
  if(turns<4){
    setIcon("");
  
  }


}


function newTurn() {
  console.log("newTurn function running")
  if(turns<=3){

  //if(countryUnderscore === currentFlag && countryUnderscore !=""){useCorrectAnswer()}

  
 
  setTurns((prevTurns) => prevTurns + 1); // Use the functional updater to ensure correct state}

  // Update the current flag if the game is still within the allowed turns

    setCurrentFlag(arrayDailyFlags[turns + 1]); // Use the next turn's index
   
  

  console.log("Turns after newTurn:", turns);
  
} 

}

  return (
    <View style={s.mainContent}>
      <Stars 
          correctAnswers={correctAnswers}
          setCorrectAnswers={setCorrectAnswers}/>
      <Text style={s.mainContentText}>Feedback</Text>
      
      <Text style={s.mainContentText}>
        {countryUnderscore === currentFlag
          ? `Congratulations. You Are Right. The Answer Is ${flags[arrayDailyFlags[turns]]}.`
          : `Unlucky. That Was Not Correct. The Answer Is ${flags[arrayDailyFlags[turns]]}.`}
        {'\n'}
      </Text>

      {turns <= 3&& (
        <TouchableOpacity style={s.countryButton} onPress={handleFeedbackButtonPress}>
          <Text style={s.countryButtonText}>Have Another Go</Text>
        </TouchableOpacity>
      )}


    </View>
  );
}

