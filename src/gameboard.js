import ship from "./ship";

const Gameboard = () => {
    const grid = [];

    for (let i = 0; i < 100; i++) {
        grid.push({hasShip: false, shipName: null, wasShot: false});
    }

    const place = (position, orientation, shipType) => {
        if (shipType == "patrol") {
            //check for free positions
            for (let i = 0; i < 1; i++) {
                if (orientation == "h") {
                    if (grid[position + i].hasShip == false) continue;
                    else if (grid[position + i].hasShip == true) return;
                } else {
                    if (grid[position + (i * 10)].hasShip == false) continue;
                    else if (grid[position + (i * 10)].hasShip == true) return;
                }
            }
            const patrol = ship(1);
            //place
            for (let i = 0; i < 1; i++) {
                if (orientation == "h") { 
                    grid[position + i].hasShip = true;
                    grid[position + i].shipName = patrol;
                }else {
                    grid[position + (i * 10)].hasShip = true;
                    grid[position + (i * 10)].shipName = patrol;
                }
            } return shipType;
        }else if (shipType == "submarine") {
            if (orientation == "h" && /[9]$/.test(position)) return;
            if (orientation == "v" && position > 89) return;
            //check for free positions
            for (let i = 0; i < 2; i++) {
                if (orientation == "h") {
                    if (grid[position + i].hasShip == false) continue;
                    else if (grid[position + i].hasShip == true) return;
                } else {
                    if (grid[position + (i * 10)].hasShip == false) continue;
                    else if (grid[position + (i * 10)].hasShip == true) return;
                }
            }
            const submarine = ship(2);
            for (let i = 0; i < 2; i++) {
                if (orientation == "h") { 
                    grid[position + i].hasShip = true;
                    grid[position + i].shipName = submarine;
                }else {
                    grid[position + (i * 10)].hasShip = true;
                    grid[position + (i * 10)].shipName = submarine;
                }
            } return shipType;
        }else if (shipType == "destroyer") {
            if (orientation == "h" && /[8-9]$/.test(position)) return;
            if (orientation == "v" && position > 79) return;
            //check for free positions
            for (let i = 0; i < 3; i++) {
                if (orientation == "h") {
                    if (grid[position + i].hasShip == false) continue;
                    else if (grid[position + i].hasShip == true) return;
                } else {
                    if (grid[position + (i * 10)].hasShip == false) continue;
                    else if (grid[position + (i * 10)].hasShip == true) return;
                }
            }
            //place
            const destroyer = ship(3);
            for (let i = 0; i < 3; i++) {
                if (orientation == "h") { 
                    grid[position + i].hasShip = true;
                    grid[position + i].shipName = destroyer;
                }else {
                    grid[position + (i * 10)].hasShip = true;
                    grid[position + (i * 10)].shipName = destroyer;
                }
            } return shipType;
        }else if (shipType == "battleship") {
            if (orientation == "h" && /[7-9]$/.test(position)) return;
            if (orientation == "v" && position > 69) return;
            //check for free positions
            for (let i = 0; i < 4; i++) {
                if (orientation == "h") {
                    if (grid[position + i].hasShip == false) continue;
                    else if (grid[position + i].hasShip == true) return;
                } else {
                    if (grid[position + (i * 10)].hasShip == false) continue;
                    else if (grid[position + (i * 10)].hasShip == true) return;
                }
            }
            //place
            const battleship = ship(4);
            for (let i = 0; i < 4; i++) {
                if (orientation == "h") { 
                    grid[position + i].hasShip = true;
                    grid[position + i].shipName = battleship;
                }else {
                    grid[position + (i * 10)].hasShip = true;
                    grid[position + (i * 10)].shipName = battleship;
                }
            } return shipType;
        }else if (shipType == "carrier") {
            if (orientation == "h" && /[6-9]$/.test(position)) return;
            if (orientation == "v" && position > 59) return;
            //check for free positions
            for (let i = 0; i < 5; i++) {
                if (orientation == "h") {
                    if (grid[position + i].hasShip == false) continue;
                    else if (grid[position + i].hasShip == true) return;
                } else {
                    if (grid[position + (i * 10)].hasShip == false) continue;
                    else if (grid[position + (i * 10)].hasShip == true) return;
                }
            }
            const carrier = ship(5);
            for (let i = 0; i < 5; i++) {
                if (orientation == "h") { 
                    grid[position + i].hasShip = true;
                    grid[position + i].shipName = carrier;
                }else {
                    grid[position + (i * 10)].hasShip = true;
                    grid[position + (i * 10)].shipName = carrier;
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