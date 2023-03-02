import ship from "./ship";
import Gameboard from "./gameboard";
import Player from "./players";

describe.skip("Ship damage", () => {
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
            expect(gb1.grid[25].hasShip).toBe(true)
        )
    })

    test("has carrier ship", ()=> {
        expect(gb1.place(61, "h", "carrier")).toEqual(
            expect(gb1.grid[61].hasShip).toBe(true),
            expect(gb1.grid[62].hasShip).toBe(true),
            expect(gb1.grid[63].hasShip).toBe(true),
            expect(gb1.grid[64].hasShip).toBe(true),
            expect(gb1.grid[65].hasShip).toBe(true)
        )
    })
})

describe("ReceiveAttack and allSunk test", () => {
    const gb2 = Gameboard();
    gb2.place(63, "v", "submarine");
    gb2.place(25, "h", "submarine");
    
    test("received attack and hit ship", ()=> {
        expect(gb2.receiveAttack(63)).toEqual(
            expect(gb2.grid[63].wasShot).toBe(true),
            expect(gb2.grid[63].hasShip).toBe(true),
            expect(gb2.grid[63].shipName.isSunk()).toBe(false)
        )
    })

    test("received attack and missed ship", ()=> {
        expect(gb2.receiveAttack(64)).toEqual(
            expect(gb2.grid[64].wasShot).toBe(true),
            expect(gb2.grid[64].hasShip).toBe(false),
            expect(gb2.grid[63].shipName.isSunk()).toBe(false)
        )
    })

    test("received attack and sunk ship", ()=> {
        expect(gb2.receiveAttack(73)).toEqual(
            expect(gb2.grid[73].wasShot).toBe(true),
            expect(gb2.grid[73].hasShip).toBe(true),
            expect(gb2.grid[63].shipName.isSunk()).toBe(true),
            expect(gb2.grid[73].shipName.isSunk()).toBe(true)
        )
    })

    test("Another submarine not hit", ()=> {
        expect(gb2.grid[25].hasShip).toBe(true),
        expect(gb2.grid[25].wasShot).toBe(false),
        expect(gb2.grid[25].shipName.isSunk()).toBe(false)
    })

    test("AllSunk", ()=> {
        expect(gb2.checkAllSunk()).toBe(false)
    })
})

describe.only("Player tests", ()=> {
    const player1 = Player();
    const player2 = Player();
    player1.Gameboard.place(25, "v", "submarine");
    player1.Gameboard.place(61, "h", "carrier");
    player2.Gameboard.place(35, "v", "submarine");
    player2.Gameboard.place(71, "h", "carrier");


    test("2 ships for each player", ()=> {
        expect(player1.Gameboard.grid[35].hasShip).toBe(true),
        expect(player1.Gameboard.grid[64].hasShip).toBe(true),
        expect(player2.Gameboard.grid[25].hasShip).toBe(false),
        expect(player2.Gameboard.grid[45].hasShip).toBe(true),
        expect(player2.Gameboard.grid[61].hasShip).toBe(false),
        expect(player2.Gameboard.grid[74].hasShip).toBe(true)
    })

    test("player1 attack player2", ()=> {
        expect(player1.attackPlayer(25, player2)).toEqual(
            "valid attack",
            expect(player2.Gameboard.grid[25].wasShot).toBe(true)
        )
    })

    test("player1 invalid attack player2", ()=> {
        expect(player1.attackPlayer(25, player2)).toEqual(
            "invalid attack",
            expect(player2.Gameboard.grid[25].wasShot).toBe(true)
        )
    })

    test("player2 attack and sunk submarine of player1", ()=> {
        player2.attackPlayer(25, player1);
        player2.attackPlayer(35, player1);
        expect(player1.Gameboard.grid[25].shipName.isSunk()).toBe(true),
        expect(player1.Gameboard.grid[35].shipName.isSunk()).toBe(true)
    })
})