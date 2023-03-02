import player from "./players";

const gameLoop = (() => {
    const player1 = player();
    const player2 = player();

    //Add ships for player1
    player1.grid.place(4, "v", "patrol");
    player1.grid.place(0, "h", "submarine");
    player1.grid.place(14, "v", "destroyer");
    player1.grid.place(74, "h", "battleship");
    player1.grid.place(54, "h", "carrier");


})();