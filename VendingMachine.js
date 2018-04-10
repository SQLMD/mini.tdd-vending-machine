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
  }

  insertCoin(coin) {
    if (this.till.hasOwnProperty(coin)) {
      this.till[coin] += 1;
      this.balance += coin;
    }
  }
}
module.exports = VendingMachine;
