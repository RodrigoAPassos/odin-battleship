import ship from "./ship";

describe("Ship damage", () => {
    const newShip = ship(2);
    test("hit()", () => {
        expect(newShip.hit()).toBe(1)
    });
    
    test("isSunk()", () => {
        expect(newShip.isSunk()).toBe(false)
    })
    
    test("sunk", () => {
        newShip.hit();
        expect(newShip.isSunk()).toBe(true)
    })
})

