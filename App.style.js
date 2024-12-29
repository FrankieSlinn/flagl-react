import { StyleSheet, Dimensions } from "react-native";

export const s = StyleSheet.create({
  app: {
    flex: 1,
    paddingTop: 15, // Add padding to the top
    paddingLeft: 15, // Add padding to the left
    paddingRight: 15,
    color: "#353839",
    fontSize: 30, // Roughly equivalent to 1.25rem (20px)
    backgroundColor: "white", // Background color for text container
    fontFamily: "Arial", // Font family
    letterSpacing: -0.08, // Letter spacing in pixels (React Native uses px by default)
  },

  header: {
    flex: 1,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  body: {
    marginTop: -50,
    flex: 6,
    paddingTop: 15, // Add padding to the top
    paddingLeft: 15, // Add padding to the left
    paddingRight: 15,
    textAlign: "center",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  iconHeader: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  helpGuess: {
    fontWeight: "bold",
  },
  helpBody: {
    textAlign: "center",
    fontSize: 18.4,
  },

  statsContainer:{
    flex: 1,
    flexDirection: "column",
   // justifyContent: "center",
  alignItems: "center",
 
    marginBottom: 40,

  },
  statsBody:{

   // borderWidth: 3, 
  borderColor: "#053e4c", 
  backgroundColor: "#e0e8e8",
  borderRadius: 15,  
  paddingTop: 20,
  paddingBottom: 20,
  padding: 10,  
width: 330,

  },
 statsText: {
    textAlign: "center",
    fontSize: 18.4,
    lineHeight: 18,
  },

  closeButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end", // Aligns the button to the right
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#ADD8E6", // Light blue color
    borderRadius: 15,  
  },
  close: {
    fontWeight: "bold",
  },

  mainContentText: {
    marginTop: 15,
    fontSize: 20,
    textAlign: "center",
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -5,
  },
  star: {
    color: "#a9a9a9",
  },

  flagImage: {
    marginTop: 20,
    width: 350,
    height: 200,
    flex: 1,
    justifyContent: "center",
  },
  inputView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    height: 40,
    width: 300,
    borderColor: "#353839", // Color of the border
    borderWidth: 2, // Border width
    borderRadius: 10, // Rounded corners
    fontSize: 20, // Font size
    textAlign: "center", //
  },
  inputText: {
    fontSize: 20, // Font size
  },
  countryButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    alignItems: "center",
  },
  countryButton: {
    backgroundColor: "#053e4c",
    paddingVertical: 10, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    borderRadius: 8, // Rounded corners
    borderWidth: 1, // Border width
    borderColor: "#388E3C", // Border color
    alignItems: "center", 
    margin: 3,
  },
  countryButtonText: {
    color: "#FFFFFF", // Text color
    fontSize: 16, // Text size
    fontWeight: "bold", // Bold text
  },

  timerContainer:{
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 3, 
  borderColor: "#053e4c", 
  backgroundColor: "#e0e8e8",
  borderRadius: 15,  // Optional: Set rounded corners if needed
  padding: 10,  // Optional: Add padding inside the container
  height: 100,



  },

  shareScoreButtonContainer: {

    flex: 1,
    flexDirection: "column",
   //flexWrap: "wrap",
    justifyContent: "center",
   // marginTop: 10,
    marginBottom: 20, 
    alignItems: "center",
  
  },

  shareScoreButton: {
  
    width: 200,
    backgroundColor: "#053e4c",
    paddingVertical: 10, // Vertical padding
    paddingHorizontal: 20,
    borderRadius: 15, // Rounded corners
    borderWidth: 1, // Border width
    borderColor: "#388E3C", // Border color
    alignItems: "center", // Center the text inside the button
   marginTop: -15,
  },
  shareScoreButtonText: {
    color: "#FFFFFF", // Text color
    fontSize: 16, // Text size
    fontWeight: "bold", // Bold text
  },

 practiceButtonContainer: {

    flex: 1,
    flexDirection: "column",
   //flexWrap: "wrap",
    justifyContent: "center",
   // marginTop: 10,
    marginBottom: 20, 
    alignItems: "center",
  
  },

  practiceText:{
    marginTop: 15,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold"

  },

  practiceButton:{
    width: 200,
    backgroundColor: "#053e4c",
    paddingVertical: 10, // Vertical padding
    paddingHorizontal: 20,
    borderRadius: 15, // Rounded corners
    borderWidth: 1, // Border width
    borderColor: "#388E3C", // Border color
    alignItems: "center", // Center the text inside the button
   // margin: 3,
   marginTop: 17,


  },

  practiceHeading: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    fontFamily: "Arial",
  },
  practiceHeadingTitle: {
    fontSize: 25,
    padding: 15,
  },
  scoreText: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },

  footer: {
    height: 15,
    backgroundColor: "orange",
  },
});
