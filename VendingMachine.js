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
      this.choice.row = undefined;
      this.choice.column = undefined;

      if (product.price > this.balance) {
        console.error("Insufficient funds");
        return this.returnChange();
      }
      console.log(this.checkPayable(product.price));
      if (product.count > 0 && this.checkPayable(product.price)) {
        product.count--;
        console.log("Here is your " + product.name);
        this.balance -= product.price;
      } else {
        console.log("I am sorry we are out of " + product.name + " today.");
      }

      return this.returnChange();
    }
  }

  returnChange() {
    let change = this.balance;

    const coins = {
      10: 0,
      50: 0,
      100: 0,
      500: 0,
    };
    while (change >= 500 && this.till["500"] > 0) {
      coins["500"] += 1;
      change -= 500;
      this.till["500"] -= 1;
    }
    while (change >= 100 && this.till["100"] > 0) {
      coins["100"] += 1;
      change -= 100;
      this.till["100"] -= 1;
    }
    while (change >= 50 && this.till["50"] > 0) {
      coins["50"] += 1;
      change -= 50;
      this.till["50"] -= 1;
    }
    while (change > 0 && this.till["10"] > 0) {
      coins["10"] += 1;
      change -= 10;
      this.till["10"] -= 1;
    }

    console.log(coins);
    this.balance = 0;
    return coins;
  }

  checkPayable(price) {
    let change = this.balance - price;
    const copyOfTill = Object.assign({}, this.till);

    const coins = {
      10: 0,
      50: 0,
      100: 0,
      500: 0,
    };
    while (change >= 500 && copyOfTill["500"] > 0) {
      coins["500"] += 1;
      change -= 500;
      copyOfTill["500"] -= 1;
    }
    while (change >= 100 && copyOfTill["100"] > 0) {
      coins["100"] += 1;
      change -= 100;
      copyOfTill["100"] -= 1;
    }
    while (change >= 50 && copyOfTill["50"] > 0) {
      coins["50"] += 1;
      change -= 50;
      copyOfTill["50"] -= 1;
    }
    while (change > 0 && copyOfTill["10"] > 0) {
      coins["10"] += 1;
      change -= 10;
      copyOfTill["10"] -= 1;
    }

    return change === 0;
  }
}
module.exports = VendingMachine;
