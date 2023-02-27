const ship = (shipLength) => {
    let dmg = 0;
    let sunk = false;
    const sLength = shipLength;

    const hit = () => ++dmg;

    const isSunk = () => {
        dmg == sLength ? sunk = true : sunk = false;
        return sunk;
    }

    return {isSunk, hit}
}

module.exports = ship;