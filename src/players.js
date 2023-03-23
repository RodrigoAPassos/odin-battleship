import gameboard from "./gameboard";

const player = () => {
    const Gameboard = gameboard();
    let legalMove = null;
    let lastHit = [];
    let firstHit = [];
    let tries = 0;

    const attackPlayer = (x, y, playerName) => {
        if (playerName.Gameboard.grid[x][y].wasShot == false) {
            let shot = playerName.Gameboard.receiveAttack(x, y);
            if (shot == "hit") return "valid hit attack";
            else return "valid miss attack"
        }else return "invalid attack"
    }

    const computerAttack = (targetPlayer) => {
        if (lastHit.length == 0) {
            let randomX = Math.floor(Math.random() * 10);
            let randomY = Math.floor(Math.random() * 10);
            legalMove = attackPlayer(randomX, randomY, targetPlayer);
            if (legalMove == "valid hit attack") {
                lastHit.push(randomX, randomY);
                firstHit.push(randomX, randomY);
            } else {
                while (legalMove == "invalid attack"){
                    computerAttack(targetPlayer);
                }
            }
        }else {
            if (targetPlayer.Gameboard.grid[lastHit[0]][lastHit[1]].shipName.isSunk() == false) {
                let legalX;
                let legalY;
                switch (tries) {
                    case 0:
                        legalX = lastHit[0] + 1;
                        legalY = lastHit[1];
                        if (legalX < 10) {
                            legalMove = attackPlayer(legalX, legalY, targetPlayer);
                            if (legalMove == "valid hit attack") {
                                lastHit[0] = legalX;
                            } else if (legalMove == "valid miss attack") {
                                tries++;
                            }else {
                                tries++;
                                computerAttack(targetPlayer);
                            }
                        } else {
                            tries++;
                            computerAttack(targetPlayer);
                        }
                        break;
                    case 1:
                        legalX = firstHit[0] - 1;
                        legalY = firstHit[1];
                        if (legalX >= 0) {
                            legalMove = attackPlayer(legalX, legalY, targetPlayer)
                            if (legalMove == "valid hit attack") {
                                firstHit[0] = legalX;
                            } else if (legalMove == "valid miss attack") {
                                tries++;
                            }else {
                                tries++;
                                computerAttack(targetPlayer);
                            }
                        }else {
                            tries++;
                            computerAttack(targetPlayer);
                        }
                        break;
                    case 2:
                        legalX = lastHit[0];
                        legalY = lastHit[1] + 1;
                        if (legalY < 10) {
                            legalMove = attackPlayer(legalX, legalY, targetPlayer);
                            if (legalMove == "valid hit attack") {
                                lastHit[1] = legalY;
                            } else if (legalMove == "valid miss attack") {
                                tries++;
                            }else {
                                tries++;
                                computerAttack(targetPlayer);
                            }
                        } else {
                            tries++;
                            computerAttack(targetPlayer);
                        }
                        break;
                    case 3:
                        legalX = firstHit[0];
                        legalY = firstHit[1] - 1;
                        if (legalY >= 0) {
                            legalMove = attackPlayer(legalX, legalY, targetPlayer);
                            if (legalMove == "valid hit attack") {
                                firstHit[1] = legalY;
                            }
                        };
                        break;
                }
            }else {
                lastHit = [];
                firstHit = [];
                tries = 0;
                computerAttack(targetPlayer);
            };
        }
    }

    return {Gameboard, attackPlayer, computerAttack}
}

export default player;
//module.exports = player;