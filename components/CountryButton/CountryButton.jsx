import {Text, View, TouchableOpacity } from "react-native";
import {s} from "../../App.style.js";

export function CountryButton(){

    return(<>
    <View style={s.countryButtonContainer}>
        <TouchableOpacity style={s.countryButton}>
            <Text style={s.countryButtonText}>
                Placeholder for CountryButton
            </Text>
        </TouchableOpacity>
    </View>
    
    
    </>)
}