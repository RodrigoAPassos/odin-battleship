import ship from "./ship";

const Gameboard = () => {
    const placedShips = [];
    const grid = [];
    const size = 10;

    for (let i = 0; i < size; i++) {
        grid[i] = [];
        for (let j = 0;j < size; j++){
            grid[i][j] = {hasShip: false, nearShip: false, shipName: null, wasShot: false};
        }
    }

    const place = (x, y, orientation, shipType) => {
        if (shipType == "patrol") {
            //check for free positions
            for (let i = 0; i < 1; i++) {
                if (orientation == "v") {
                    if (grid[x + i][y].hasShip == false && grid[x + i][y].nearShip == false) continue;
                    else if (grid[x + i][y].hasShip == true || grid[x + i][y].nearShip == true) return;
                } else {
                    if (grid[x][y + i].hasShip == false && grid[x][y + i].nearShip == false) continue;
                    else if (grid[x][y + i].hasShip == true || grid[x][y + i].nearShip == true) return;
                }
            }
            const patrol = ship(1);
            placedShips.push({ship: patrol, shipName: shipType});
            //place
            for (let i = 0; i < 1; i++) {
                if (orientation == "v") { 
                    grid[x + i][y].hasShip = true;
                    grid[x + i][y].shipName = patrol;
                    if ([x + i] in grid && [y + 1] in grid[x + i]) grid[x + i][y + 1].nearShip = true;
                    if ([x + i] in grid && [y - 1] in grid[x + i]) grid[x + i][y - 1].nearShip = true;
                    if ([x + 1] in grid && [y] in grid[x + 1]) grid[x + 1][y].nearShip = true;
                    if ([x - 1] in grid && [y] in grid[x - 1]) grid[x - 1][y].nearShip = true;
                }else {
                    grid[x][y + i].hasShip = true;
                    grid[x][y + i].shipName = patrol;
                    if ([x + i] in grid && [y + 1] in grid[x + i]) grid[x + i][y + 1].nearShip = true;
                    if ([x + i] in grid && [y - 1] in grid[x + i]) grid[x + i][y - 1].nearShip = true;
                    if ([x + 1] in grid && [y] in grid[x + 1]) grid[x + 1][y].nearShip = true;
                    if ([x - 1] in grid && [y] in grid[x - 1]) grid[x - 1][y].nearShip = true;
                }
            } return shipType;
        }
        else if (shipType == "submarine") {
            if (orientation == "h" && y >= 9) return;
            if (orientation == "v" && x >= 9) return;
            //check for free positions
            for (let i = 0; i < 2; i++) {
                if (orientation == "v") {
                    if (grid[x + i][y].hasShip == false && grid[x + i][y].nearShip == false) continue;
                    else if (grid[x + i][y].hasShip == true || grid[x + i][y].nearShip == true) return;
                } else {
                    if (grid[x][y + i].hasShip == false && grid[x][y + i].nearShip == false) continue;
                    else if (grid[x][y + i].hasShip == true || grid[x][y + i].nearShip == true) return;
                }
            }
            //place
            const submarine = ship(2);
            placedShips.push({ship: submarine, shipName: shipType});
            for (let i = 0; i < 2; i++) {
                if (orientation == "v") { 
                    grid[x + i][y].hasShip = true;
                    grid[x + i][y].shipName = submarine;
                    if ([x + i] in grid && [y + 1] in grid[x + i]) grid[x + i][y + 1].nearShip = true; //->
                    if ([x + i] in grid && [y - 1] in grid[x + i]) grid[x + i][y - 1].nearShip = true; //<-
                    if ([x + 2] in grid && [y] in grid[x + 2]) grid[x + 2][y].nearShip = true; //after
                    if ([x - 1] in grid && [y] in grid[x - 1]) grid[x - 1][y].nearShip = true; //before
                }else {
                    grid[x][y + i].hasShip = true;
                    grid[x][y + i].shipName = submarine;
                    if ([x + 1] in grid && [y + i] in grid[x + 1]) grid[x + 1][y + i].nearShip = true; //up
                    if ([x - 1] in grid && [y + i] in grid[x - 1]) grid[x - 1][y + i].nearShip = true; //down
                    if ([x] in grid && [y + 2] in grid[x]) grid[x][y + 2].nearShip = true; //after
                    if ([x] in grid && [y - 1] in grid[x]) grid[x][y - 1].nearShip = true; //before
                }
            } return shipType;
        }else if (shipType == "destroyer") {
            if (orientation == "h" && y >= 8) return;
            if (orientation == "v" && x >= 8) return;
            //check for free positions
            for (let i = 0; i < 3; i++) {
                if (orientation == "v") {
                    if (grid[x + i][y].hasShip == false && grid[x + i][y].nearShip == false) continue;
                    else if (grid[x + i][y].hasShip == true || grid[x + i][y].nearShip == true) return;
                } else {
                    if (grid[x][y + i].hasShip == false && grid[x][y + i].nearShip == false) continue;
                    else if (grid[x][y + i].hasShip == true || grid[x][y + i].nearShip == true) return;
                }
            }
            //place
            const destroyer = ship(3);
            placedShips.push({ship: destroyer, shipName: shipType});
            for (let i = 0; i < 3; i++) {
                if (orientation == "v") { 
                    grid[x + i][y].hasShip = true;
                    grid[x + i][y].shipName = destroyer;
                    if ([x + i] in grid && [y + 1] in grid[x + i]) grid[x + i][y + 1].nearShip = true; //->
                    if ([x + i] in grid && [y - 1] in grid[x + i]) grid[x + i][y - 1].nearShip = true; //<-
                    if ([x + 3] in grid && [y] in grid[x + 3]) grid[x + 3][y].nearShip = true; //after
                    if ([x - 1] in grid && [y] in grid[x - 1]) grid[x - 1][y].nearShip = true; //before
                }else {
                    grid[x][y + i].hasShip = true;
                    grid[x][y + i].shipName = destroyer;
                    if ([x + 1] in grid && [y + i] in grid[x + 1]) grid[x + 1][y + i].nearShip = true; //up
                    if ([x - 1] in grid && [y + i] in grid[x - 1]) grid[x - 1][y + i].nearShip = true; //down
                    if ([x] in grid && [y + 3] in grid[x]) grid[x][y + 3].nearShip = true; //after
                    if ([x] in grid && [y - 1] in grid[x]) grid[x][y - 1].nearShip = true; //before
                }
            } return shipType;
        }else if (shipType == "battleship") {
            if (orientation == "h" && y >= 7) return;
            if (orientation == "v" && x >= 7) return;
            //check for free positions
            for (let i = 0; i < 4; i++) {
                if (orientation == "v") {
                    if (grid[x + i][y].hasShip == false && grid[x + i][y].nearShip == false) continue;
                    else if (grid[x + i][y].hasShip == true || grid[x + i][y].nearShip == true) return;
                } else {
                    if (grid[x][y + i].hasShip == false && grid[x][y + i].nearShip == false) continue;
                    else if (grid[x][y + i].hasShip == true || grid[x][y + i].nearShip == true) return;
                }
            }
            //place
            const battleship = ship(4);
            placedShips.push({ship: battleship, shipName: shipType});
            for (let i = 0; i < 4; i++) {
                if (orientation == "v") { 
                    grid[x + i][y].hasShip = true;
                    grid[x + i][y].shipName = battleship;
                    if ([x + i] in grid && [y + 1] in grid[x + i]) grid[x + i][y + 1].nearShip = true; //->
                    if ([x + i] in grid && [y - 1] in grid[x + i]) grid[x + i][y - 1].nearShip = true; //<-
                    if ([x + 4] in grid && [y] in grid[x + 4]) grid[x + 4][y].nearShip = true; //after
                    if ([x - 1] in grid && [y] in grid[x - 1]) grid[x - 1][y].nearShip = true; //before
                }else {
                    grid[x][y + i].hasShip = true;
                    grid[x][y + i].shipName = battleship;
                    if ([x + 1] in grid && [y + i] in grid[x + 1]) grid[x + 1][y + i].nearShip = true; //up
                    if ([x - 1] in grid && [y + i] in grid[x - 1]) grid[x - 1][y + i].nearShip = true; //down
                    if ([x] in grid && [y + 4] in grid[x]) grid[x][y + 4].nearShip = true; //after
                    if ([x] in grid && [y - 1] in grid[x]) grid[x][y - 1].nearShip = true; //before
                }
            } return shipType;
        }else if (shipType == "carrier") {
            if (orientation == "h" && y >= 6) return;
            if (orientation == "v" && x >= 6) return;
            //check for free positions
            for (let i = 0; i < 5; i++) {
                if (orientation == "v") {
                    if (grid[x + i][y].hasShip == false && grid[x + i][y].nearShip == false) continue;
                    else if (grid[x + i][y].hasShip == true || grid[x + i][y].nearShip == true) return;
                } else {
                    if (grid[x][y + i].hasShip == false && grid[x][y + i].nearShip == false) continue;
                    else if (grid[x][y + i].hasShip == true || grid[x][y + i].nearShip == true) return;
                }
            }
            //place
            const carrier = ship(5);
            placedShips.push({ship: carrier, shipName: shipType});
            for (let i = 0; i < 5; i++) {
                if (orientation == "v") { 
                    grid[x + i][y].hasShip = true;
                    grid[x + i][y].shipName = carrier;
                    if ([x + i] in grid && [y + 1] in grid[x + i]) grid[x + i][y + 1].nearShip = true; //->
                    if ([x + i] in grid && [y - 1] in grid[x + i]) grid[x + i][y - 1].nearShip = true; //<-
                    if ([x + 5] in grid && [y] in grid[x + 5]) grid[x + 5][y].nearShip = true; //after
                    if ([x - 1] in grid && [y] in grid[x - 1]) grid[x - 1][y].nearShip = true; //before
                }else {
                    grid[x][y + i].hasShip = true;
                    grid[x][y + i].shipName = carrier;
                    if ([x + 1] in grid && [y + i] in grid[x + 1]) grid[x + 1][y + i].nearShip = true; //up
                    if ([x - 1] in grid && [y + i] in grid[x - 1]) grid[x - 1][y + i].nearShip = true; //down
                    if ([x] in grid && [y + 5] in grid[x]) grid[x][y + 5].nearShip = true; //after
                    if ([x] in grid && [y - 1] in grid[x]) grid[x][y - 1].nearShip = true; //before
                }
            } return shipType;
        }
    }

    const receiveAttack = (x, y) => {
        if (grid[x][y].hasShip == true) {
            grid[x][y].wasShot = true;
            grid[x][y].shipName.hit();
            return "hit"
        }else {
            grid[x][y].wasShot = true
            return "miss"
        };
    }

    const checkAllSunk = () => {
        return grid.every(row => row.filter(cell => cell.shipName != null).every(ships => ships.shipName.isSunk() == true));
    }

    return {grid, place, receiveAttack, checkAllSunk, placedShips}
}

export default Gameboard;
//module.exports = Gameboard;