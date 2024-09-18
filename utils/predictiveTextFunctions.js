function predictiveText(textInputted) {
    //listener for when a user types a letter
    console.log("textInputted: ", textInputted);
  
     // textInputted.value = textInputted.value[0].toUpperCase().concat(textInputted.value.slice(1));
      console.log(textInputted, textInputted.value)
      //console.log("textInputted displayed", textInputted.value[0].toUpperCase());
      //ensures country buttons are displayed
      //countryOptionButtons.style["display"] = "inline";
      //get input text in lower case
      let lowerCasePredText = String(
        textInputted
      ).toLowerCase();
      console.log("lowerCasePredText", lowerCasePredText)
      //If predictive text matches add country to  countryMatchingPredText array
      //ifPredTextMatchesCountryAddToArray(lowerCasePredText);
      //if input text is equal to those letters in a country return that country in next filter function
      //countryMatchingPredText = countryMatchingPredText.filter((item) =>
       // matchLowerCasePredTextToCountryInArray(item, lowerCasePredText)
     // );
     // console.log("countryMatchingPredText: " + countryMatchingPredText);
     // defineButtonText();
    
  }

  function countryMatchingPredTextEmpty()
  {
  setInputValue("");

}

  export {predictiveText};