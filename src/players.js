import gameboard from "./gameboard";

const player = () => {
    const Gameboard = gameboard();

    const attackPlayer = (target, playerName) => {
        if (playerName.Gameboard.grid[target].wasShot == false) {
            playerName.Gameboard.receiveAttack(target);
            return "valid attack";
        }else return "invalid attack"
    }

    /* const computerAttack = () => {
        const randomTarget = Math.floor(Math.random() * 100);
        const legalMove = attackPlayer(randomTarget);
        while (legalMove == "invalid attack"){
            randomTarget = Math.floor(Math.random() * 100);
            legalMove = attackPlayer(randomTarget);
        }
    } */

    return {Gameboard, attackPlayer}
}

module.exports = player;