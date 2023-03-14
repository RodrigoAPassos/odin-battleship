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
    //playVs.style.visibility == "hidden" ? playVs.style.visibility = "visible" : playVs.style.visibility = "hidden";
    if (playVs.style.visibility == "hidden") {
        playVs.style.visibility = "visible";
        //document.querySelector("button.PvC").addEventListener("click", ()=> start);
        //document.querySelector(".PvP").addEventListener("click", start("pvp"));
    }else {
        playVs.style.visibility = "hidden";
        //document.querySelector("button.PvC").removeEventListener("click", ()=> start);
        //document.querySelector(".PvP").removeEventListener("click", start("pvp"));
    }
}

const newGame = (() => {
    const playVs = document.querySelector(".playVs");
    playVs.style.visibility = "hidden";
    document.querySelector(".newGameBtn").addEventListener("click", gameOpt);
})();