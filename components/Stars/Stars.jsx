import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { s } from "../../App.style.js";

import { StarIcon } from "react-native-heroicons/outline";



export function Stars({ correctAnswers, setCorrectAnswers, turns, setTurns }) {




  // console.log("correctAnswers in Star", correctAnswers)

  return (<>
  
    <View style={s.starsContainer}>
      {/* Render 5 stars */}
      {[...Array(5)].map((_, index) => (
 
        <StarIcon 
       key={index}
       fill={index <correctAnswers 
          ? "yellow" : "white"}
        style={s.star}
       
        size={40} 
       

         />
      ))}
    </View>
    </>
  );
}
