import player from "./players";
import displayBoards from "./dom";


const gameLoop = () => {
    const player1 = player();
    const player2 = player();//computer

    //Add ships for player1
    player1.Gameboard.place(4, "v", "patrol");
    player1.Gameboard.place(0, "h", "submarine");
    player1.Gameboard.place(31, "v", "destroyer");
    player1.Gameboard.place(74, "h", "battleship");
    player1.Gameboard.place(54, "h", "carrier");

    //Add ships for player2
    player2.Gameboard.place(4, "v", "patrol");
    player2.Gameboard.place(0, "v", "submarine");
    player2.Gameboard.place(24, "h", "destroyer");
    player2.Gameboard.place(74, "h", "battleship");
    player2.Gameboard.place(54, "h", "carrier");

    displayBoards(player1, player2);
    
};

export default gameLoop;
//module.exports = gameLoop;