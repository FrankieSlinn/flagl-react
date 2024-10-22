import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "../App.style";
import { Header } from "../components/Header/Header";

import { Stats } from "../components/Stats/Stats";
import { Help} from "../components/Help/Help";
import { MainContent } from "../components/MainContent/MainContent";
import { Practice } from "../components/Practice/Practice";
import { PracticeFeedback} from "../components/PracticeFeedback/PracticeFeedback";
import { FeedbackScreen } from "../components/FeedbackScreen/FeedbackScreen";
import {FinishGameScreen} from "../components/FinishGameScreen/FinishGameScreen";
import { useState } from "react";
import { ScreenProvider } from '../utils/helpLastScreen';

export default function Index() {
  const [content, setContent] = useState("This is the default content");
  const [icon, setIcon] = useState("");
  const[currentFlag, setCurrentFlag] = useState(0);
  const[currentPracticeFlag, setCurrentPracticeFlag] = useState(0);
  const [country, setCountry] = useState("");
  const [turns, setTurns] = useState(0);
  const [arrayDailyFlags, setArrayDailyFlags] = useState([]);
  const [score, setScore] = useState(0);
  const[countryUnderscore, setCountryUnderscore]=useState("");
  const[correctAnswers, setCorrectAnswers]=useState(0);
  const [haveAnswer, setHaveAnswer] = useState(false);
  const [gameCount, setGameCount] = useState(0);
  const[scoreArray, setScoreArray] = useState([])
  const[countryMatchingPredText, setCountryMatchingPredText]=useState([])
  const[countryButtonVisible, setCountryButtonVisible] = useState(false)
  const [inputValue, setInputValue] = useState("");
  


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
    else if (icon === "practice") {
      console.log("practice");
  
      return (
        <>
        <Practice
        icon={icon}
        setIcon={setIcon}
    currentPracticeFlag={currentPracticeFlag}
    setCurrentPracticeFlag = {setCurrentPracticeFlag}
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
    else if (icon === "practiceFeedback") {
      console.log("practiceFeedback");
  
      return (
        <>
        <PracticeFeedback
        icon={icon}
        setIcon={setIcon}
        currentPracticeFlag={currentPracticeFlag}
        setCurrentPracticeFlag = {setCurrentPracticeFlag}
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
  // lastScreen={lastScreen}
   //setLastScreen={setLastScreen}
 
   
   />
</>

      )

    }
    else if (icon==="finish")
      return(<>
      <FinishGameScreen
      country={country}
      currentFlag = {currentFlag}
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
      scoreArray={scoreArray}
      setScoreArray={setScoreArray}
      //lastScreen={lastScreen}
      //setLastScreen={setLastScreen}
      
      />
      </>)

  };

  return (
    <>
   
      <SafeAreaProvider >
      <SafeAreaView 
  style={[s.app, { backgroundColor: icon === "practice" || icon === "practiceFeedback" ? "#e7feff" : "white" }]}
>
          <ScreenProvider>
          <View style={s.header}>
            <Header
              content={content}
              setContent={setContent}
              icon={icon}
              setIcon={setIcon}
            />
          </View>
          <View style={s.body}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {renderContent()}
            </ScrollView>
          </View>
          </ScreenProvider>
          <View style={s.footer}>
        <Text>Footer</Text>
      </View>
        </SafeAreaView>
      </SafeAreaProvider>

 
    </>
  );
}
