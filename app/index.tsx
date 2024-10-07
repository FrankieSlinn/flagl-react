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
import { CloseButton } from "../components/CloseButton/CloseButton";
import { Stats } from "../components/Stats/Stats";
import { MainContent } from "../components/MainContent/MainContent";
import { FeedbackScreen } from "../components/FeedbackScreen/FeedbackScreen";
import {FinishGameScreen} from "../components/FinishGameScreen/FinishGameScreen";
import { useState } from "react";

export default function Index() {
  const [content, setContent] = useState("This is the default content");
  const [icon, setIcon] = useState("");
  const[currentFlag, setCurrentFlag] = useState("");
  const [country, setCountry] = useState("");
  const [turns, setTurns] = useState(0);
  const [arrayDailyFlags, setArrayDailyFlags] = useState([]);
  const [score, setScore] = useState(0);
  const[countryUnderscore, setCountryUnderscore]=useState("");
  const[correctAnswers, setCorrectAnswers]=useState(0);
  const [haveAnswer, setHaveAnswer] = useState(false);
  const [gameCount, setGameCount] = useState(0);
  


  const renderContent = () => {
    if (icon === "help") {
      console.log("help");
      return (
        <>
        <View style={s.closeButtonContainer}>
          <CloseButton 
          onPress={() => setIcon("")} />
          </View>
          <Text style={s.iconHeader}>The Daily Flag Quiz</Text>
          <Text style={s.helpBody}>
            {"\n"}
            <Text style={s.helpGuess}>Guess the Flag</Text>
            {"\n"}
            {"\n"}Every day you will see the same flags as all the other FLAGL
            players. The goal of course is to correctly identify as many flags
            as you can. All you need to do is to start typing in the box under
            the flag to get a list of countries and territories. Click on one of
            the country or territory buttons to make your choice.
            {"\n\n"}
            At the end of the flag quiz you will see what percentage of flags
            you got right. The statistics section on the top right shows your
            average score per game so you can see if you're improving. Share and
            compare your score with friends by selecting the "Share Results"
            button in the statistics section. {"\n"}
            They might be wowed by your flag guessing ability. Or maybe not.
            There's only one way of telling.
            {"\n"}
            {"\n"}
            Does this format look familiar? The game is inspired by the
            brilliant game Worlde created by the talented Josh Wardle.
            {"\n"}
            {"\n"}
            Want to get better at guessing flags? Try:{" "}
            <Text
              style={s.link}
              onPress={() => Linking.openURL("../html/practice.html")}
            >
              Practice FLAGL
            </Text>
            .{"\n\n"}
            For a wider geography quiz see:{" "}
            <Text
              style={s.link}
              onPress={() => Linking.openURL("https://geografiend.com/")}
            >
              geografiend.com
            </Text>
            .{"\n\n"}
            Love tough word games? Go to:{" "}
            <Text
              style={s.link}
              onPress={() => Linking.openURL("https://wordominoes.net/")}
            >
              wordominoes.net
            </Text>
            .
          </Text>
        </>
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
        gameCount={gameCount}
        setGameCount={setGameCount}
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
      
      />
      </>)

  };

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
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
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <Text>Footer</Text>
      </View>
    </>
  );
}
