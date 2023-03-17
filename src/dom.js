const allowDrop = (ev) => {
    ev.preventDefault();
}

const dragData = (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
}

const dropToPlace = (ev) => {
    ev.preventDefault();
    let shipType = ev.dataTransfer.getData("text");
    let index = ev.target.getAttribute("data-index");
    p1.Gameboard.place(index, "v", shipType);
    displayBoards(p1, p2, "pvcPlace");
}

const displayBoards = (p1, p2, gameType) => {
    const shipBoards1 = document.querySelector(".player1 .shipsBoard");
    const attackBoard1 = document.querySelector(".player1 .attackBoard");
    const messageContainer = document.querySelector(".winner");
    const loading = document.querySelector(".waiting");


    switch (gameType) {
        case "pvcPlace": //place ships vs computer
        displayShipList();
        //clear to update
        while (shipBoards1.firstChild && attackBoard1.firstChild){
            shipBoards1.removeChild(shipBoards1.firstChild);
            attackBoard1.removeChild(attackBoard1.firstChild);
        }
        //Show player board of ships
        for (let element of p1.Gameboard.grid) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-index", p1.Gameboard.grid.indexOf(element));
            cell.addEventListener("drop", ()=> dropToPlace(Event));
            cell.addEventListener("dragover", ()=> allowDrop(Event));
            //cell.setAttribute("ondrop", "dropToPlace(event)");
            //cell.setAttribute("ondragover", "allowDrop(event)");
            if (element.hasShip == true) cell.classList.add("hasShip");
            if (element.wasShot == true && element.hasShip == false) cell.classList.add("waterHit");
            if (element.wasShot == true && element.hasShip == true) cell.classList.add("shipHit");
            if (element.shipName != null && element.shipName.isSunk() == true) cell.classList.add("shipSunk");
            shipBoards1.appendChild(cell);
        }

        break;
        case "pvpPlace":
        //place ships vs player

        break;
        case "pvc":
        //play vs computer

        break;
        case "pvp":
        //play vs player

        break;
    }

    /* //clear for display updated
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
    } */
}

const displayShipList = () => {
    const messageContainer = document.querySelector(".winner");
    const loading = document.querySelector(".waiting");
    messageContainer.innerHTML = "Please place your Ships...";

    //Shiplist
    const shipList = document.createElement("ul");
    shipList.classList.add("shipList");
    const patrolLi = document.createElement("li");
    patrolLi.innerHTML = "Patrol";
    patrolLi.setAttribute("id", "patrol");
    patrolLi.setAttribute("draggable", "true");
    patrolLi.addEventListener("dragstart", ()=> dragData(Event));
    //patrolLi.setAttribute("ondragstart", "dragData(event)");
    const submarineLi = document.createElement("li");
    submarineLi.innerHTML = "Submarine";
    submarineLi.setAttribute("id", "submarine");
    submarineLi.setAttribute("draggable", "true");
    submarineLi.addEventListener("dragstart", ()=> dragData(Event));
    //submarineLi.setAttribute("ondragstart", "dragData(event)");
    const destroyerLi = document.createElement("li");
    destroyerLi.innerHTML = "Destroyer";
    destroyerLi.setAttribute("id", "destroyer");
    destroyerLi.setAttribute("draggable", "true");
    destroyerLi.addEventListener("dragstart", ()=> dragData(Event));
    //destroyerLi.setAttribute("ondragstart", "dragData(event)");
    const battleshipLi = document.createElement("li");
    battleshipLi.innerHTML = "Battleship";
    battleshipLi.setAttribute("id", "battleship");
    battleshipLi.setAttribute("draggable", "true");
    battleshipLi.addEventListener("dragstart", ()=> dragData(Event));
    //battleshipLi.setAttribute("ondragstart", "dragData(event)");
    const carrierLi = document.createElement("li");
    carrierLi.innerHTML = "Carrier";
    carrierLi.setAttribute("id", "carrier");
    carrierLi.setAttribute("draggable", "true");
    carrierLi.addEventListener("dragstart", ()=> dragData(Event));
    //carrierLi.setAttribute("ondragstart", "dragData(event)");
    shipList.appendChild(patrolLi);
    shipList.appendChild(submarineLi);
    shipList.appendChild(destroyerLi);
    shipList.appendChild(battleshipLi);
    shipList.appendChild(carrierLi);
    loading.appendChild(shipList);
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