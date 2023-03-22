import ship from "./ship";

const Gameboard = () => {
    const grid = [];

    for (let i = 0; i < 100; i++) {
        grid.push({hasShip: false, nearShip: false, shipName: null, wasShot: false});
    }

    const place = (position, orientation, shipType) => {
        if (shipType == "patrol") {
            //check for free positions
            for (let i = 0; i < 1; i++) {
                if (orientation == "h") {
                    if (grid[position + i].hasShip == false && grid[position + i].nearShip == false) continue;
                    else if (grid[position + i].hasShip == true || grid[position + i].nearShip == true) return;
                } else {
                    if (grid[position + (i * 10)].hasShip == false && grid[position + (i * 10)].nearShip == false) continue;
                    else if (grid[position + (i * 10)].hasShip == true || grid[position + (i * 10)].nearShip == true) return;
                }
            }
            const patrol = ship(1);
            //place
            for (let i = 0; i < 1; i++) {
                if (orientation == "h") { 
                    grid[position + i].hasShip = true;
                    grid[position + i].shipName = patrol;
                    if ((position + (i + 10)) < 100) grid[position + (i + 10)].nearShip = true;
                    if ((position + (i - 10)) > 0) grid[position + (i - 10)].nearShip = true;
                    if (i == 0) {
                        if ((position - 1) > 0) grid[position - 1].nearShip = true;
                        if ((position + i + 1) < 100) grid[position + i + 1].nearShip = true;
                    }
                }else {
                    grid[position + (i * 10)].hasShip = true;
                    grid[position + (i * 10)].shipName = patrol;
                    grid[position + (i * 10) + 1].nearShip = true;
                    grid[position + (i * 10) - 1].nearShip = true;
                    if (i == 0) {
                        grid[position - 10].nearShip = true;
                        grid[position + (i * 10) + 10].nearShip = true;
                    }
                }
            } return shipType;
        }else if (shipType == "submarine") {
            if (orientation == "h" && /[9]$/.test(position)) return;
            if (orientation == "v" && position > 89) return;
            //check for free positions
            for (let i = 0; i < 2; i++) {
                if (orientation == "h") {
                    if (grid[position + i].hasShip == false && grid[position + i].nearShip == false) continue;
                    else if (grid[position + i].hasShip == true || grid[position + i].nearShip == true) return;
                } else {
                    if (grid[position + (i * 10)].hasShip == false && grid[position + (i * 10)].nearShip == false) continue;
                    else if (grid[position + (i * 10)].hasShip == true || grid[position + (i * 10)].nearShip == true) return;
                }
            }
            //place
            const submarine = ship(2);
            for (let i = 0; i < 2; i++) {
                if (orientation == "h") { 
                    grid[position + i].hasShip = true;
                    grid[position + i].shipName = submarine;
                    grid[position + (i + 10)].nearShip = true;
                    grid[position + (i - 10)].nearShip = true;
                    if (i == 0) {
                        grid[position - 1].nearShip = true;
                    }
                    if (i == 1) {
                        grid[position + i + 1].nearShip = true;
                    }
                }else {
                    grid[position + (i * 10)].hasShip = true;
                    grid[position + (i * 10)].shipName = submarine;
                    grid[position + (i * 10) + 1].nearShip = true;
                    grid[position + (i * 10) - 1].nearShip = true;
                    if (i == 0) {
                        grid[position - 10].nearShip = true;
                    }
                    if (i == 1) {
                        grid[position + (i * 10) + 10].nearShip = true;
                    }
                }
            } return shipType;
        }else if (shipType == "destroyer") {
            if (orientation == "h" && /[8-9]$/.test(position)) return;
            if (orientation == "v" && position > 79) return;
            //check for free positions
            for (let i = 0; i < 3; i++) {
                if (orientation == "h") {
                    if (grid[position + i].hasShip == false && grid[position + i].nearShip == false) continue;
                    else if (grid[position + i].hasShip == true || grid[position + i].nearShip == true) return;
                } else {
                    if (grid[position + (i * 10)].hasShip == false && grid[position + (i * 10)].nearShip == false) continue;
                    else if (grid[position + (i * 10)].hasShip == true || grid[position + (i * 10)].nearShip == true) return;
                }
            }
            //place
            const destroyer = ship(3);
            for (let i = 0; i < 3; i++) {
                if (orientation == "h") { 
                    grid[position + i].hasShip = true;
                    grid[position + i].shipName = destroyer;
                    grid[position + (i + 10)].nearShip = true;
                    grid[position + (i - 10)].nearShip = true;
                    if (i == 0) {
                        grid[position - 1].nearShip = true;
                    }
                    if (i == 2) {
                        grid[position + i + 1].nearShip = true;
                    }
                }else {
                    grid[position + (i * 10)].hasShip = true;
                    grid[position + (i * 10)].shipName = destroyer;
                    grid[position + (i * 10) + 1].nearShip = true;
                    grid[position + (i * 10) - 1].nearShip = true;
                    if (i == 0) {
                        grid[position - 10].nearShip = true;
                    }
                    if (i == 2) {
                        grid[position + (i * 10) + 10].nearShip = true;
                    }
                }
            } return shipType;
        }else if (shipType == "battleship") {
            if (orientation == "h" && /[7-9]$/.test(position)) return;
            if (orientation == "v" && position > 69) return;
            //check for free positions
            for (let i = 0; i < 4; i++) {
                if (orientation == "h") {
                    if (grid[position + i].hasShip == false && grid[position + i].nearShip == false) continue;
                    else if (grid[position + i].hasShip == true || grid[position + i].nearShip == true) return;
                } else {
                    if (grid[position + (i * 10)].hasShip == false && grid[position + (i * 10)].nearShip == false) continue;
                    else if (grid[position + (i * 10)].hasShip == true || grid[position + (i * 10)].nearShip == true) return;
                }
            }
            //place
            const battleship = ship(4);
            for (let i = 0; i < 4; i++) {
                if (orientation == "h") { 
                    grid[position + i].hasShip = true;
                    grid[position + i].shipName = battleship;
                    grid[position + (i + 10)].nearShip = true;
                    grid[position + (i - 10)].nearShip = true;
                    if (i == 0) {
                        grid[position - 1].nearShip = true;
                    }
                    if (i == 3) {
                        grid[position + i + 1].nearShip = true;
                    }
                }else {
                    grid[position + (i * 10)].hasShip = true;
                    grid[position + (i * 10)].shipName = battleship;
                    grid[position + (i * 10) + 1].nearShip = true;
                    grid[position + (i * 10) - 1].nearShip = true;
                    if (i == 0) {
                        grid[position - 10].nearShip = true;
                    }
                    if (i == 3) {
                        grid[position + (i * 10) + 10].nearShip = true;
                    }
                }
            } return shipType;
        }else if (shipType == "carrier") {
            if (orientation == "h" && /[6-9]$/.test(position)) return;
            if (orientation == "v" && position > 59) return;
            //check for free positions
            for (let i = 0; i < 5; i++) {
                if (orientation == "h") {
                    if (grid[position + i].hasShip == false && grid[position + i].nearShip == false) continue;
                    else if (grid[position + i].hasShip == true || grid[position + i].nearShip == true) return;
                } else {
                    if (grid[position + (i * 10)].hasShip == false && grid[position + (i * 10)].nearShip == false) continue;
                    else if (grid[position + (i * 10)].hasShip == true || grid[position + (i * 10)].nearShip == true) return;
                }
            }
            //place
            const carrier = ship(5);
            for (let i = 0; i < 5; i++) {
                if (orientation == "h") { 
                    grid[position + i].hasShip = true;
                    grid[position + i].shipName = carrier;
                    grid[position + (i + 10)].nearShip = true;
                    grid[position + (i - 10)].nearShip = true;
                    if (i == 0) {
                        grid[position - 1].nearShip = true;
                    }
                    if (i == 4) {
                        grid[position + i + 1].nearShip = true;
                    }
                }else {
                    grid[position + (i * 10)].hasShip = true;
                    grid[position + (i * 10)].shipName = carrier;
                    grid[position + (i * 10) + 1].nearShip = true;
                    grid[position + (i * 10) - 1].nearShip = true;
                    if (i == 0) {
                        grid[position - 10].nearShip = true;
                    }
                    if (i == 4) {
                        grid[position + (i * 10) + 10].nearShip = true;
                    }
                }
            } return shipType;
        }
    }

    const receiveAttack = (target) => {
        if (grid[target].hasShip == true) {
            grid[target].wasShot = true;
            grid[target].shipName.hit();
            return "hit"
        }else {
            grid[target].wasShot = true
            return "miss"
        };
    }

    const checkAllSunk = () => {
        return grid.filter(cell => cell.shipName != null).every(ships => ships.shipName.isSunk() == true);
    }

    return {grid, place, receiveAttack, checkAllSunk}
}

export default Gameboard;
//module.exports = Gameboard;