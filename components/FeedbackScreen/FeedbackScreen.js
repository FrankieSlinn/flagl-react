import { s } from "../../App.style.js";
import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { Stars } from "../Stars/Stars";
//import {useCorrectAnswer} from "../../utils/useCorrectAnswer"

import { flags } from "../../utils/countryTerritoryNames";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { getStoredGameCount, storeAllScores, storeScore, getAllStoredScores, storeGameCount, storeTurns, getStoredTurns} from '../../utils/asyncStorageUtils';

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
  haveAnswer,
  setHaveAnswer,
}) {
  // // Effect to handle when turns exceed 4
  // useEffect(() => {
  //   if (turns === 4) {
  //     console.log("turns in finishgame use effect", turns);
  //     console.log("Turns are 4. Ending game...");

  //     handleFinishGame();
  //   }
  // }, [turns]);

  console.log("correctAnswers in Feedback Screen", correctAnswers);

  const setTheCurrentFlag= async (storedTurnCount) => {
    try{

   
            //const storedTurnCount = await getStoredTurns()
            console.log("storedTurnCount in setCurrentFlag", storedTurnCount);
    // This effect will run whenever 'turns' or 'arrayDailyFlags' changes
    if (arrayDailyFlags.length > 0) {
      let currentFlagNumber = arrayDailyFlags[storedTurnCount];
      let flagWithoutUnderscore = String(flags[currentFlagNumber]);
      let flagWithUnderscore = flagWithoutUnderscore.replaceAll(" ", "_");
  
      console.log("Stored Turns updated to:", storedTurnCount);
      console.log("Updating flag to:", flagWithUnderscore);
  
      setCurrentFlag(flagWithUnderscore); // Set the flag after turns has updated
    }
  }
  catch (error) {
    console.error('Error fetching or generating flags:', error);
  }
};

// useEffect(() => {
//   setTheCurrentFlag(); 

//   // Fetch or generate flags only once when the component mounts
// }, [turns]);
  function handleFinishGame() {
    setIcon("finish");
    console.log("Game Finished. Current Icon:", icon);
    console.log("correctAnswers in Finish Screen", correctAnswers);
  }

  function handleFeedbackButtonPress() {
    // Reset icon
    newTurn();
    console.log("resetting icon to main content");
    console.log("setHaveAnswer", setHaveAnswer);
    

  }

  function newTurn() {
    console.log("newTurn function running");
    
    if (turns <= 3) {

      const loadAndIncrementTurns = async () => {
        try {
          // Retrieve stored game count
   
            const incrementedStoredTurnCount = await getStoredTurns()+1;
            //const incrementedTurnCount = storedTurnCount + 1;
            console.log("getStoredGameCount in Feedback", incrementedStoredTurnCount );
    
    
            // Store the new game count back to AsyncStorage
            await AsyncStorage.setItem("stored turnCount", JSON.stringify(incrementedStoredTurnCount ));
            setTurns(incrementedStoredTurnCount)
            setTheCurrentFlag(incrementedStoredTurnCount)
            if (incrementedStoredTurnCount<= 4) {
    
              setIcon("");
            }
            else if (incrementedStoredTurnCount>4){
            
                console.log("turns in finishgame use effect", turns);
                console.log("Turns are 4. Ending game...");
          
                handleFinishGame();
              
            
            
            
          
        } 
      }
      catch (error) {
          console.error("Error loading or updating turn count:", error);
        }
       // setCurrentFlag(arrayDailyFlags[turns + 1]); // Use the next turn's index
      }
    
      //if(countryUnderscore === currentFlag && countryUnderscore !=""){useCorrectAnswer()}

      //setTurns((prevTurns) => prevTurns + 1); // Use the functional updater to ensure correct state}

      // Update the current flag if the game is still within the allowed turns
      loadAndIncrementTurns();
  

      console.log("Turns after newTurn:", turns);
    }
    else if (turns===4){
      if (turns === 4) {
        console.log("turns in finishgame use effect", turns);
        console.log("Turns are 4. Ending game...");
  
        handleFinishGame();
      }

    }
  }

 

  return (
    <View style={s.mainContent}>
      <Stars
        correctAnswers={correctAnswers}
        setCorrectAnswers={setCorrectAnswers}
      />
      <Text style={s.mainContentText}>Feedback</Text>

      <Text style={s.mainContentText}>
        {countryUnderscore === currentFlag
          ? `Congratulations. You Are Right. The Answer Is ${
              flags[arrayDailyFlags[turns]]
            }.`
          : `Unlucky. That Was Not Correct. The Answer Is ${
              flags[arrayDailyFlags[turns]]
            }.`}
        {"\n"}
      </Text>

      {turns <= 3 && (
        <TouchableOpacity
          style={s.countryButton}
          onPress={handleFeedbackButtonPress}
        >
          <Text style={s.countryButtonText}>Have Another Go</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
