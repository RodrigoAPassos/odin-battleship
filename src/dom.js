const displayBoards = (p1, p2) => {
    //board of ships
    const shipBoards = document.querySelector(".player1 .shipsBoard");
    
    for (let element of p1.grid) {
        const cell = document.createElement("div").classList.add("cell");
        cell.setAttribute("data-index", p1.grid.indexOf(element));
        shipBoards.appendChild(cell);
    }
}

module.exports = displayBoards;