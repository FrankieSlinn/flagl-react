import { Text, View, TouchableOpacity } from "react-native";
import { useEffect, useCallback, useState } from "react";
import { s } from "../../App.style.js";

export function CountryButton({ 
    countryMatchingPredText, setCountryMatchingPredText, icon, setIcon, 
    currentFlag, setCurrentFlag, country, setCountry, turns, setTurns, 
    countryUnderscore, setCountryUnderscore, arrayDailyFlags, score, setScore, 
    correctAnswers, setCorrectAnswers, haveAnswer, setHaveAnswer}) {
   

    const updateCountryUnderscore = useCallback((country) => {
        const countryWithUnderscore = country.replaceAll(" ", "_");
        // Only update if the value is actually different
        setCountryUnderscore((prev) => {
            if (prev !== countryWithUnderscore) {
                console.log("Updated countryUnderscore:", countryWithUnderscore);
                return countryWithUnderscore;
            }
            return prev;  // Don't update if it's the same value
        });
    }, []);

    // Effect to update countryUnderscore when country state changes
    useEffect(() => {

        "useEffect meant to be based on country changing"
        if (country) {
            updateCountryUnderscore(country);
        }
    }, [country]);

    // Effect to compare countryUnderscore with currentFlag after both are updated
    useEffect(() => {
        console.log("useEffect meant to be after countryUnderscore change")
        if(countryUnderscore!="" && icon ===""){
            console.log("useEffect after previous ones triggered", countryUnderscore);
            setHaveAnswer(true);
        // Set the icon to "feedback"
      
        if (countryUnderscore === currentFlag && countryUnderscore!== "") {
            console.log("Correct Answer!!!!!!!!!");
            setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers + 1);
            setScore((prevScore) => prevScore + 20); // Increase the score by 20
            console.log("score updated", score);
        }}
       
    }, [countryUnderscore]);


    useEffect(() => {
        // Adding a small timeout to wait for state changes to propagate
        const timeout = setTimeout(() => {
            console.log("Checking if we should switch to feedback screen");
            console.log("haveAnswer:", haveAnswer, "countryUnderscore:", countryUnderscore, "country:", country);
    
            if (haveAnswer === true && countryUnderscore !== "" && country !== "") {
                console.log("Setting icon to feedback");
                setIcon("feedback");
            }
        }, 0); // Run in the next event loop tick
    
        return () => clearTimeout(timeout); // Cleanup the timeout when the effect is rerun
    }, [haveAnswer, country, countryUnderscore]);

    // Function to handle button press and update the country state
    function handleButtonPress(selectedCountry) {
        setCountry(selectedCountry);  // Update country, triggers the useEffect to update countryUnderscore
        console.log("Button pressed, country updated to:", selectedCountry);
     
       
      
        
    }

    // Function to map country array to buttons
    function mapCountryArrayToButtons(countryMatchingPredText) {
        if (countryMatchingPredText.length > 0) {
            return countryMatchingPredText.map((country, index) => (
                <View key={index} style={s.countryButtonContainer}>
                    <TouchableOpacity 
                        style={s.countryButton} 
                        activeOpacity={0.7} 
                        onPress={() => handleButtonPress(country)}
                    >
                        <Text style={s.countryButtonText}>
                            {country}
                        </Text>
                    </TouchableOpacity>
                </View>
            ));
        } else {
            return null;
        }
    }

    return (
        <>
            {mapCountryArrayToButtons(countryMatchingPredText)}
        </>
    );
}
