//go to correct game mode screen determined by turn
function returnToGameMode() {
    const loadTurns = async () => {
      try {
        const turnCount = await getStoredTurns();
        console.log("turnCount in practice to go back to game mode", turnCount);
        if (turnCount >= 4) {
          setIcon("finish");
        } else {
          setIcon("");
        }
      } catch (error) {
        console.error("Error loading turns", error);
      }
    };
    loadTurns();
  }




export{
   returnToGameMode
  }