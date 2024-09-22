import { s } from "../../App.style.js";
import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Stars } from "../Stars/Stars";


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
}) {



  useEffect(() => {
countryWithUnderscore = country.replaceAll(" ", "_");
setCountryUnderscore(countryWithUnderscore);
    
  }, [country]);


  // Effect to handle when turns exceed 4
  useEffect(() => {
    if (turns ===4) {
      console.log("Turns are 4. Ending game...");
      handleFinishGame();
    }
  }, [turns]);

  useEffect(() => {
    if (countryUnderscore === currentFlag) {
      console.log("countries match add to score")
      handleCorrectAnswer();
    }
  }, [countryUnderscore, currentFlag])

  // Function called when the "Have Another Go" button is pressed
  function newTurn() {
    if(turns<=3){
    console.log("Have a go button pressed");
    
    setIcon(""); // Reset icon
    setTurns((prevTurns) => prevTurns + 1); // Use the functional updater to ensure correct state}

    // Update the current flag if the game is still within the allowed turns

      setCurrentFlag(arrayDailyFlags[turns + 1]); // Use the next turn's index
    

    console.log("Turns after newTurn:", turns);
  } else if(turns===4){
    setIcon("finish"); 

  }
}

  // Function called when the game is finished
  function handleFinishGame() {
    setIcon("finish");
    console.log("Game Finished. Current Icon:", icon);
    setTurns((prevTurns) => prevTurns + 1);
  }

  // Function for handling correct answer
  function handleCorrectAnswer() {
    console.log("handlecorrectanswer to add to score running")
    setScore((prevScore) => prevScore+ 20);; // Increase the score by 20
    console.log("score", score);
  
  }

  return (
    <View style={s.mainContent}>
      <Stars />
      <Text style={s.mainContentText}>Feedback</Text>
      
      <Text style={s.mainContentText}>
        {countryUnderscore === currentFlag
          ? `Congratulations. You Are Right. The Answer Is ${country}.`
          : `Unlucky. That Was Not Correct. The Answer Is ${country}.`}
        {'\n'}
      </Text>

      {turns <= 3&& (
        <TouchableOpacity style={s.countryButton} onPress={newTurn}>
          <Text style={s.countryButtonText}>Have Another Go</Text>
        </TouchableOpacity>
      )}
      {   turns ===4&& (
        <TouchableOpacity style={s.countryButton} onPress={newTurn}>
          <Text style={s.countryButtonText}>Finish Game</Text>
        </TouchableOpacity>
      )}

    </View>
  );
}

