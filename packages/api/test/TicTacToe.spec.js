const TicTacToe = require('../src/TicTacToe');

describe('TicTacToe', () => {

    it('2,3 x', () => {
        const t = new TicTacToe();
        t.makeTurn(0,2,'x');
        expect(t.getFields()[0][2]).toBe('x');
        expect(t.getFields()).toMatchSnapshot();
    });

    it('same turn two times', () => {
        const t = new TicTacToe();
        t.makeTurn(0,2,'x');
        expect(() => {
            t.makeTurn(0,2,'x');
        }).toThrow('spot already used');
    });

    it('not a valid coordinate', () => {
        const t = new TicTacToe();
        expect(() => {
            t.makeTurn(0,5,'x');
        }).toThrow('not a valid coordinate');
    });
    

  });
  