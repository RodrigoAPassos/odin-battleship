import ship from "./ship";

const Gameboard = () => {
    const board = [];

    for (let i = 0; i < 100; i++) {
        board.push({hasShip: false, shipName: null, wasShot: false});
    }

    const place = (position, orientation, shipType) => {
        if (shipType == "patrol") {
            const patrol = ship(1);
            for (let i = 0; i < 1; i++) {
                if (orientation == "h") { 
                    board[position + i].hasShip = true;
                    board[position + i].shipName = patrol;
                }else {
                    board[position + (i * 10)].hasShip = true;
                    board[position + (i * 10)].shipName = patrol;
                }
            }
        }else if (shipType == "submarine") {
            const submarine = ship(2);
            for (let i = 0; i < 2; i++) {
                if (orientation == "h") { 
                    board[position + i].hasShip = true;
                    board[position + i].shipName = submarine;
                }else {
                    board[position + (i * 10)].hasShip = true;
                    board[position + (i * 10)].shipName = submarine;
                }
            }
        }else if (shipType == "destroyer") {
            const destroyer = ship(3);
            for (let i = 0; i < 3; i++) {
                if (orientation == "h") { 
                    board[position + i].hasShip = true;
                    board[position + i].shipName = destroyer;
                }else {
                    board[position + (i * 10)].hasShip = true;
                    board[position + (i * 10)].shipName = destroyer;
                }
            }
        }else if (shipType == "battleship") {
            const battleship = ship(4);
            for (let i = 0; i < 4; i++) {
                if (orientation == "h") { 
                    board[position + i].hasShip = true;
                    board[position + i].shipName = battleship;
                }else {
                    board[position + (i * 10)].hasShip = true;
                    board[position + (i * 10)].shipName = battleship;
                }
            }
        }else if (shipType == "carrier") {
            const carrier = ship(5);
            for (let i = 0; i < 5; i++) {
                if (orientation == "h") { 
                    board[position + i].hasShip = true;
                    board[position + i].shipName = carrier;
                }else {
                    board[position + (i * 10)].hasShip = true;
                    board[position + (i * 10)].shipName = carrier;
                }
            }
        }
    }

    const receiveAttack = (target) => {
        if (board[target].hasShip == true) {
            board[target].wasShot = true;
            board[target].shipName.hit();
        }else board[target].wasShot = true;
    }

    const checkAllSunk = () => {
        return board.filter(cell => cell.shipName != null).every(ships => ships.shipName.isSunk() == true);
    }

    return {board, place, receiveAttack, checkAllSunk}
}


module.exports = Gameboard;