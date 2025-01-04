import { StyleSheet, Dimensions } from "react-native";

export const s = StyleSheet.create({
  app: {
    flex: 1,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    color: "#353839",
    fontSize: 30, // Roughly equivalent to 1.25rem (20px)
    backgroundColor: "white",
    fontFamily: "Arial",
    letterSpacing: -0.08,
    marginTop: 70,
  },

  header: {
    flex: 1,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 10,
  },
  body: {
    marginTop: -50,
    flex: 6,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "contain",

    width: "100%",
  },
  blurView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  iconHeader: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginTop: 12,
    marginBottom: -2,
  },
  helpGuess: {
    fontWeight: "bold",
  },
  helpBody: {
    textAlign: "center",
    fontSize: 18.4,
  },

  statsContainer: {
    flex: 1,
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",

    marginBottom: 40,
  },
  statsBody: {
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
    marginTop: 20,
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
  flagImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  flagImage: {
    marginTop: 20,
    width: 350,
    height: 200,
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#388E3C",
    alignItems: "center",
    margin: 3,
  },
  countryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  newTurn: {
    backgroundColor: "#053e4c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#388E3C",
    alignItems: "center",
    margin: 3,
  },

  newTurnPractice: {
    backgroundColor: "#053e4c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 1,

    alignItems: "center",
    marginBottom: 12,
    margin: 3,
  },

  timerContainer: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#053e4c",
    backgroundColor: "#e0e8e8",
    borderRadius: 15,
    paddingTop: 3,
    padding: 10,
    height: 100,
  },

  shareScoreButtonContainer: {
    flex: 1,
    flexDirection: "column",

    justifyContent: "center",

    marginBottom: 20,
    alignItems: "center",
  },

  shareScoreButton: {
    width: 200,
    backgroundColor: "#053e4c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#388E3C",
    alignItems: "center",
    marginTop: -15,
  },
  shareScoreButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
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

  practiceText: {
    marginTop: 15,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },

  practiceButton: {
    width: 200,
    backgroundColor: "#053e4c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#388E3C",
    alignItems: "center",

    marginTop: 17,
  },

  practiceHeading: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial",

    marginTop: -10,
    marginBottom: -19,
  },
  practiceHeadingTitle: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 15,
  },
  scoreText: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },
  footer: {
    height: 80,
  },

  footerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  footerText: {
    fontSize: 17,
    textAlign: "center",
    marginBottom: 12,
  },

  footerLink: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
