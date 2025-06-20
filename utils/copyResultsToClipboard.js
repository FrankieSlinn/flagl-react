
import * as Clipboard from "expo-clipboard";

export const copyResultsToClipboard = async (resultsArray, daysElapsed) => {
  console.log("copyResultsToClipboard function running");
  try {
    // Check if resultsArray is an array and not undefined
    if (!Array.isArray(resultsArray)) {

      throw new Error("Invalid resultsArray data");
    }

    // Map results to Unicode symbols
    const mappedResults = resultsArray.map((result) => {
      if (result === "right") return "\u2705"; // ✅
      if (result === "wrong") return "\u274C"; // ❌
      return ""; // Default for unexpected values
    });

    // Join the results into a single string
    const resultsString = mappedResults.join(" ");

    // Create the content directly without centering
    const flaglWithDays = `FLAGL ${daysElapsed}`;
   

    // Combine all components
    const contentToCopy = `\n${flaglWithDays}\n\n${resultsString}\n\n`;

    // Debugging: Log final content
    console.log("Content to Copy:", contentToCopy);

    // Copy the string to the clipboard
    await Clipboard.setStringAsync(contentToCopy);

    alert(`Results copied to clipboard:\n${contentToCopy}`);
  } catch (error) {
    console.error("Failed to copy results to clipboard:", error);
    alert("Failed to copy results to clipboard.");
  }
};

