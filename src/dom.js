const displayBoards = (p1, p2/* , gameType */) => {
    //clear for display updated
    const shipBoards1 = document.querySelector(".player1 .shipsBoard");
    const attackBoard1 = document.querySelector(".player1 .attackBoard");
    const messageContainer = document.querySelector(".winner");

    messageContainer.innerHTML = "Player 1";
    shipBoards1.style.visibility = "visible";
    attackBoard1.style.visibility = "visible";

    while (shipBoards1.firstChild && attackBoard1.firstChild){
        shipBoards1.removeChild(shipBoards1.firstChild);
        attackBoard1.removeChild(attackBoard1.firstChild);
    }

    //board of ships
    for (let element of p1.Gameboard.grid) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", p1.Gameboard.grid.indexOf(element));
        if (element.hasShip == true) cell.classList.add("hasShip");
        if (element.wasShot == true && element.hasShip == false) cell.classList.add("waterHit");
        if (element.wasShot == true && element.hasShip == true) cell.classList.add("shipHit");
        if (element.shipName != null && element.shipName.isSunk() == true) cell.classList.add("shipSunk");
        shipBoards1.appendChild(cell);
    }

    //board of attacks
    for (let element of p2.Gameboard.grid) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", p2.Gameboard.grid.indexOf(element));
        if (element.wasShot == true && element.hasShip == true) cell.classList.add("shipHit");
        if (element.wasShot == true && element.hasShip == false) cell.classList.add("waterHit");
        if (element.shipName != null && element.shipName.isSunk() == true) cell.classList.add("shipSunk");
        if (element.wasShot == false) {
            cell.addEventListener("click", ()=> {
                p1.attackPlayer(cell.getAttribute("data-index"), p2);
                p2.computerAttack(p1);
                displayBoards(p1, p2);
                checkWinner(p1, p2);
            });
        }
        attackBoard1.appendChild(cell);
    }
}

const checkWinner = (p1, p2) => {
    const attackBoard1 = document.querySelector(".player1 .attackBoard");
    const messageContainer = document.querySelector(".winner");
    const shipBoards1 = document.querySelector(".player1 .shipsBoard");
    if (p1.Gameboard.checkAllSunk() == true && p2.Gameboard.checkAllSunk() == true) {
        shipBoards1.style.visibility = "hidden";
        attackBoard1.style.visibility = "hidden";
        messageContainer.innerHTML = "It's a Tie!";
    } else if (p1.Gameboard.checkAllSunk() == true && p2.Gameboard.checkAllSunk() == false) {
        shipBoards1.style.visibility = "hidden";
        attackBoard1.style.visibility = "hidden";
        messageContainer.innerHTML = "Player 2 Won!";
    } else if (p1.Gameboard.checkAllSunk() == false && p2.Gameboard.checkAllSunk() == true) {
        shipBoards1.style.visibility = "hidden";
        attackBoard1.style.visibility = "hidden";
        messageContainer.innerHTML = "Player 1 Won!";
    } else return;
}

export default displayBoards;
//module.exports = displayBoards;