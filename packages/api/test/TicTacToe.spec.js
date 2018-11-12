const TicTacToe = require('../src/TicTacToe');

expect.addSnapshotSerializer({
  test: val => Array.isArray(val) && val.length === 3,
  print: val => val.map(
    val2 => val2.map(v => v || '-').join('|'),
  ).join('\n'),
});

describe('TicTacToe', () => {
  it('makeTurn(2,3,X) test', () => {
    const t = new TicTacToe();
    t.makeTurn(0, 2, 'X');
    expect(t.getFields()[0][2]).toBe('X');
    expect(t.getFields()).toMatchSnapshot();
  });

  it('Spot already used test', () => {
    const t = new TicTacToe();
    t.makeTurn(0, 2, 'X');
    expect(() => {
      t.makeTurn(0, 2, 'X');
    }).toThrow('Spot is already used');
  });

  it('Not a valid coordinate test', () => {
    const t = new TicTacToe();
    expect(() => {
      t.makeTurn(0, 5, 'X');
    }).toThrow('Not a valid coordinate');
  });

  it('bad input test', () => {
    const t = new TicTacToe();
    expect(() => {
      t.makeTurn('x', 'b', 'X');
    }).toThrow('Bad input');
  });

  it('bad type test', () => {
    const t = new TicTacToe();
    expect(() => {
      t.makeTurn(1, 1, 'xx');
    }).toThrow('Bad type');
  });

  it('Bad input number test', () => {
    const t = new TicTacToe();
    expect(() => {
      t.makeTurn(1.4, '1.56', 'O');
    }).toThrow('Bad input number (int only)');
  });

  it('Victory 1 - side', () => {
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

  it('Victory 2 - up/down', () => {
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

  it('Victory 3 - diagonal 1', () => {
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

  it('Victory 3 - diagonal 2', () => {
    const t = new TicTacToe([
      [null, null, 'O'],
      [null, 'O', null],
      ['O', null, null],
    ]);
    expect(t.getFields()).toMatchSnapshot();
    expect(t.victory()).toBe('O');
  });

  it('isTie test', () => {
    const t = new TicTacToe([
      ['O', 'X', 'O'],
      ['X', 'X', 'O'],
      ['O', 'O', 'X'],
    ]);
    expect(t.tie()).toBe(true);
  });

  it('isTie is false test', () => {
    const t = new TicTacToe([
      ['X', 'O', 'X'],
      ['X', 'X', null],
      ['O', 'O', 'X'],
    ]);
    expect(t.tie()).toBe(false);
  });

  it('same player double turn error', () => {
    const t = new TicTacToe();
    t.makeTurn(0, 0, 'X');
    expect(t.victory()).toBe(null);    
    expect(() => {     
      t.makeTurn(0, 1, 'X'); 
    }).toThrow('Same player makes double turn');
  });

  
  it('Cant make turn when tie', () => {
    const t = new TicTacToe([
      ['O', 'X', 'O'],
      ['X', 'X', 'O'],
      ['O', 'O', 'X'],
    ]);
    expect(t.tie()).toBe(true);
    expect(() => {     
      t.makeTurn(0, 1, 'X'); 
    }).toThrow('Cant make turn when tie');
  });
});
