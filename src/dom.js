import ship from "./ship";

function dragData (ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function orientChange (ev) {
    ev.target.getAttribute("data-orientation") == "h" ? 
        ev.target.setAttribute("data-orientation", "v") : ev.target.setAttribute("data-orientation", "h");
}

const allShipsList = ["patrol", "submarine", "destroyer", "battleship", "carrier"];

const displayBoards = (p1, p2, gameType, playing = p1) => {
    const shipBoards1 = document.querySelector(".player1 .shipsBoard");
    const attackBoard1 = document.querySelector(".player1 .attackBoard");
    const messageContainer = document.querySelector(".winner");
    const loading = document.querySelector(".waiting");


    switch (gameType) {
        case "pvcPlace": //place ships vs computer
        displayShipList(p1, p2, gameType, playing);
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
                                ev.target.style.backgroundColor = "red";
                        }else {
                            ev.target.style.backgroundColor = "rgba(0, 0, 255, 0.5)";
                        }
                        ev.preventDefault();
                    });
                    //event dragoff
                    cell.addEventListener("dragleave", function dragOff (ev) {
                        ev.target.style.backgroundColor = "white";
                    })

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
            messageContainer.innerHTML = "Click your Attack Grid to perform an attack...";
            shipBoards1.style.visibility = "visible";
            attackBoard1.style.visibility = "visible";
            const boardName1 = document.createElement("div");
            const boardName2 = document.createElement("div");
            boardName1.innerHTML = "Your Ships Grid";
            boardName2.innerHTML = "Your Attack Grid";
            loading.appendChild(boardName1);
            loading.appendChild(boardName2);

            randomPlace(p2);
            displayBoards(p1, p2, "pvc", p1);
        }

        break;
        case "pvpPlace":
        //place ships vs player
        displayShipList(p1, p2, gameType, playing);
        //clear to update
        while (shipBoards1.firstChild){
            shipBoards1.removeChild(shipBoards1.firstChild);
        }
        //Show player board of ships
        playing.Gameboard.grid.forEach((row) => {
            row.forEach((element) => {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                let indexX = playing.Gameboard.grid.indexOf(row);
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
                        let shipPlaced = playing.Gameboard.place(Number(indexX), Number(indexY), orientation, shipType);
                        playing.listOfShips.push(shipPlaced);
                        if (allShipsList.every(ship => {return playing.listOfShips.includes(ship)}) == true) {
                            changeTurn(p1, p2, gameType, playing);
                        }else displayBoards(p1, p2, gameType, playing);
                    });
                    //event to allow drop and show near ship restriction
                    cell.addEventListener("dragover", function allowDrop (ev) {
                        if (playing.Gameboard.grid[ev.target.getAttribute("data-indexX")][ev.target.getAttribute("data-indexY")].hasShip == true || 
                            playing.Gameboard.grid[ev.target.getAttribute("data-indexX")][ev.target.getAttribute("data-indexY")].nearShip == true) {
                                ev.target.style.backgroundColor = "red";
                        }else {
                            ev.target.style.backgroundColor = "rgba(0, 0, 255, 0.5)";
                        }
                        ev.preventDefault();
                    })
                    //event dragoff
                    cell.addEventListener("dragleave", function dragOff (ev) {
                        ev.target.style.backgroundColor = "white";
                    })

                }
                shipBoards1.appendChild(cell);
            });
        });
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
                if (element.wasShot == true && element.hasShip == true) cell.classList.add("shipHit");
                if (element.wasShot == true && element.hasShip == false) cell.classList.add("waterHit");
                if (element.shipName != null && element.shipName.isSunk() == true) cell.classList.add("shipSunk");
                if (element.wasShot == false) {
                    cell.addEventListener("click", ()=> {
                        p1.attackPlayer(cell.getAttribute("data-indexX"), cell.getAttribute("data-indexY"), p2);
                        p2.computerAttack(p1);
                        displayBoards(p1, p2, "pvc");
                        checkWinner(p1, p2, gameType);
                    });
                    cell.addEventListener("mouseover", function dragAttack (ev) {
                        ev.target.style.cursor = "crosshair";
                        ev.target.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
                    })
                    cell.addEventListener("mouseout", function dragLeave (ev) {
                        ev.target.style.backgroundColor = "white";
                    })
                }
                attackBoard1.appendChild(cell);
            })
        })

        break;
        case "pvp": //play vs player

        //clear for updated ship display
        while (shipBoards1.firstChild){
            shipBoards1.removeChild(shipBoards1.firstChild);
        }
        //clear for updated attack board
        while (attackBoard1.firstChild){
            attackBoard1.removeChild(attackBoard1.firstChild);
        }

        //messages
        loading.querySelector(".shipList").style.display = "none";
        loading.querySelector(".rngPlace-btn").style.display = "none";
        if (playing === p1) messageContainer.innerHTML = "Player 1's Turn";
        else messageContainer.innerHTML = "Player 2's Turn";

        if (!(loading.querySelector(".legend1") || loading.querySelector(".legend2"))) {
            const boardName1 = document.createElement("div");
            const boardName2 = document.createElement("div");
            boardName1.classList.add("legend1");
            boardName2.classList.add("legend2");
            boardName1.innerHTML = "Your Ships Grid";
            boardName2.innerHTML = "Your Attack Grid";
            loading.appendChild(boardName1);
            loading.appendChild(boardName2);
        }else {
            loading.querySelector(".legend1").style.display = "block";
            loading.querySelector(".legend2").style.display = "block";
        }

        //board of ships
        playing.Gameboard.grid.forEach((row) => {
            row.forEach((element) => {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                let indexX = playing.Gameboard.grid.indexOf(row);
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

        let notPlaying = playing === p1 ? p2 : p1;

        //board of attacks
        notPlaying.Gameboard.grid.forEach((row) => { 
            row.forEach((element) => {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                let indexX = notPlaying.Gameboard.grid.indexOf(row);
                let indexY = row.indexOf(element);
                cell.setAttribute("data-indexX", indexX);
                cell.setAttribute("data-indexY", indexY);
                if (element.wasShot == true && element.hasShip == true) cell.classList.add("shipHit");
                if (element.wasShot == true && element.hasShip == false) cell.classList.add("waterHit");
                if (element.shipName != null && element.shipName.isSunk() == true) cell.classList.add("shipSunk");
                if (element.wasShot == false) {
                    cell.addEventListener("click", ()=> {
                        let attackResult = playing.attackPlayer(cell.getAttribute("data-indexX"), cell.getAttribute("data-indexY"), notPlaying);
                        let finished = checkWinner(p1, p2, gameType, notPlaying, attackResult);
                        if (finished != true) {
                            loading.querySelector(".legend1").style.display = "none";
                            loading.querySelector(".legend2").style.display = "none";
                            changeTurn(p1, p2, gameType, playing)
                        };
                    })
                    cell.addEventListener("mouseover", function dragAttack (ev) {
                        ev.target.style.cursor = "crosshair";
                        ev.target.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
                    })
                    cell.addEventListener("mouseout", function dragLeave (ev) {
                        ev.target.style.backgroundColor = "white";
                    })
                }
                attackBoard1.appendChild(cell);
            })
        })

        break;
    }
}

const displayShipList = (p1, p2, gameType, playing) => {
    const messageContainer = document.querySelector(".winner");
    const loading = document.querySelector(".waiting");
    messageContainer.innerHTML = "Please drag and drop your ships...";

    while (loading.firstChild){
        loading.removeChild(loading.firstChild);
    }

    //Shiplist
    const shipList = document.createElement("ul");
    shipList.classList.add("shipList");
    const tooltip = document.createElement("span");
    tooltip.classList.add("tooltip");
    tooltip.innerHTML = "Click to alternate orientation between 'v/h'";
    const patrolLi = document.createElement("li");
    patrolLi.innerHTML = "Patrol";
    if (playing.listOfShips.includes("patrol")) patrolLi.style.visibility = "hidden";
    patrolLi.setAttribute("id", "patrol");
    patrolLi.setAttribute("data-orientation", "h");
    patrolLi.setAttribute("draggable", "true");
    patrolLi.addEventListener("click", orientChange);
    const patroLiDesc = document.createElement("div");
    patroLiDesc.innerHTML = "Length: 1";
    patroLiDesc.style.visibility = "hidden";
    patrolLi.addEventListener("dragstart", dragData);
    patrolLi.addEventListener("mouseover", function showDescription () {
        patroLiDesc.style.visibility = "visible";
    });
    patrolLi.addEventListener("mouseout", function descriptionOut () {
        patroLiDesc.style.visibility = "hidden";
    });
    patrolLi.appendChild(patroLiDesc);
    const submarineLi = document.createElement("li");
    submarineLi.innerHTML = "Submarine";
    if (playing.listOfShips.includes("submarine")) submarineLi.style.visibility = "hidden";
    submarineLi.setAttribute("id", "submarine");
    submarineLi.setAttribute("data-orientation", "h");
    submarineLi.setAttribute("draggable", "true");
    submarineLi.addEventListener("click", orientChange);
    const submarineLiDesc = document.createElement("div");
    submarineLiDesc.innerHTML = "Length: 2";
    submarineLiDesc.style.visibility = "hidden";
    submarineLi.addEventListener("mouseover", function showDescription () {
        submarineLiDesc.style.visibility = "visible";
    });
    submarineLi.addEventListener("mouseout", function descriptionOut () {
        submarineLiDesc.style.visibility = "hidden";
    });
    submarineLi.appendChild(submarineLiDesc);
    submarineLi.addEventListener("dragstart", dragData);
    const destroyerLi = document.createElement("li");
    destroyerLi.innerHTML = "Destroyer";
    if (playing.listOfShips.includes("destroyer")) destroyerLi.style.visibility = "hidden";
    destroyerLi.setAttribute("id", "destroyer");
    destroyerLi.setAttribute("data-orientation", "h");
    destroyerLi.setAttribute("draggable", "true");
    destroyerLi.addEventListener("click", orientChange);
    const destroyerLiDesc = document.createElement("div");
    destroyerLiDesc.innerHTML = "Length: 3";
    destroyerLiDesc.style.visibility = "hidden";
    destroyerLi.addEventListener("mouseover", function showDescription () {
        destroyerLiDesc.style.visibility = "visible";
    });
    destroyerLi.addEventListener("mouseout", function descriptionOut () {
        destroyerLiDesc.style.visibility = "hidden";
    });
    destroyerLi.appendChild(destroyerLiDesc);
    destroyerLi.addEventListener("dragstart", dragData);
    const battleshipLi = document.createElement("li");
    battleshipLi.innerHTML = "Battleship";
    if (playing.listOfShips.includes("battleship")) battleshipLi.style.visibility = "hidden";
    battleshipLi.setAttribute("id", "battleship");
    battleshipLi.setAttribute("data-orientation", "h");
    battleshipLi.setAttribute("draggable", "true");
    battleshipLi.addEventListener("click", orientChange);
    const battleshipLiDesc = document.createElement("div");
    battleshipLiDesc.innerHTML = "Length: 4";
    battleshipLiDesc.style.visibility = "hidden";
    battleshipLi.addEventListener("mouseover", function showDescription () {
        battleshipLiDesc.style.visibility = "visible";
    });
    battleshipLi.addEventListener("mouseout", function descriptionOut () {
        battleshipLiDesc.style.visibility = "hidden";
    });
    battleshipLi.appendChild(battleshipLiDesc);
    battleshipLi.addEventListener("dragstart", dragData);
    const carrierLi = document.createElement("li");
    carrierLi.innerHTML = "Carrier";
    if (playing.listOfShips.includes("carrier")) carrierLi.style.visibility = "hidden";
    carrierLi.setAttribute("id", "carrier");
    carrierLi.setAttribute("data-orientation", "h");
    carrierLi.setAttribute("draggable", "true");
    carrierLi.addEventListener("click", orientChange);
    const carrierLiDesc = document.createElement("div");
    carrierLiDesc.innerHTML = "Length: 5";
    carrierLiDesc.style.visibility = "hidden";
    carrierLi.addEventListener("mouseover", function showDescription () {
        carrierLiDesc.style.visibility = "visible";
    });
    carrierLi.addEventListener("mouseout", function descriptionOut () {
        carrierLiDesc.style.visibility = "hidden";
    });
    carrierLi.appendChild(carrierLiDesc);
    carrierLi.addEventListener("dragstart", dragData);
    //place random button
    const rngPlace = document.createElement("button");
    rngPlace.classList.add("rngPlace-btn");
    rngPlace.innerHTML = "Random";
    rngPlace.addEventListener("click", () => {
        randomPlace(playing);
        if (gameType == "pvpPlace") {   //if p1 placed, p2 place
            if (allShipsList.every(ship => {return p1.listOfShips.includes(ship)}) == true &&
            allShipsList.every(ship => {return p2.listOfShips.includes(ship)}) == false) changeTurn(p1, p2, gameType, playing);
            //if both placed out of pvpPlace
            if (allShipsList.every(ship => {return p1.listOfShips.includes(ship)}) == true &&
            allShipsList.every(ship => {return p2.listOfShips.includes(ship)}) == true) changeTurn(p1, p2, "pvp", playing);
        }else {
            displayBoards(p1, p2, "pvcPlace");
        }
    })
    //append
    shipList.appendChild(patrolLi);
    shipList.appendChild(submarineLi);
    shipList.appendChild(destroyerLi);
    shipList.appendChild(battleshipLi);
    shipList.appendChild(carrierLi);
    shipList.appendChild(tooltip);
    loading.appendChild(shipList);
    loading.appendChild(rngPlace);
}

const checkWinner = (p1, p2, gameType, playing, attackResult) => {
    const attackBoard1 = document.querySelector(".player1 .attackBoard");
    const messageContainer = document.querySelector(".winner");
    const shipBoards1 = document.querySelector(".player1 .shipsBoard");
    const loading = document.querySelector(".waiting");
    const statusAttack = document.querySelector(".lastAttack");
    const statusSunk = document.querySelector(".sunkShips");
    if (gameType == "pvc") {
        if (p1.Gameboard.checkAllSunk() == true && p2.Gameboard.checkAllSunk() == true) {
            shipBoards1.style.visibility = "hidden";
            attackBoard1.style.visibility = "hidden";
            loading.style.visibility = "hidden";
            messageContainer.innerHTML = "It's a Tie!";
        } else if (p1.Gameboard.checkAllSunk() == true && p2.Gameboard.checkAllSunk() == false) {
            shipBoards1.style.visibility = "hidden";
            attackBoard1.style.visibility = "hidden";
            loading.style.visibility = "hidden";
            messageContainer.innerHTML = "Computer Won!";
        } else if (p1.Gameboard.checkAllSunk() == false && p2.Gameboard.checkAllSunk() == true) {
            shipBoards1.style.visibility = "hidden";
            attackBoard1.style.visibility = "hidden";
            loading.style.visibility = "hidden";
            messageContainer.innerHTML = "You Won!";
        } else return;
    }else if (gameType == "pvp") {
        if (playing.Gameboard.checkAllSunk() == true) {
            shipBoards1.style.visibility = "hidden";
            attackBoard1.style.visibility = "hidden";
            loading.style.visibility = "hidden";
            statusAttack.style.visibility = "hidden";
            statusSunk.style.visibility = "hidden";
            messageContainer.innerHTML = "You Won!";
            return true;
        }else {
            displayStatus(p1, p2, gameType, playing, attackResult)
        };
    }
}

const randomPlace = (playerPlace) => {
    
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

const changeTurn = (p1, p2, gameType, playing) => {
    const shipBoards1 = document.querySelector(".player1 .shipsBoard");
    const attackBoard1 = document.querySelector(".player1 .attackBoard");
    const messageContainer = document.querySelector(".winner");
    const loading = document.querySelector(".waiting");
    const rngPlace = document.querySelector(".rngPlace-btn");

    //hide boards
    shipBoards1.style.display = "none";
    attackBoard1.style.display = "none";
    loading.querySelector(".shipList").style.visibility = "hidden";
    rngPlace.style.visibility = "hidden";

    if (allShipsList.every(ship => {return p1.listOfShips.includes(ship)}) == true &&
    allShipsList.every(ship => {return p2.listOfShips.includes(ship)}) == true) gameType = "pvp"; 
    //update message according to player
    if (playing === p2) {
        messageContainer.innerHTML = "Player 1 click when ready...";
    }else messageContainer.innerHTML = "Player 2 click when ready...";
    
    //change turn
    playing === p1 ? playing = p2 : playing = p1;

    //display button ready
    const readyBtn = document.createElement("button");
    readyBtn.classList.add("readyBtn");
    readyBtn.innerHTML = "Ready!";
    readyBtn.addEventListener("click", ()=> {
        shipBoards1.style.display = "flex";
        attackBoard1.style.display = "flex";
        loading.querySelector(".shipList").style.visibility = "visible";
        loading.removeChild(readyBtn);
        displayBoards(p1, p2, gameType, playing);
    });
    //append
    loading.appendChild(readyBtn);
}

const checkNSunkShips = (playing) => {
    let shipsSunk = playing.Gameboard.placedShips.reduce((sunkShips, ships) => {
        if (ships.ship.isSunk() == true) {
            sunkShips.push(ships.shipName);
        }return sunkShips;
    }, []); return allShipsList.filter(ship => !shipsSunk.includes(ship));
}

const displayStatus = (p1, p2, gameType, notPlaying, attackResult) => {
    const statusAttack = document.querySelector(".lastAttack");
    const statusSunk = document.querySelector(".sunkShips");
    const listNotSunk1 = document.createElement("ul");
    const listNotSunk2 = document.createElement("ul");

    while (listNotSunk1.firstChild){
        listNotSunk1.removeChild(listNotSunk1.firstChild);
    }

    while (listNotSunk2.firstChild){
        listNotSunk2.removeChild(listNotSunk2.firstChild);
    }

    for (let shipUnsunk of checkNSunkShips(p1)) {
        const shipAlive = document.createElement("li");
        shipAlive.classList.add("unsunk");
        shipAlive.innerHTML = shipUnsunk;
        listNotSunk1.appendChild(shipAlive);
    }

    for (let shipUnsunk of checkNSunkShips(p2)) {
        const shipAlive2 = document.createElement("li");
        shipAlive2.classList.add("unsunk");
        shipAlive2.innerHTML = shipUnsunk;
        listNotSunk2.appendChild(shipAlive2);
    }

    if (notPlaying === p2) {
        statusAttack.innerHTML = attackResult == "valid hit attack" ? "Player 1's shot hit your ship! " : "Player 1's shot miss. ";
        statusSunk.innerHTML = "List of Player 1's unsunk ships: ";
        statusSunk.appendChild(listNotSunk1);
    }else {
        statusAttack.innerHTML = attackResult == "valid hit attack" ? "Player 2's shot hit your ship! " : "Player 2's shot miss. ";
        statusSunk.innerHTML = "List of Player 2's unsunk ships: ";
        statusSunk.appendChild(listNotSunk2);
    }
}

export default displayBoards;
//module.exports = displayBoards;