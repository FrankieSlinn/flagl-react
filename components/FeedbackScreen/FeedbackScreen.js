import { s } from "../../App.style.js";
import {View, Text} from "react-native";
import { Stars } from "../Stars/Stars";

export function FeedbackScreen({currentFlag, setCurrentFlag, country, setCountry}){
  console.log("country", country.country);
  console.log("currentFlag", currentFlag);



    return(
        <>
             <View style={s.mainContent}>
<Stars />
<Text style={s.mainContentText}>
        Feedback
      </Text>
      
      <Text style={s.mainContentText}>
      {country.country === currentFlag
                        ? `Congratulations. You Are Right. The Answer Is${currentFlag}.`
                        : `Unlucky. That Was Not Correct. The Answer Is ${currentFlag}.`}
      </Text>
</View>
        
        
        </>



    )
}