
import { getStoredTurns } from "./asyncStorageUtils.js";
  function returnToGameMode(setIcon) {
    const loadTurns = async () => {
      try {
        const turnCount = await getStoredTurns();
        console.log("turnCount in practice to go back to game mode", turnCount);
          setIcon("finish");
      } catch (error) {
        console.error("Error loading turns", error);
      }
    };
    loadTurns();
  }




export{
   returnToGameMode
  }