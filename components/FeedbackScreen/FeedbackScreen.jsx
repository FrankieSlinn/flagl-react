import { s } from "../../App.style.js";
import { View, Text, TouchableOpacity, useContext } from "react-native";
import { useEffect, useState } from "react";
import { Stars } from "../Stars/Stars";
//import {useCorrectAnswer} from "../../utils/useCorrectAnswer"
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { flags } from "../../utils/countryTerritoryNames";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import  { useScreenContext }from '../../utils/helpLastScreen';
import { getStoredGameCount, storeAllScores, storeScore, getAllStoredScores, storeGameCount, storeTurns, getStoredTurns,
  getStoredCountryUnderscore, storeCountryUnderscore
} from '../../utils/asyncStorageUtils';

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
  score, 
  setScore,

}) {
  const { lastScreen, setLastScreen } = useScreenContext();

  const [translateY, setTranslateY] = useState(0);

  const moveToNormalPosition = () => {
    
    setTranslateY(0); // Reset translateY to 0
    console.log("Moving screen back to original position", translateY);
  };

  //NOTE: withTiming instead of withSpring could be good


  // const moveScreenBack = useAnimatedStyle(() => {
  //   return {
  //     transform: [{ screenMoveDown.value: 0}],
  //   };
  // });


  useEffect(() => {
setLastScreen("feedback")

console.log("last Screen in feedback", lastScreen)
}, []);

// useEffect(()=>{
//   screenMoveDown.value = withSpring(0, {
//     damping: 20,
//     stiffness: 100,
//   });

// })

useEffect(() => {
  const fetchCountryunderscore = async () => {
      const countryUnderscore = await getStoredCountryUnderscore();
      console.log("Score in stats", score)
      setCountryUnderscore(countryUnderscore);  // Set the countryUnderscore in state
  };

  fetchCountryunderscore();
},[]);


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


  function handleFinishGame() {
    setIcon("finish");
    console.log("Game Finished. Current Icon:", icon);
    console.log("correctAnswers in Finish Screen", correctAnswers);
  }

  function handleFeedbackButtonPress() {

    // Reset icon
    newTurn();
    console.log("resetting icon to main content");
    console.log("setHaveAnswer",haveAnswer);
    

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
     
      }
    
   
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
    <View style={[s.mainContent, { transform: [{ translateY }] }]}>
      <Stars
        correctAnswers={correctAnswers}
        setCorrectAnswers={setCorrectAnswers}
      />


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
