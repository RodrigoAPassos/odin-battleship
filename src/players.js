import gameboard from "./gameboard";

const player = () => {
    const Gameboard = gameboard();
    let legalMove;
    let lastHit = null;
    let firstHit = null;
    let tries = 0;

    const attackPlayer = (target, playerName) => {
        if (playerName.Gameboard.grid[target].wasShot == false) {
            let shot = playerName.Gameboard.receiveAttack(target);
            if (shot == "hit") return "valid hit attack";
            else return "valid miss attack"
        }else return "invalid attack"
    }

    const computerAttack = (targetPlayer) => {
        if (lastHit == null) {
            let randomTarget = Math.floor(Math.random() * 100);
            legalMove = attackPlayer(randomTarget, targetPlayer);
            if (legalMove == "valid hit attack") {
                lastHit = randomTarget;
                firstHit = randomTarget;
            } else {
                while (legalMove == "invalid attack"){
                    computerAttack(targetPlayer);
                }
            }
        }else {
            if (targetPlayer.Gameboard.grid[lastHit].shipName.isSunk() == false) {
                let legalTarget;
                switch (tries) {
                    case 0:
                        legalTarget = lastHit + 1;
                        legalTarget < 100 ? 
                        legalMove = attackPlayer(legalTarget, targetPlayer) : tries++;
                        if (legalMove == "valid hit attack") {
                            lastHit = legalTarget;
                        } else if (legalMove == "valid miss attack") {
                            tries++;
                        }else {
                            tries++;
                            computerAttack(targetPlayer);
                        }
                        break;
                    case 1:
                        legalTarget = firstHit - 1;
                        legalTarget < 100 && legalTarget >= 0 ? 
                        legalMove = attackPlayer(legalTarget, targetPlayer) : tries++;
                        if (legalMove == "valid hit attack") {
                            firstHit = legalTarget;
                        } else if (legalMove == "valid miss attack") {
                            tries++;
                        }else {
                            tries++;
                            computerAttack(targetPlayer);
                        }
                        break;
                    case 2:
                        legalTarget = lastHit + 10;
                        legalTarget < 100 ? 
                        legalMove = attackPlayer(legalTarget, targetPlayer) : tries++;
                        if (legalMove == "valid hit attack") {
                            lastHit = legalTarget;
                        } else if (legalMove == "valid miss attack") {
                            tries++;
                        }else {
                            tries++;
                            computerAttack(targetPlayer);
                        }
                        break;
                    case 3:
                        legalTarget = firstHit - 10;
                        if (legalTarget >= 0) {legalMove = attackPlayer(legalTarget, targetPlayer)};
                        if (legalMove == "valid hit attack") {
                            firstHit = legalTarget;
                        }
                        break;
                }
            }else {
                lastHit = null;
                firstHit = null;
                tries = 0;
                computerAttack(targetPlayer);
            };
        }
    }

    return {Gameboard, attackPlayer, computerAttack}
}

export default player;
//module.exports = player;