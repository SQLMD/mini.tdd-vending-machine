// your class here
/*
  >>> Don't forget to use module.exports!
  What is that? Well, glad you asked.
  Read about it here: https://www.sitepoint.com/understanding-module-exports-exports-node-js/
*/
class VendingMachine {
  constructor() {
    this.till = {
      10: 0,
      50: 0,
      100: 0,
      500: 0,
    };
    this.balance = 0;
    this.choice = { row: undefined, column: undefined };
    const plumbus = { name: `plumbus`, price: 350, count: 5 };
    const coffee = { name: "Tully's", price: 250, count: 7 };
    this.inventory = [[plumbus, coffee]];
    this.change = 0;
  }

  insertCoin(coin) {
    if (this.till.hasOwnProperty(coin)) {
      this.till[coin] += 1;
      this.balance += coin;
    }
  }

  pressButton(key) {
    if (["A", "B", "C", "D"].includes(key)) {
      this.choice["row"] = key;
      console.log(key);
    } else if ([1, 2, 3, 4].includes(key)) {
      this.choice["column"] = key;
      console.log(this.choice.row, this.choice.column);
    }
    if (this.choice.row != undefined && this.choice.column != undefined) {
      const dataRow = { A: 0, B: 1, C: 2, D: 3 };
      const dataColumn = { 1: 0, 2: 1, 3: 2, 4: 3 };
      const product = this.inventory[dataRow[this.choice.row]][
        dataColumn[this.choice.column]
      ];
      product.count--;
      console.log("Here is your " + product.name);
      this.balance -= product.price;
      return this.returnChange();
    }
  }

  returnChange() {
    const change = this.balance;
    console.log(this.change);
    this.balance = 0;
    return change;
  }
}
module.exports = VendingMachine;
