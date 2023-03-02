import ship from "./ship";

const Gameboard = () => {
    const grid = [];

    for (let i = 0; i < 100; i++) {
        grid.push({hasShip: false, shipName: null, wasShot: false});
    }

    const place = (position, orientation, shipType) => {
        if (shipType == "patrol") {
            const patrol = ship(1);
            for (let i = 0; i < 1; i++) {
                if (orientation == "h") { 
                    grid[position + i].hasShip = true;
                    grid[position + i].shipName = patrol;
                }else {
                    grid[position + (i * 10)].hasShip = true;
                    grid[position + (i * 10)].shipName = patrol;
                }
            }
        }else if (shipType == "submarine") {
            const submarine = ship(2);
            for (let i = 0; i < 2; i++) {
                if (orientation == "h") { 
                    grid[position + i].hasShip = true;
                    grid[position + i].shipName = submarine;
                }else {
                    grid[position + (i * 10)].hasShip = true;
                    grid[position + (i * 10)].shipName = submarine;
                }
            }
        }else if (shipType == "destroyer") {
            const destroyer = ship(3);
            for (let i = 0; i < 3; i++) {
                if (orientation == "h") { 
                    grid[position + i].hasShip = true;
                    grid[position + i].shipName = destroyer;
                }else {
                    grid[position + (i * 10)].hasShip = true;
                    grid[position + (i * 10)].shipName = destroyer;
                }
            }
        }else if (shipType == "battleship") {
            const battleship = ship(4);
            for (let i = 0; i < 4; i++) {
                if (orientation == "h") { 
                    grid[position + i].hasShip = true;
                    grid[position + i].shipName = battleship;
                }else {
                    grid[position + (i * 10)].hasShip = true;
                    grid[position + (i * 10)].shipName = battleship;
                }
            }
        }else if (shipType == "carrier") {
            const carrier = ship(5);
            for (let i = 0; i < 5; i++) {
                if (orientation == "h") { 
                    grid[position + i].hasShip = true;
                    grid[position + i].shipName = carrier;
                }else {
                    grid[position + (i * 10)].hasShip = true;
                    grid[position + (i * 10)].shipName = carrier;
                }
            }
        }
    }

    const receiveAttack = (target) => {
        if (grid[target].hasShip == true) {
            grid[target].wasShot = true;
            grid[target].shipName.hit();
        }else grid[target].wasShot = true;
    }

    const checkAllSunk = () => {
        return grid.filter(cell => cell.shipName != null).every(ships => ships.shipName.isSunk() == true);
    }

    return {grid, place, receiveAttack, checkAllSunk}
}


module.exports = Gameboard;