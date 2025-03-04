import {
  View,
  ScrollView, 
 Keyboard, 
 ImageBackground,

} from "react-native";
import {StatusBar} from 'expo-status-bar';

import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { s } from "../App.style";
import { Header } from "../components/Header/Header";
import { BlurView } from "expo-blur";
import { Stats } from "../components/Stats/Stats";
import { Help} from "../components/Help/Help";
import { MainContent } from "../components/MainContent/MainContent";
import { Practice } from "../components/Practice/Practice";
import { PracticeFeedback} from "../components/PracticeFeedback/PracticeFeedback";
import { FeedbackScreen } from "../components/FeedbackScreen/FeedbackScreen";
import {FinishGameScreen} from "../components/FinishGameScreen/FinishGameScreen";
import { Footer} from "../components/Footer/Footer";
import { useState, useRef, useEffect } from "react";
import { ScreenProvider } from '../utils/helpLastScreen';
import { SafeAreaView } from "react-native-safe-area-context"

export default function Index() {
  const [content, setContent] = useState("This is the default content");
  const [icon, setIcon] = useState("");
  const[currentFlag, setCurrentFlag] = useState(0);
  const[currentPracticeFlag, setCurrentPracticeFlag] = useState(0);
  const [country, setCountry] = useState("");
  const[practiceCountry, setPracticeCountry] = useState("");
  const [turns, setTurns] = useState(0);
  const [arrayDailyFlags, setArrayDailyFlags] = useState([]);
  const [score, setScore] = useState(0);
  const[countryUnderscore, setCountryUnderscore]=useState("");
  const[practiceCountryUnderscore, setPracticeCountryUnderscore] = useState("");
  const[correctAnswers, setCorrectAnswers]=useState(0);
  const [haveAnswer, setHaveAnswer] = useState(false);
  const [practiceHaveAnswer, setPracticeHaveAnswer] = useState(false);
  const [gameCount, setGameCount] = useState(0);
  const[scoreArray, setScoreArray] = useState([])
  const[countryMatchingPredText, setCountryMatchingPredText]=useState([])
  const[countryButtonVisible, setCountryButtonVisible] = useState(false)
  const[practiceCountryButtonVisible, setPracticeCountryButtonVisible] = useState(false)
  const [inputValue, setInputValue] = useState("");
  const [resultsArray, setResultsArray] = useState([]);
  const [validateCorrect, setValidateCorrect] = useState(false);
  const [scoreArrayUpdated, setScoreArrayUpdated] = useState(true)




  /*Changes:

Check practice mode
  Layout - Done
  Landscape view - might not be nessecary


Add safeare? When screen goes up, clashes with time - Didn't work.

  Check at midnight. 
  Reword help section. 
  Test different iphones. 
  Get into Apple Store. 
  Do for Android? 
  Test for Android. 

  If don't get word show message, type in valid country name
  Check democratic republic of Congo - Changed to capitalise Of
East Timor - country buttons displayed before input
Push code

iphone 12 has different background color (oer image? than the iPhone 15. )

  */
  const keyboardOffset = useSharedValue(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      keyboardOffset.value = withSpring(-event.endCoordinates.height+85, {
        damping: 100,
        stiffness: 100,
      });
    });
    

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      keyboardOffset.value = withSpring(0, {
        damping: 20,
        stiffness: 100,
      });
    });

    return () => {
      keyboardDidShowListener.remove();
     keyboardDidHideListener.remove();
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: keyboardOffset.value }],
    };
  });

  



  const renderContent = () => {
    if (icon === "help") {
      console.log("help");
      return (
        <Help
        icon={icon}
        setIcon = {setIcon}
        />
       
      );
    } else if (icon === "stats") {
      console.log("stats");
      return (
        <Stats
        icon={icon}
        setIcon={setIcon}
        correctAnswers={correctAnswers}
        setCorrectAnswers={setCorrectAnswers}
        turns={turns}
        setTurns={setTurns}
        score={score}
        setScore={setScore}
        gameCount={gameCount}
        setGameCount={setGameCount}
        scoreArray={scoreArray}
        setScoreArray={setScoreArray}
        resultsArray = {resultsArray}
        setResultsArray={setResultsArray}
        />

      );
    } else if (icon === "") {
      console.log("main");
  
      return (
        <>
        <MainContent
        icon={icon}
        setIcon={setIcon}
        currentFlag={currentFlag}
        setCurrentFlag={setCurrentFlag}
        country={country}
        setCountry={setCountry}
        turns={turns}
        setTurns={setTurns}
        arrayDailyFlags={arrayDailyFlags}
        setArrayDailyFlags={setArrayDailyFlags}
        correctAnswers ={correctAnswers}
        setCorrectAnswers={setCorrectAnswers}
        countryUnderscore={countryUnderscore}
        setCountryUnderscore={setCountryUnderscore}
        score={score}
        setScore={setScore}
        haveAnswer = {haveAnswer}
        setHaveAnswer = {setHaveAnswer}
        practiceHaveAnswer={practiceHaveAnswer}
        setPracticeHaveAnswer={setPracticeHaveAnswer}
      countryMatchingPredText={countryMatchingPredText}
      setCountryMatchingPredText={setCountryMatchingPredText}
      inputValue={inputValue}
      setInputValue={setInputValue}
      countryButtonVisible={countryButtonVisible}
      setCountryButtonVisible={setCountryButtonVisible}
      keyboardOffset={keyboardOffset}
      resultsArray = {resultsArray}
      setResultsArray={setResultsArray}
      validateCorrect={validateCorrect}
      setValidateCorrect={setValidateCorrect}
      scoreArrayUpdated={scoreArrayUpdated}
      setScoreArrayUpdated={setScoreArrayUpdated}
   
        />
        
       
 
        </>
      );
    }
    else if (icon === "practice") {
      console.log("practice");
  
      return (
        <>
        <Practice
        icon={icon}
        setIcon={setIcon}
    currentPracticeFlag={currentPracticeFlag}
    setCurrentPracticeFlag = {setCurrentPracticeFlag}
        practiceCountry={practiceCountry}
        setPracticeCountry={setPracticeCountry}

        arrayDailyFlags={arrayDailyFlags}
        setArrayDailyFlags={setArrayDailyFlags}

        practiceCountryUnderscore={practiceCountryUnderscore}
        setPracticeCountryUnderscore={setPracticeCountryUnderscore}
        score={score}
        setScore={setScore}
        practiceHaveAnswer = {practiceHaveAnswer}
        setPracticeHaveAnswer = {setPracticeHaveAnswer}
        countryMatchingPredText={countryMatchingPredText}
        setCountryMatchingPredText={setCountryMatchingPredText}
        inputValue={inputValue}
        setInputValue={setInputValue}
        countryButtonVisible={countryButtonVisible}
        setCountryButtonVisible={setCountryButtonVisible}
        practiceCountryButtonVisible={practiceCountryButtonVisible}
        setPracticeCountryButtonVisible={setPracticeCountryButtonVisible}

        />
        
       
 
        </>
      );
    }
    else if (icon === "practiceFeedback") {
      console.log("practiceFeedback");
  
      return (
        <>
        <PracticeFeedback
        icon={icon}
        setIcon={setIcon}
        currentPracticeFlag={currentPracticeFlag}
        setCurrentPracticeFlag = {setCurrentPracticeFlag}
        practiceCountry={practiceCountry}
        setPracticeCountry={setPracticeCountry}
        turns={turns}
        setTurns={setTurns}
        arrayDailyFlags={arrayDailyFlags}
        setArrayDailyFlags={setArrayDailyFlags}
        correctAnswers ={correctAnswers}
        setCorrectAnswers={setCorrectAnswers}
        practiceCountryUnderscore={practiceCountryUnderscore}
        setPracticeCountryUnderscore={setPracticeCountryUnderscore}
        practiceHaveAnswer = {haveAnswer}
        setPracticeHaveAnswer = {setHaveAnswer}
        countryMatchingPredText={countryMatchingPredText}
        setCountryMatchingPredText={setCountryMatchingPredText}
        inputValue={inputValue}
        setInputValue={setInputValue}
        countryButtonVisible={countryButtonVisible}
        setCountryButtonVisible={setCountryButtonVisible}
        />
        
       
 
        </>
      );
    }
    else if (icon==="feedback"){
      return(<>

<FeedbackScreen
   currentFlag={currentFlag}
   setCurrentFlag={setCurrentFlag}
   country={country}
   setCountry={setCountry}
   icon={icon}
   setIcon={setIcon}
   turns={turns}
   setTurns={setTurns}
   arrayDailyFlags={arrayDailyFlags}
   setArrayDailyFlags={setArrayDailyFlags}
   score={score}
   setScore={setScore}
   countryUnderscore={countryUnderscore}
   setCountryUnderscore={setCountryUnderscore}
   correctAnswers ={correctAnswers}
   setCorrectAnswers={setCorrectAnswers}
   haveAnswer = {haveAnswer}
   setHaveAnswer = {setHaveAnswer}
   validateCorrect={validateCorrect}
   setValidateCorrect={setValidateCorrect}

   
   />
</>

      )

    }
    else if (icon==="finish")
      return(<>
      <FinishGameScreen
      country={country}
      setCountry={setCountry}
      currentFlag = {currentFlag}
      setCurrentFlag={setCurrentFlag}
      score={score}
      setScore={setScore}
      countryUnderscore={countryUnderscore}
      setCountryUnderscore={setCountryUnderscore}
      turns={turns}
      setTurns = {setTurns}
      arrayDailyFlags = {arrayDailyFlags}
      setArrayDailyFlags = {setArrayDailyFlags}
      correctAnswers = {correctAnswers}
      setCorrectAnswers = {setCorrectAnswers}
      countryUnderscore={countryUnderscore}
      setCountryUnderscore ={setCountryUnderscore}
      gameCount={gameCount}
      setGameCount={setGameCount}
      turns={turns}
      setTurns={setTurns}
      icon={icon}
      setIcon={setIcon}
      scoreArray={scoreArray}
      setScoreArray={setScoreArray}
      resultsArray = {resultsArray}
      setResultsArray={setResultsArray}
      scoreArrayUpdated={scoreArrayUpdated}
      setScoreArrayUpdated={setScoreArrayUpdated}  
      />
      </>)

  };


  return (
    <>

<View style={s.statusBarBackground}>
        <StatusBar style="dark" translucent={false} backgroundColor="white"/>
      </View>

     <Animated.View
  style={[s.app, animatedStyle, 
    { backgroundColor: icon === "practice" || icon === "practiceFeedback" ? "#e0e8e8": "white", flex: 1, transform: [{ translateY: icon===""?keyboardOffset.value:0 }],}, ]}

> 

{/* <ImageBackground
  source={
    icon === "practice" || icon === "practiceFeedback"
      ? null
      : require("../assets/images/WorldMap_v3.png")
  }
  style={[s.backgroundImage, { zIndex: -1 }]}
  resizeMode="cover"
>
  <BlurView style={s.blurView} intensity={10}> */}

          <View style={s.header}> 
            <Header
              content={content}
              setContent={setContent}
              icon={icon}
              setIcon={setIcon}
            />
          </View>

     
          <ScreenProvider>





          <View style={s.body}>
 

            <ScrollView showsVerticalScrollIndicator={false} 
              keyboardShouldPersistTaps={true}
          
               keyboardDismissMode="interactive"
 
    >
              {renderContent()}
            </ScrollView>

          </View>
     

       
          </ScreenProvider>
          {/* </BlurView>
     
          </ImageBackground> */}
        

   </Animated.View>

      <View style={s.footer}>
      <Footer 
      icon={icon}
      />
      </View>

 
    </>
  );
}
