import { s } from "../../App.style.js";
import {View, Text} from "react-native";
import { Stars } from "../Stars/Stars";

export function FeedbackScreen(){

    return(
        <>
             <View style={s.mainContent}>
<Stars />
<Text style={s.mainContentText}>
        Feedback
      </Text>
      <Text style={s.mainContentText}>
        The correct answer is....
      </Text>
</View>
        
        
        </>



    )
}