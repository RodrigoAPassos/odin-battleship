import gameLoop from "./game.js";

const start = () => {
    document.querySelector(".newGameBtn").innerHTML = "Restart";

    //start game
    gameLoop();
    
}

const newGame = (() => {
    document.querySelector(".newGameBtn").addEventListener("click", start);
})();