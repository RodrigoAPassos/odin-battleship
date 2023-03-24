import player from "./players";
import displayBoards from "./dom";


const gameLoop = (gameType) => {
    const player1 = player();//player
    const player2 = player();//computer or player

    gameType === "pvc" ? displayBoards(player1, player2, "pvcPlace") : displayBoards(player1, player2, "pvpPlace");
    
};

export default gameLoop;
//module.exports = gameLoop;