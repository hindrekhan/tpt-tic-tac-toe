const TicTacToe = require('../src/TicTacToe');

describe('TicTacToe', () => {
  it('2,3 X', () => {
    const t = new TicTacToe();
    t.makeTurn(0, 2, 'X');
    expect(t.getFields()[0][2]).toBe('X');
    expect(t.getFields()).toMatchSnapshot();
  });

  it('same turn two times', () => {
    const t = new TicTacToe();
    t.makeTurn(0, 2, 'X');
    expect(() => {
      t.makeTurn(0, 2, 'X');
    }).toThrow('spot already used');
  });

  it('not a valid coordinate', () => {
    const t = new TicTacToe();
    expect(() => {
      t.makeTurn(0, 5, 'X');
    }).toThrow('not a valid coordinate');
  });

  it('bad input strings', () => {
    const t = new TicTacToe();
    expect(() => {
      t.makeTurn('x', 'b', 'X');
    }).toThrow('bad input');
  });

  it('bad type', () => {
    const t = new TicTacToe();
    expect(() => {
      t.makeTurn(1, 1, 'xx');
    }).toThrow('bad type');
  });

  it('not integer number', () => {
    const t = new TicTacToe();
    expect(() => {
      t.makeTurn(1.4, '1.56', 'O');
    }).toThrow('bad input number (int only)');
  });

  it('victory 1 - side', () => {
    const t = new TicTacToe();
    t.makeTurn(0, 0, 'X');
    expect(t.victory()).toBe(null);
    t.makeTurn(1, 0, 'O');
    expect(t.victory()).toBe(null);
    t.makeTurn(0, 1, 'X');
    expect(t.victory()).toBe(null);
    t.makeTurn(1, 1, 'O');
    expect(t.victory()).toBe(null);
    t.makeTurn(0, 2, 'X');
    expect(t.getFields()).toMatchSnapshot();
    expect(t.victory()).toBe('X');
  });

  it('victory 2 - up/down', () => {
    const t = new TicTacToe();
    t.makeTurn(0, 0, 'X');
    expect(t.victory()).toBe(null);
    t.makeTurn(0, 1, 'O');
    expect(t.victory()).toBe(null);
    t.makeTurn(1, 1, 'X');
    expect(t.victory()).toBe(null);
    t.makeTurn(1, 0, 'O');
    expect(t.victory()).toBe(null);
    t.makeTurn(2, 2, 'X');
    expect(t.getFields()).toMatchSnapshot();
    expect(t.victory()).toBe('X');
  });

  it('victory 3 - diagonal 1', () => {
    const t = new TicTacToe();
    t.makeTurn(0, 0, 'X');
    expect(t.victory()).toBe(null);
    t.makeTurn(0, 1, 'O');
    expect(t.victory()).toBe(null);
    t.makeTurn(1, 1, 'X');
    expect(t.victory()).toBe(null);
    t.makeTurn(1, 2, 'O');
    expect(t.victory()).toBe(null);
    t.makeTurn(2, 2, 'X');
    expect(t.getFields()).toMatchSnapshot();
    expect(t.victory()).toBe('X');
  });

  it('victory 3 - diagonal 2', () => {
    const t = new TicTacToe([
      [null, null, 'O'],
      [null, 'O', null],
      ['O', null, null],
    ]);
    expect(t.victory()).toBe('O');
  });

  it('isTie', () => {
    const t = new TicTacToe([
      ['O', 'X', 'O'],
      ['X', 'X', 'O'],
      ['O', 'O', 'X'],
    ]);
    expect(t.tie()).toBe(true);
  });

  it('!isTie', () => {
    const t = new TicTacToe([
      ['X', 'O', 'X'],
      ['X', 'X', null],
      ['O', 'O', 'X'],
    ]);
    expect(t.tie()).toBe(false);
});
});
