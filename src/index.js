import gameLoop from "./game.js";

const start = (gameType) => {
    const newGameBtn = document.querySelector(".newGameBtn");
    newGameBtn.innerHTML = "Restart";
    newGameBtn.removeEventListener("click", gameOpt);
    newGameBtn.addEventListener("click", function restartGame () {
        location.reload();
    })
    
    const playVs = document.querySelector(".playVs");
    playVs.style.display = "none";

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
    document.querySelector("button.PvP").addEventListener("click", ()=> start("pvp"));
})();