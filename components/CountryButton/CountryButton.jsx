import { Text, View, TouchableOpacity } from "react-native";
import { s } from "../../App.style.js";

export function CountryButton({ countryMatchingPredText, setCountryMatchingPredText , icon, setIcon}) {


    function mapCountryArrayToButtons(countryMatchingPredText) {


        if (countryMatchingPredText.length > 0) {
            return countryMatchingPredText.map((country, index) => (
                <View key={index} style={s.countryButtonContainer}>
                    <TouchableOpacity style={s.countryButton} onPress={setIcon("feedback")}>
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
