import { Text, View, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { s } from "../../App.style.js";
import { useScreenContext } from "../../utils/helpLastScreen";
import { returnToGameMode } from "../../utils/returnToGameMode.js";

export function PracticeFeedback({
  icon,
  setIcon,
  currentPracticeFlag,
  practiceCountry,
  setPracticeCountry,
  practiceCountryUnderscore,
  setPracticeCountryUnderscore,
  setPracticeHaveAnswer,
  practiceCountryButtonVisible,
  setPracticeCountryButtonVisible,

}) {
console.log("practiceCountryButtonVisible", practiceCountryButtonVisible)

  const { lastScreen, setLastScreen } = useScreenContext();

  useEffect(() => {
    setLastScreen("practiceFeedback");
    console.log("last screen practiceFeedback");
  }, []);

  useEffect(() => {
    const practiceCountryUnderscore = practiceCountry.replace(" ", "_");
    setPracticeCountryUnderscore(practiceCountryUnderscore);
    setPracticeCountryButtonVisible(false);
    
  }, []);

  function handleFeedbackButtonPress() {
    setPracticeCountry("");
    setPracticeHaveAnswer(false);
    setPracticeCountryUnderscore("");
    setIcon("practice");
    console.log("icon after have another go pressed", icon);
  }
  return (
    <>
      <View style={s.mainContent}>
        <Text style={s.mainContentText}>
          {practiceCountryUnderscore === currentPracticeFlag.replace(" ", "_")
            ? `Congratulations. You Are Right. The Answer Is ${currentPracticeFlag}.`
            : `Unlucky. That Was Not Correct. The Answer Is ${currentPracticeFlag}.`}
          {"\n"}
        </Text>

        <TouchableOpacity
          style={s.newTurnPractice}
          onPress={handleFeedbackButtonPress}
        >
          <Text style={s.countryButtonText}>Have Another Go</Text>
        </TouchableOpacity>

        <View style={s.practiceButtonContainer}>
          <TouchableOpacity
            style={s.practiceButton}
            onPress={() => returnToGameMode(setIcon)}
          >
            <Text style={s.shareScoreButtonText}>Go To Game Mode</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
