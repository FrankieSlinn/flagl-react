import{TextInput, View, Text} from "react-native";
import {s} from "../../App.style.js";
import {predictiveText} from '../../utils/predictiveTextFunctions.js';

export function Input({countryButtonVisible, setCountryButtonVisible, inputValue, setInputValue}){


return(<>
<View style = {s.inputContainer}>
<TextInput 
style={s.inputText}
placeholder = "Type and buttons will appear"

onChangeText = {(text)=>{
setInputValue(text);
setCountryButtonVisible(text.length > 0);
console.log("text", text);
predictiveText(text);



}

}

/>

</View>



</>)

}