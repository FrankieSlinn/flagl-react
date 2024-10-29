import{TextInput, View, Text} from "react-native";
import {s} from "../../App.style.js";

import {flags} from '../../utils/countryTerritoryNames.js';

export function PracticeInput({practiceCountryButtonVisible, setPracticeCountryButtonVisible, 
    inputValue, setInputValue, countryMatchingPredText, setCountryMatchingPredText, icon, setIcon}){

    function populateCountryArray(inputValue){
        
     

        console.log("practice countrybutton visible in Input", practiceCountryButtonVisible)

        let arrayFlagNames=[]
        let lowerCaseInput = String(inputValue).toLowerCase();
    
        let inputLength = lowerCaseInput.length;
     
        console.log("inputLength", inputLength);
        for(i=0; i<flags.length; i++){
        if(lowerCaseInput===flags[i].substring(0,inputLength).toLowerCase()){
            arrayFlagNames.push(flags[i])


        }}
        console.log("matching flag Names in array for pred text", arrayFlagNames);

          // Slice the array to keep only the first 5 elements
          if (arrayFlagNames.length > 5) {
            arrayFlagNames = arrayFlagNames.slice(0, 5);
        }
        
        // Set the reduced array into state
        setCountryMatchingPredText(arrayFlagNames);
 
        console.log("matching flag Names reduced to 5", arrayFlagNames);

        
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