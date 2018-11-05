module.exports = class TicTacToe {
  constructor() {
    this.fields = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  }

  makeTurn(x, y, type) {
    if (this.fields[x][y] !== null) {
      throw Error('spot already used');
    }

    this.fields[x][y] = type;
  }

  getFields() {
    return this.fields;
  }
};
