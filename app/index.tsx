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

import { MainContent } from "../components/MainContent/MainContent";
import { useState } from "react";

export default function Index() {
  const [content, setContent] = useState("This is the default content");
  const [icon, setIcon] = useState("help");

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
        <>
            <View style={s.closeButtonContainer}>
        <CloseButton onPress={() => setIcon("")} />
        </View>
          <Text style={s.iconHeader}>FLAGL Statistics</Text>
        </>
      );
    } else if (icon === "") {
      console.log("main");
  
      return (
        <>
        <MainContent/>
        
        {}
 
        </>
      );
    }
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
