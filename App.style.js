import {StyleSheet} from "react-native";



export const s = StyleSheet.create({

    app:{
  flex:1,
    
        padding: 15,
        color: "#353839",
        fontSize: 30, // Roughly equivalent to 1.25rem (20px)
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
        flex:6,
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

mainContentText:{
    marginTop: 15,
    fontSize:20,
    textAlign: 'center',

},
starsContainer:{
    flexDirection: "row",
    justifyContent: "center",
    marginTop:-5,

},
star:{
  color: "#a9a9a9",




  },

flagImage:{
    marginTop: 20,
    width: 350,
    height: 200,
    flex: 1,
    justifyContent: "center",


},
inputView:{

    flex:1,
    flexDirection: "row",
    justifyContent: "center",

},
inputContainer:{
    flex:1,
    justifyContent: "center",
    alignItems: "center",

    marginTop:20,
    height: 40,
    width: 300,
    borderColor: "#353839",// Color of the border
    borderWidth: 2, // Border width
    borderRadius: 10, // Rounded corners

    fontSize: 20, // Font size
    textAlign: 'center', //

},
inputText:{
    fontSize: 20, // Font size

},
countryButtonContainer: {
    marginTop: 20, // Adjust as necessary
    alignItems: 'center', // Center the button horizontally
  },
  countryButton: {
    backgroundColor:"#053e4c",// Button background color
    paddingVertical: 10, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    borderRadius: 8, // Rounded corners
    borderWidth: 1, // Border width
    borderColor: '#388E3C', // Border color
    alignItems: 'center', // Center the text inside the button
  },
  countryButtonText: {
    color: '#FFFFFF', // Text color
    fontSize: 16, // Text size
    fontWeight: 'bold', // Bold text
  },
  scoreText:{
    fontWeight: 'bold', 
    fontSize:25,
    textAlign: 'center',

  },

   footer:{
 
    height:70,
    backgroundColor: "white",
    },


});