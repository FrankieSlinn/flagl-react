import{TextInput, View, Text} from "react-native";
import {s} from "../../App.style.js";

import {flags} from '../../utils/countryTerritoryNames.js';

export function PracticeInput({practiceCountryButtonVisible, setPracticeCountryButtonVisible, 
setInputValue,  setCountryMatchingPredText}){

    function populateCountryArray(inputValue){
        let arrayFlagNames=[]
        let lowerCaseInput = String(inputValue).toLowerCase();
        let inputLength = lowerCaseInput.length;
        for(i=0; i<flags.length; i++){
        if(lowerCaseInput===flags[i].substring(0,inputLength).toLowerCase()){
            arrayFlagNames.push(flags[i])
        }}


          // Slice the array to keep only the first 5 elements
          if (arrayFlagNames.length > 5) {
            arrayFlagNames = arrayFlagNames.slice(0, 5);
        }
        
        // Set the reduced array into state
        setCountryMatchingPredText(arrayFlagNames);  
    }

    
    

return(<>
<View style = {s.inputContainer}>
<TextInput 
style={s.inputText}
placeholder = "Type and buttons will appear"
onChangeText = {(practiceText)=>{
setInputValue(practiceText);
setPracticeCountryButtonVisible(practiceText.length > 0); 
console.log("practice country button in input just after change visible?", practiceCountryButtonVisible)
populateCountryArray(practiceText);
}

}

/>

</View>



</>)

}