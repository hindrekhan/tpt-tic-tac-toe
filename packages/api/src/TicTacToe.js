module.exports = class TicTacToe {
  constructor(fields = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]) {
    this.fields = fields;
    this.lastTurn = null;
  }

  victory() {
    let vic = null;
    this.fields.forEach((arr) => {
      let vicTmpX = true;
      let vicTmpO = true;
      arr.forEach((val) => {
        if (val !== 'X') {
          vicTmpX = false;
        }
        if (val !== '0') {
          vicTmpO = false;
        }
      });
      if (vicTmpX) {
        vic = 'X';
      }
      if (vicTmpO) {
        vic = '0';
      }
    });

    this.fields[0].forEach((v, index) => {
      if (this.fields[0][index] !== null
        && this.fields[0][index] === this.fields[1][index]
        && this.fields[1][index] === this.fields[2][index]) {
        vic = this.fields[0][index];
      }
    });

    if (this.fields[0][0] !== null
      && this.fields[0][0] === this.fields[1][1]
      && this.fields[1][1] === this.fields[2][2]) {
      return this.fields[1][1];
    }

    if (this.fields[0][2] !== null
      && this.fields[0][2] === this.fields[1][1]
      && this.fields[1][1] === this.fields[2][0]) {
      return this.fields[1][1];
    }

    return vic;
  }

  tie() {
    let isTie = false;

    this.fields.forEach((arr) => {
      arr.forEach((val) => {
        if (val === null || this.victory()) {
          isTie = false;
        } else if (val !== null) {
          isTie = true;
        }
      });
    });
    return isTie;
  }

  makeTurn(x, y, type) {
    switch (true) {
      case (this.victory() !== null):
        throw Error('Cant make turn when someone has won');
      case (this.tie()):
        throw Error('Cant make turn when tie');
      case (x < 0 || x > 2 || y < 0 || y > 2):
        throw Error('Not a valid coordinate');
      // eslint-disable-next-line no-restricted-globals
      case (isNaN(x) || isNaN(y)):
        throw Error('Bad input');
      case (parseInt(x, 10) !== x && parseInt(y, 10) !== y):
        throw Error('Bad input number (int only)');
      case (type !== 'X' && type !== 'O'):
        throw Error('Bad type');
      case (this.fields[+x][+y] !== null):
        throw Error('Spot is already used');
      case (this.lastTurn === type):
        throw Error('Same player makes double turn');      
      default:
        break;
    }
    this.fields[+x][+y] = type;
    this.lastTurn = type;
  }

  getFields() {
    return this.fields;
  }
};
