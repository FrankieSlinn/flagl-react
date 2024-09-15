import {Image, TouchableOpacity, Text} from "react-native";
import {s} from "../../App.style.js";


export function CloseButton({onPress}){
return(<>

<TouchableOpacity onPress={onPress} 
style={s.closeButton}
>
          <Text style={s.close}>Close</Text>
        </TouchableOpacity>
</>

);
}
