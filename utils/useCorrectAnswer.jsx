import { useEffect, useState } from "react";

export const useCorrectAnswer = (countryUnderscore, currentFlag, score, setScore, correctAnswers, setCorrectAnswers, turns) => {
  
  // Function for handling correct answer
  const handleCorrectAnswer = () => {
    console.log("handleCorrectAnswer to add to score running");
    setScore((prevScore) => prevScore + 20); // Increase the score by 20
    console.log("score updated", score);
    console.log("correct answer in useCorrectAnswer before increase in correct answer function", correctAnswers)
   // setCorrectAnswers((prevCorrectAnswers)=>prevCorrectAnswers+1);
    console.log("correct answer in useCorrectAnswer", correctAnswers)
  };

  // Effect to check if countries match and update the score
  // useEffect(() => {
  //   if (countryUnderscore === currentFlag) {
  //     console.log("Countries match, adding to score");
  //     handleCorrectAnswer(countryUnderscore, currentFlag, score, setScore, correctAnswers, setCorrectAnswers, turns);
  //   }
  // }, [turns]);

  return useCorrectAnswer;
};
