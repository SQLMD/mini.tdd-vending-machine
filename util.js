const countCoins = function(coins) {
  return (
    coins["500"] * 500 +
    coins["100"] * 100 +
    coins["50"] * 50 +
    coins["10"] * 10
  );
};

module.exports = { countCoins };
