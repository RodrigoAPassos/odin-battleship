import gameLoop from "./game.js";

const start = (gameType) => {
    document.querySelector(".newGameBtn").innerHTML = "Restart";
    const playVs = document.querySelector(".playVs");
    playVs.style.visibility = "hidden";

    //start game
    gameLoop(gameType);
    
}

const gameOpt = () => {
    const playVs = document.querySelector(".playVs");
    playVs.style.visibility == "hidden" ? playVs.style.visibility = "visible" : playVs.style.visibility = "hidden";
}

const newGame = (() => {
    const playVs = document.querySelector(".playVs");
    playVs.style.visibility = "hidden";
    document.querySelector(".newGameBtn").addEventListener("click", gameOpt);
    document.querySelector("button.PvC").addEventListener("click", ()=> start("pvc"));
    document.querySelector(".PvP").addEventListener("click",()=> start("pvp"));
})();