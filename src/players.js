import gameboard from "./gameboard";

const player = () => {
    const Gameboard = gameboard();
    let lastHit = null;
    let firstHit = null;
    let tries = 0;

    const attackPlayer = (target, playerName) => {
        if (target>=0 && target<100 && playerName.Gameboard.grid[target].wasShot == false) {
            let shot = playerName.Gameboard.receiveAttack(target);
            if (shot == "hit") return "valid hit attack";
            else return "valid miss attack"
        }else return "invalid attack"
    }

    const computerAttack = (targetPlayer) => {
        if (lastHit == null) {
            let randomTarget = Math.floor(Math.random() * 100);
            let legalMove = attackPlayer(randomTarget, targetPlayer);
            if (legalMove == "valid hit attack") {
                lastHit = randomTarget;
                firstHit = randomTarget;
            }
            while (legalMove == "invalid attack"){
                randomTarget = Math.floor(Math.random() * 100);
                legalMove = attackPlayer(randomTarget, targetPlayer);
            }
        }else {
            if (targetPlayer.Gameboard.grid[lastHit].shipName.isSunk() == false) {
                switch (tries) {
                    case 0:
                        let legalMove = attackPlayer(lastHit + 1, targetPlayer);        
                        if (legalMove == "valid hit attack") {lastHit += 1;} else tries++;
                        break;
                    case 1:
                        legalMove = attackPlayer(firstHit - 1, targetPlayer);
                        if (legalMove == "valid hit attack") {lastHit = firstHit - 1;} else tries++;
                        break;
                    case 2:
                        legalMove = attackPlayer(lastHit + 10, targetPlayer);
                        if (legalMove == "valid hit attack") {lastHit += 10;} else tries++;
                        break;
                    case 3:
                        legalMove = attackPlayer(firstHit - 10, targetPlayer);
                        if (legalMove == "valid hit attack") {lastHit = firstHit - 10; tries = 0} else {tries = 0; lastHit = null};
                        break;
                    default:
                        break;
                }
            }else {
                lastHit = null;
                tries = 0;
                computerAttack(targetPlayer);
            };
        }
    }

    return {Gameboard, attackPlayer, computerAttack}
}

export default player;
//module.exports = player;