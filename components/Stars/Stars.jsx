import {s} from "../../App.style.js";
import {Image, View} from "react-native";


export function Stars(){


    return(<>
       <View style={s.starsContainer}>
      {/* Render 5 stars */}
      {[...Array(5)].map((_, index) => (
        <Image
          key={index}
          source={require('../../assets/images/star.png')}
          style={s.star}
        />
      ))}
    </View>
    
    
    </>)
}