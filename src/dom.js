function allowDrop (ev) {
    ev.preventDefault();
}

function dragData (ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

/* function dropToPlace (ev) {
    let shipType = ev.dataTransfer.getData("text");
    let index = ev.target.getAttribute("data-index");
    p1.Gameboard.place(index, "h", shipType);
    ev.preventDefault();
    displayBoards(p1, p2, "pvcPlace");
} */

let listOfShips = [];
const allShipsList = ["patrol", "submarine", "destroyer", "battleship", "carrier"];

const displayBoards = (p1, p2, gameType) => {
    const shipBoards1 = document.querySelector(".player1 .shipsBoard");
    const attackBoard1 = document.querySelector(".player1 .attackBoard");
    const messageContainer = document.querySelector(".winner");
    const loading = document.querySelector(".waiting");

    /* while (shipBoards1.firstChild && attackBoard1.firstChild){
        shipBoards1.removeChild(shipBoards1.firstChild);
        attackBoard1.removeChild(attackBoard1.firstChild);
    } */

    switch (gameType) {
        case "pvcPlace": //place ships vs computer
        displayShipList();
        //clear to update
        while (shipBoards1.firstChild){
            shipBoards1.removeChild(shipBoards1.firstChild);
        }
        //Show player board of ships
        for (let element of p1.Gameboard.grid) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-index", p1.Gameboard.grid.indexOf(element));
            //cell.setAttribute("ondrop", "dropToPlace(event)");
            //cell.setAttribute("ondragover", "allowDrop(event)");
            if (element.hasShip == true) cell.classList.add("hasShip");
            if (element.wasShot == true && element.hasShip == false) cell.classList.add("waterHit");
            if (element.wasShot == true && element.hasShip == true) cell.classList.add("shipHit");
            if (element.shipName != null && element.shipName.isSunk() == true) cell.classList.add("shipSunk");
            if (element.hasShip == false) {
                cell.addEventListener("drop", function dropToPlace (ev) {
                    ev.preventDefault();
                    let shipType = ev.dataTransfer.getData("text");
                    let index = ev.target.getAttribute("data-index");
                    let shipPlaced = p1.Gameboard.place(Number(index), "v", shipType);
                    listOfShips.push(shipPlaced);
                    displayBoards(p1, p2, "pvcPlace");
                });
                cell.addEventListener("dragover", allowDrop);
            }
            shipBoards1.appendChild(cell);
        }
        if (allShipsList.every(ship => {return listOfShips.includes(ship)}) == true) {
            //remove options of ships from earlier step
            while (loading.firstChild){
                loading.removeChild(loading.firstChild);
            }

            //messages
            messageContainer.innerHTML = "Player 1";
            shipBoards1.style.visibility = "visible";
            attackBoard1.style.visibility = "visible";
            const boardName1 = document.createElement("div");
            const boardName2 = document.createElement("div");
            boardName1.innerHTML = "Your Ships Grid";
            boardName2.innerHTML = "Your Attack Grid";
            loading.appendChild(boardName1);
            loading.appendChild(boardName2);

            //place computer ships
            p2.Gameboard.place(4, "v", "patrol");
            p2.Gameboard.place(0, "v", "submarine");
            p2.Gameboard.place(24, "h", "destroyer");
            p2.Gameboard.place(74, "h", "battleship");
            p2.Gameboard.place(54, "h", "carrier");

            displayBoards(p1, p2, "pvc");
        }

        break;
        case "pvpPlace":
        //place ships vs player

        break;
        case "pvc":  //play vs computer

        //clear for updated ship display
        while (shipBoards1.firstChild){
            shipBoards1.removeChild(shipBoards1.firstChild);
        }
        //clear for updated attack board
        while (attackBoard1.firstChild){
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
                    displayBoards(p1, p2, "pvc");
                    checkWinner(p1, p2);
                });
            }
            attackBoard1.appendChild(cell);
        }

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
    messageContainer.innerHTML = "Please drag and drop all your ships...";

    while (loading.firstChild){
        loading.removeChild(loading.firstChild);
    }

    //Shiplist
    const shipList = document.createElement("ul");
    shipList.classList.add("shipList");
    const patrolLi = document.createElement("li");
    patrolLi.innerHTML = "Patrol";
    if (listOfShips.includes("patrol")) patrolLi.style.visibility = "hidden";
    patrolLi.setAttribute("id", "patrol");
    patrolLi.setAttribute("draggable", "true");
    patrolLi.addEventListener("dragstart", dragData);
    //patrolLi.setAttribute("ondragstart", "dragData(event)");
    const submarineLi = document.createElement("li");
    submarineLi.innerHTML = "Submarine";
    if (listOfShips.includes("submarine")) submarineLi.style.visibility = "hidden";
    submarineLi.setAttribute("id", "submarine");
    submarineLi.setAttribute("draggable", "true");
    submarineLi.addEventListener("dragstart", dragData);
    //submarineLi.setAttribute("ondragstart", "dragData(event)");
    const destroyerLi = document.createElement("li");
    destroyerLi.innerHTML = "Destroyer";
    if (listOfShips.includes("destroyer")) destroyerLi.style.visibility = "hidden";
    destroyerLi.setAttribute("id", "destroyer");
    destroyerLi.setAttribute("draggable", "true");
    destroyerLi.addEventListener("dragstart", dragData);
    //destroyerLi.setAttribute("ondragstart", "dragData(event)");
    const battleshipLi = document.createElement("li");
    battleshipLi.innerHTML = "Battleship";
    if (listOfShips.includes("battleship")) battleshipLi.style.visibility = "hidden";
    battleshipLi.setAttribute("id", "battleship");
    battleshipLi.setAttribute("draggable", "true");
    battleshipLi.addEventListener("dragstart", dragData);
    //battleshipLi.setAttribute("ondragstart", "dragData(event)");
    const carrierLi = document.createElement("li");
    carrierLi.innerHTML = "Carrier";
    if (listOfShips.includes("carrier")) carrierLi.style.visibility = "hidden";
    carrierLi.setAttribute("id", "carrier");
    carrierLi.setAttribute("draggable", "true");
    carrierLi.addEventListener("dragstart", dragData);
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
    const loading = document.querySelector(".waiting");
    if (p1.Gameboard.checkAllSunk() == true && p2.Gameboard.checkAllSunk() == true) {
        shipBoards1.style.visibility = "hidden";
        attackBoard1.style.visibility = "hidden";
        loading.style.visibility = "hidden";
        messageContainer.innerHTML = "It's a Tie!";
    } else if (p1.Gameboard.checkAllSunk() == true && p2.Gameboard.checkAllSunk() == false) {
        shipBoards1.style.visibility = "hidden";
        attackBoard1.style.visibility = "hidden";
        loading.style.visibility = "hidden";
        messageContainer.innerHTML = "Player 2 Won!";
    } else if (p1.Gameboard.checkAllSunk() == false && p2.Gameboard.checkAllSunk() == true) {
        shipBoards1.style.visibility = "hidden";
        attackBoard1.style.visibility = "hidden";
        loading.style.visibility = "hidden";
        messageContainer.innerHTML = "Player 1 Won!";
    } else return;
}

export default displayBoards;
//module.exports = displayBoards;