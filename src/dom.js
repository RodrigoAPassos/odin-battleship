

function dragData (ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function orientChange (ev) {
    ev.target.getAttribute("data-orientation") == "h" ? 
        ev.target.setAttribute("data-orientation", "v") : ev.target.setAttribute("data-orientation", "h");
}

let listOfShips = [];
const allShipsList = ["patrol", "submarine", "destroyer", "battleship", "carrier"];

const displayBoards = (p1, p2, gameType) => {
    const shipBoards1 = document.querySelector(".player1 .shipsBoard");
    const attackBoard1 = document.querySelector(".player1 .attackBoard");
    const messageContainer = document.querySelector(".winner");
    const loading = document.querySelector(".waiting");


    switch (gameType) {
        case "pvcPlace": //place ships vs computer
        displayShipList(p1, p2);
        //clear to update
        while (shipBoards1.firstChild){
            shipBoards1.removeChild(shipBoards1.firstChild);
        }
        //Show player board of ships
        p1.Gameboard.grid.forEach((row) => {
            row.forEach((element) => {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                let indexX = p1.Gameboard.grid.indexOf(row);
                let indexY = row.indexOf(element);
                cell.setAttribute("data-indexX", indexX);
                cell.setAttribute("data-indexY", indexY);
                
                if (element.hasShip == true) cell.classList.add("hasShip");
                if (element.wasShot == true && element.hasShip == false) cell.classList.add("waterHit");
                if (element.wasShot == true && element.hasShip == true) cell.classList.add("shipHit");
                if (element.shipName != null && element.shipName.isSunk() == true) cell.classList.add("shipSunk");
                //event to drop ship
                if (element.hasShip == false) {
                    cell.addEventListener("drop", function dropToPlace (ev) {
                        ev.preventDefault();
                        let shipType = ev.dataTransfer.getData("text");
                        let orientation = document.getElementById(shipType).getAttribute("data-orientation");
                        let indexX = ev.target.getAttribute("data-indexX");
                        let indexY = ev.target.getAttribute("data-indexY");
                        let shipPlaced = p1.Gameboard.place(Number(indexX), Number(indexY), orientation, shipType);
                        p1.listOfShips.push(shipPlaced);
                        displayBoards(p1, p2, "pvcPlace");
                    });
                    //event to allow drop and show near ship restriction
                    cell.addEventListener("dragover", function allowDrop (ev) {
                        if (p1.Gameboard.grid[ev.target.getAttribute("data-indexX")][ev.target.getAttribute("data-indexY")].hasShip == true || 
                            p1.Gameboard.grid[ev.target.getAttribute("data-indexX")][ev.target.getAttribute("data-indexY")].nearShip == true) {
                                ev.target.style.border = "1px dashed red";
                        }
                        ev.preventDefault();
                    });
                }
                shipBoards1.appendChild(cell);
            });
        });

        if (allShipsList.every(ship => {return p1.listOfShips.includes(ship)}) == true) {
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

            randomPlace(p2/* , gameType */);
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
        p1.Gameboard.grid.forEach((row) => {
            row.forEach((element) => {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                let indexX = p1.Gameboard.grid.indexOf(row);
                let indexY = row.indexOf(element);
                cell.setAttribute("data-indexY", indexY);
                cell.setAttribute("data-indexX", indexX);
                if (element.hasShip == true) cell.classList.add("hasShip");
                if (element.wasShot == true && element.hasShip == false) cell.classList.add("waterHit");
                if (element.wasShot == true && element.hasShip == true) cell.classList.add("shipHit");
                if (element.shipName != null && element.shipName.isSunk() == true) cell.classList.add("shipSunk");
                shipBoards1.appendChild(cell);
            })
        })
        

        //board of attacks
        p2.Gameboard.grid.forEach((row) => { 
            row.forEach((element) => {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                let indexX = p2.Gameboard.grid.indexOf(row);
                let indexY = row.indexOf(element);
                cell.setAttribute("data-indexX", indexX);
                cell.setAttribute("data-indexY", indexY);
                //if (element.hasShip == true) cell.classList.add("hasShip");//teste
                if (element.wasShot == true && element.hasShip == true) cell.classList.add("shipHit");
                if (element.wasShot == true && element.hasShip == false) cell.classList.add("waterHit");
                if (element.shipName != null && element.shipName.isSunk() == true) cell.classList.add("shipSunk");
                if (element.wasShot == false) {
                    cell.addEventListener("click", ()=> {
                        p1.attackPlayer(cell.getAttribute("data-indexX"), cell.getAttribute("data-indexY"), p2);
                        p2.computerAttack(p1);
                        displayBoards(p1, p2, "pvc");
                        checkWinner(p1, p2);
                    });
                }
                attackBoard1.appendChild(cell);
            })
        })

        break;
        case "pvp":
        //play vs player

        break;
        case "restart":
            listOfShips = [];
            displayBoards(p1, p2, "pvcPlace");
            break;
    }
}

const displayShipList = (playing, p2) => {
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
    if (playing.listOfShips.includes("patrol")) patrolLi.style.visibility = "hidden";
    patrolLi.setAttribute("id", "patrol");
    patrolLi.setAttribute("data-orientation", "h");
    patrolLi.setAttribute("draggable", "true");
    patrolLi.addEventListener("click", orientChange);
    patrolLi.addEventListener("dragstart", dragData);
    const submarineLi = document.createElement("li");
    submarineLi.innerHTML = "Submarine";
    if (playing.listOfShips.includes("submarine")) submarineLi.style.visibility = "hidden";
    submarineLi.setAttribute("id", "submarine");
    submarineLi.setAttribute("data-orientation", "h");
    submarineLi.setAttribute("draggable", "true");
    submarineLi.addEventListener("click", orientChange);
    submarineLi.addEventListener("dragstart", dragData);
    const destroyerLi = document.createElement("li");
    destroyerLi.innerHTML = "Destroyer";
    if (playing.listOfShips.includes("destroyer")) destroyerLi.style.visibility = "hidden";
    destroyerLi.setAttribute("id", "destroyer");
    destroyerLi.setAttribute("data-orientation", "h");
    destroyerLi.setAttribute("draggable", "true");
    destroyerLi.addEventListener("click", orientChange);
    destroyerLi.addEventListener("dragstart", dragData);
    const battleshipLi = document.createElement("li");
    battleshipLi.innerHTML = "Battleship";
    if (playing.listOfShips.includes("battleship")) battleshipLi.style.visibility = "hidden";
    battleshipLi.setAttribute("id", "battleship");
    battleshipLi.setAttribute("data-orientation", "h");
    battleshipLi.setAttribute("draggable", "true");
    battleshipLi.addEventListener("click", orientChange);
    battleshipLi.addEventListener("dragstart", dragData);
    const carrierLi = document.createElement("li");
    carrierLi.innerHTML = "Carrier";
    if (playing.listOfShips.includes("carrier")) carrierLi.style.visibility = "hidden";
    carrierLi.setAttribute("id", "carrier");
    carrierLi.setAttribute("data-orientation", "h");
    carrierLi.setAttribute("draggable", "true");
    carrierLi.addEventListener("click", orientChange);
    carrierLi.addEventListener("dragstart", dragData);
    //place random button
    const rngPlace = document.createElement("button");
    rngPlace.classList.add("rngPlace-btn");
    rngPlace.innerHTML = "Random Place";
    rngPlace.addEventListener("click", () => {
        randomPlace(playing);
        displayBoards(playing, p2, "pvcPlace");
    })
    //append
    shipList.appendChild(patrolLi);
    shipList.appendChild(submarineLi);
    shipList.appendChild(destroyerLi);
    shipList.appendChild(battleshipLi);
    shipList.appendChild(carrierLi);
    loading.appendChild(rngPlace);
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

const randomPlace = (playerPlace/* , gameType */) => {
    
    for (let i = (allShipsList.length - 1); i >= 0; i--) {
        if (!(playerPlace.listOfShips.includes(allShipsList[i]))) {
            let randomX = Math.floor(Math.random() * 10);
            let randomY = Math.floor(Math.random() * 10);
            let rnOrientation;
            randomX % 2 == 0 ? rnOrientation = "v" : rnOrientation = "h";
            let shipPlaced = playerPlace.Gameboard.place(randomX, randomY, rnOrientation, allShipsList[i]);
            while(shipPlaced === undefined) {
                randomX = Math.floor(Math.random() * 10);
                randomY = Math.floor(Math.random() * 10);
                randomX % 2 == 0 ? rnOrientation = "v" : rnOrientation = "h";
                shipPlaced = playerPlace.Gameboard.place(randomX, randomY, rnOrientation, allShipsList[i]);
            }playerPlace.listOfShips.push(shipPlaced);
        }else continue;
    }
    
}

export default displayBoards;
//module.exports = displayBoards;