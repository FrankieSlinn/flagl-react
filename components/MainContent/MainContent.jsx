import {s} from "../../App.style.js";
import{Text} from "react-native";
import {useState, useEffect} from "react";
import {StatsIcon} from "../StatsIcon/StatsIcon";
import {Stars} from "../Stars/Stars";
import {generate_seed,
    random_number, generateNewFlagsToPopulateArrayDailyFlags} from "../../utils/practiceAndDaily.js";


export function MainContent(){

    // State to hold the generated flags
    const [arrayDailyFlags, setArrayDailyFlags] = useState([]);
  
    // Generate flags on component mount using useEffect
    useEffect(() => {
      const newFlags = generateNewFlagsToPopulateArrayDailyFlags();
      setArrayDailyFlags(newFlags);
    }, []);

    return(<>
   
             <Stars/>
             <Text style={s.question}>Which Country or Territory Does this Flag Belong to?</Text>
               {/* Display the flags */}
      {arrayDailyFlags.length >0? (
        arrayDailyFlags.map((flag, index) => (
          <Text key={index} style={s.flagText}>Flag {index + 1}: {flag}</Text>
        ))
      ) : (
        <Text>Loading flags...</Text>
  
      )}
    
    </>)
}