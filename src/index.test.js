import ship from "./index";

test("hit()", () => {
    expect(ship.hit()).toEqual(ship.dmg = 1)
});

test("isSunk()", () => {
    expect(ship.isSunk()).toEqual()
})