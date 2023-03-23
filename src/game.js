import player from "./players";
import displayBoards from "./dom";


const gameLoop = (gameType) => {
    const player1 = player();
    const player2 = player();//computer

    displayBoards(player1, player2, "pvcPlace");
    
};

export default gameLoop;
//module.exports = gameLoop;