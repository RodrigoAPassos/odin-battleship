import ship from "./ship";
import Gameboard from "./gameboard";

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

describe("Place Ship", () => {
    const gb1 = Gameboard();
    test("has patrol ship", ()=> {
        expect(gb1.place(25, "h", "patrol")).toEqual(
            expect(gb1.board[25].hasShip).toBe(true)
        )
    })

    test("has carrier ship", ()=> {
        expect(gb1.place(61, "h", "carrier")).toEqual(
            expect(gb1.board[61].hasShip).toBe(true),
            expect(gb1.board[62].hasShip).toBe(true),
            expect(gb1.board[63].hasShip).toBe(true),
            expect(gb1.board[64].hasShip).toBe(true),
            expect(gb1.board[65].hasShip).toBe(true)
        )
    })
})

describe.only("ReceiveAttack and allSunk test", () => {
    const gb1 = Gameboard();
    gb1.place(63, "v", "submarine");
    
    test("received attack and hit ship", ()=> {
        expect(gb1.receiveAttack(63)).toEqual(
            expect(gb1.board[63].wasShot).toBe(true),
            expect(gb1.board[63].hasShip).toBe(true),
            expect(gb1.board[63].shipName.isSunk()).toBe(false)
        )
    })

    test("received attack and missed ship", ()=> {
        expect(gb1.receiveAttack(64)).toEqual(
            expect(gb1.board[64].wasShot).toBe(true),
            expect(gb1.board[64].hasShip).toBe(false),
            expect(gb1.board[63].shipName.isSunk()).toBe(false)
        )
    })

    test("received attack and sunk ship", ()=> {
        expect(gb1.receiveAttack(73)).toEqual(
            expect(gb1.board[73].wasShot).toBe(true),
            expect(gb1.board[73].hasShip).toBe(true),
            expect(gb1.board[63].shipName.isSunk()).toBe(true),
            expect(gb1.board[73].shipName.isSunk()).toBe(true)
        )
    })

    test("AllSunk", ()=> {
        expect(gb1.checkAllSunk()).toBe(true)
    })
})