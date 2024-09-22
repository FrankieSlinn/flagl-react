import { Text, View, TouchableOpacity } from "react-native";
import { s } from "../../App.style.js";

export function CountryButton({ countryMatchingPredText, setCountryMatchingPredText, icon, setIcon, currentFlag, setCurrentFlag, country, setCountry }) {

    function setIconToFeedback() {
        setIcon("feedback");
    }

    function handleButtonPress(country) {
        setIconToFeedback();    // Set the icon to "feedback"
        setCountry(country);    // Set the selected country
    }

    function mapCountryArrayToButtons(countryMatchingPredText) {
        if (countryMatchingPredText.length > 0) {
            return countryMatchingPredText.map((country, index) => (
                <View key={index} style={s.countryButtonContainer}>
                    <TouchableOpacity 
                        style={s.countryButton} 
                        activeOpacity={0.7} // Optional: Improve responsiveness with opacity feedback
                        onPress={() => handleButtonPress(country)}
                    >
                        <Text style={s.countryButtonText}>
                            {country} {/* Display the country name */}
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
