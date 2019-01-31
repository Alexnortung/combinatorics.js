module.exports = {
  factorial: function (x) {

    if (x === 0 || x === 1) return 1;
    for (var i = x - 1; i >= 1; i--) {
      x *= i;
    }
    return x;
  }
}
