import {StyleSheet} from "react-native";



export const s = StyleSheet.create({

    app:{
  flex:1,
        backgroundColor: "#f9f9f9", 
        padding: 15,
        color: "#353839",
        fontSize: 20, // Roughly equivalent to 1.25rem (20px)
        backgroundColor: "white", // Background color for text container
        fontFamily: "Arial", // Font family
        letterSpacing: -0.08, // Letter spacing in pixels (React Native uses px by default)
    }, 


    header:{
        flex: 1,
        height:70,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'baseline', 


    },
    body:{
        marginTop: -50,
        flex:5,
        padding: 16,
        textAlign: "center",


    },
    link:{
        color: 'blue',
        textDecorationLine: 'underline',

    },
    iconHeader:{
        fontWeight:"bold",
        fontSize:20,
        textAlign: "center",
    
        },
helpGuess:{
    fontWeight:"bold",

},
helpBody:{
    textAlign: "center",
    fontSize: 18.4,

},
closeButtonContainer:{
    flexDirection: 'row',
    justifyContent: 'flex-end', // Aligns the button to the right

},
closeButton:{
    padding: 10,
    backgroundColor: '#ADD8E6', // Light blue color
    borderRadius: 50, // Circular button
  
},
close:{
    fontWeight: 'bold',
    
  
},
   footer:{
 
    height:70,
    backgroundColor: "white",
  


    },

});