import gameLoop from "./game.js";

const start = () => {
    document.querySelector(".newGameBtn").removeEventListener("click", start);
    document.querySelector(".newGameBtn").innerHTML = "Restart";
    //document.querySelector(".newGameBtn").addEventListener("click", newGame);

    //start game
    gameLoop();
    
}

const newGame = (() => {
    document.querySelector(".newGameBtn").addEventListener("click", start);
})();