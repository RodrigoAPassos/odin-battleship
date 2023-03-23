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
        expect(gb1.place(2, 5, "h", "patrol")).toEqual(
            "patrol",
            expect(gb1.grid[2][5].hasShip).toBe(true)
        )
    })

    test("has carrier ship", ()=> {
        expect(gb1.place(6, 1, "h", "carrier")).toEqual(
            "carrier",
            expect(gb1.grid[6][1].hasShip).toBe(true),
            expect(gb1.grid[6][2].hasShip).toBe(true),
            expect(gb1.grid[6][3].hasShip).toBe(true),
            expect(gb1.grid[6][4].hasShip).toBe(true),
            expect(gb1.grid[6][5].hasShip).toBe(true)
        )
    })
})

describe("ReceiveAttack and allSunk test", () => {
    const gb2 = Gameboard();
    gb2.place(6, 3, "v", "submarine");
    gb2.place(2, 5, "h", "patrol");
    
    test("received attack and hit ship", ()=> {
        expect(gb2.receiveAttack(6, 3)).toEqual(
            "hit",
            expect(gb2.grid[6][3].wasShot).toBe(true),
            expect(gb2.grid[6][3].hasShip).toBe(true),
            expect(gb2.grid[6][3].shipName.isSunk()).toBe(false)
        )
    })

    test("received attack and missed ship", ()=> {
        expect(gb2.receiveAttack(6, 4)).toEqual(
            "miss",
            expect(gb2.grid[6][4].wasShot).toBe(true),
            expect(gb2.grid[6][4].hasShip).toBe(false),
            expect(gb2.grid[6][3].shipName.isSunk()).toBe(false)
        )
    })

    test("received attack and sunk ship", ()=> {
        expect(gb2.receiveAttack(7, 3)).toEqual(
            "hit",
            expect(gb2.grid[7][3].wasShot).toBe(true),
            expect(gb2.grid[7][3].hasShip).toBe(true),
            expect(gb2.grid[6][3].shipName.isSunk()).toBe(true),
            expect(gb2.grid[7][3].shipName.isSunk()).toBe(true)
        )
    })

    test("Another submarine not hit", ()=> {
        expect(gb2.grid[2][5].hasShip).toBe(true),
        expect(gb2.grid[2][5].wasShot).toBe(false),
        expect(gb2.grid[2][5].shipName.isSunk()).toBe(false)
    })

    test("AllSunk", ()=> {
        expect(gb2.checkAllSunk()).toBe(false)
    })

    test("received attack and sunk last ship", ()=> {
        expect(gb2.receiveAttack(2, 5)).toEqual(
            "hit",
            expect(gb2.grid[2][5].wasShot).toBe(true),
            expect(gb2.grid[2][5].hasShip).toBe(true),
            expect(gb2.grid[2][5].shipName.isSunk()).toBe(true)
        )
    })

    test("Try again AllSunk", ()=> {
        expect(gb2.checkAllSunk()).toBe(true)
    })
})

describe("Player tests", ()=> {
    const player1 = Player();
    const player2 = Player();
    player1.Gameboard.place(2, 5, "v", "submarine");
    player1.Gameboard.place(6, 1, "h", "carrier");
    player2.Gameboard.place(2, 5, "h", "submarine");
    player2.Gameboard.place(7, 1, "h", "carrier");


    test("2 ships for each player", ()=> {
        expect(player1.Gameboard.grid[3][5].hasShip).toBe(true),
        expect(player1.Gameboard.grid[6][4].hasShip).toBe(true),
        expect(player2.Gameboard.grid[2][5].hasShip).toBe(true),
        expect(player2.Gameboard.grid[4][5].hasShip).toBe(false),
        expect(player2.Gameboard.grid[6][1].hasShip).toBe(false),
        expect(player2.Gameboard.grid[7][4].hasShip).toBe(true)
    })

    test("player1 attack player2", ()=> {
        expect(player1.attackPlayer(2, 5, player2)).toEqual(
            "valid hit attack",
            expect(player2.Gameboard.grid[2][5].wasShot).toBe(true)
        )
    })

    test("player1 invalid attack player2", ()=> {
        expect(player1.attackPlayer(2, 5, player2)).toEqual(
            "invalid attack",
            expect(player2.Gameboard.grid[2][5].wasShot).toBe(true)
        )
    })

    test("player2 attack and sunk submarine of player1", ()=> {
        player2.attackPlayer(2, 5, player1);
        player2.attackPlayer(3, 5, player1);
        expect(player1.Gameboard.grid[2][5].shipName.isSunk()).toBe(true),
        expect(player1.Gameboard.grid[3][5].shipName.isSunk()).toBe(true)
    })
})