import player from "./players";
import displayBoards from "./dom";

const gameLoop = () => {
    const player1 = player();
    const player2 = player();
    let ended = false;

    //Add ships for player1
    player1.grid.place(4, "v", "patrol");
    player1.grid.place(0, "h", "submarine");
    player1.grid.place(14, "v", "destroyer");
    player1.grid.place(74, "h", "battleship");
    player1.grid.place(54, "h", "carrier");

    //Add ships for player2
    player2.grid.place(4, "v", "patrol");
    player2.grid.place(0, "v", "submarine");
    player2.grid.place(14, "h", "destroyer");
    player2.grid.place(74, "h", "battleship");
    player2.grid.place(54, "h", "carrier");

    displayBoards(player1, player2);

    /* while(ended == false) {

    } */
    
};

export default gameLoop;
//module.exports = gameLoop;