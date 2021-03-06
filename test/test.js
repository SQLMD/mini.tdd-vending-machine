const VendingMachine = require("../VendingMachine");
const { expect } = require("chai");
const util = require("../util");
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
    machine.insertCoin(100);
    machine.insertCoin(100);
    machine.insertCoin(100);
    machine.insertCoin(50);

    machine.pressButton("A");
    machine.pressButton(1);
    expect(machine.inventory[0][0].count).to.be.equal(count - 1);
  });

  it("should fail when not enough change in till", () => {
    machine.insertCoin(500);
    machine.pressButton("A");
    const changeCoins = machine.pressButton(1);
    expect(util.countCoins(changeCoins)).to.be.equal(500);
  });

  it("should reject purchase if not enough balance", () => {
    const count = machine.inventory[0][0].count;
    machine.insertCoin(100);
    machine.pressButton("A");
    machine.pressButton(1);
    expect(machine.inventory[0][0].count).to.equal(count);
  });

  it("should not allow count of product to go negative", () => {
    const count = machine.inventory[0][0].count;
    for (let i = 0; i <= count; i++) {
      machine.insertCoin(100);
      machine.insertCoin(100);
      machine.insertCoin(100);
      machine.insertCoin(50);
      machine.pressButton("A");
      machine.pressButton(1);
    }
    expect(machine.inventory[0][0].count).to.equal(0);
  });

  it("should have zero balance at first", () => {
    expect(machine.balance).to.equal(0);
  });

  it("should decrease the till", () => {
    [100, 100, 100, 50, 50, 50].forEach((coin) => machine.insertCoin(coin));
    machine.pressButton("A");
    machine.pressButton(1);
    expect(machine.till).to.deep.equal({
      10: 0,
      50: 3,
      100: 2,
      500: 0,
    });
  });

  it("should not increase till on errors", () => {
    const total = util.countCoins(machine.till);
    machine.insertCoin(50);
    machine.insertCoin(50);
    machine.pressButton("A");
    machine.pressButton(1);
    expect(util.countCoins(machine.till)).to.equal(total);
  });
});
