const VendingMachine = require("../VendingMachine");
const { expect } = require("chai");
//const sinonTest = require("mocha-sinon");

describe("vending machine", () => {
  let machine;

  beforeEach(() => {
    machine = new VendingMachine();
  });
  it("should accept valid coins", () => {
    // Setup

    // Exercise
    machine.insertCoin(500);

    // Assert
    expect(machine.till).to.deep.equal({
      10: 0,
      50: 0,
      100: 0,
      500: 1,
    });
    expect(machine.balance).to.equal(500); // Use an ES6 getter
  });

  it("should save which button is pushed", () => {
    machine.pressButton("A");
    expect(machine.choice.row).to.equal("A");
  });

  it("should only allow 'A'-'D' for the row", () => {
    machine.pressButton("E");
    expect(machine.choice.row).to.equal(undefined);
  });

  it("should save which column of button is pushed", () => {
    machine.pressButton(1);
    expect(machine.choice.column).to.equal(1);
  });
  it("should decrease inventory by choice", () => {
    const count = machine.inventory[0][0].count;
    machine.pressButton("A");
    machine.pressButton(1);
    expect(machine.inventory[0][0].count).to.be.equal(count - 1);
  });

  it("should return the correct change", () => {
    machine.insertCoin(500);
    machine.pressButton("A");
    machine.pressButton(1);
    const change = machine.returnChange();
    expect(change).to.be.equal(500 - machine.inventory[0][0].price);
  });
});
