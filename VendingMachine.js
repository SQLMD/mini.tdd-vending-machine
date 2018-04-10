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
    const soda1 = { name: `1 liter coke`, price: 350, count: 5 };
    const soda2 = { name: "coke zero", price: 160, count: 7 };
    const soda3 = { name: "Dr. Pepper", price: 170, count: 4 };
    const soda4 = { name: "Fanta Melon", price: 150, count: 1 };

    const coffee1 = { name: "boss", price: 130, count: 7 };
    const coffee2 = { name: "starbucks", price: 200, count: 7 };
    const coffee3 = { name: "tullys", price: 360, count: 7 };
    const coffee4 = { name: "wonda", price: 100, count: 7 };

    const tea1 = { name: "jasmin", price: 160, count: 7 };
    const tea2 = { name: "matcha", price: 160, count: 7 };
    const tea3 = { name: "sokenbicha", price: 160, count: 7 };
    const tea4 = { name: "black", price: 160, count: 7 };

    const sports1 = { name: "Aquarius", price: 160, count: 7 };
    const sports2 = { name: "Pokari Sweat", price: 160, count: 7 };
    const sports3 = { name: "Kirin Sports", price: 160, count: 7 };
    const sports4 = { name: "water", price: 160, count: 7 };

    this.inventory = [
      [soda1, soda2, soda3, soda4],
      [coffee1, coffee2, coffee3, coffee4],
      [tea1, tea2, tea3, tea4],
      [sports1, sports2, sports3, sports4],
    ];
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
