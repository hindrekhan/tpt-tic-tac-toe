const sum = require('../src/sum');

describe('sum', () => {
  it('2+3=5', () => {
    expect(sum(2, 3)).toBe(5);
  });
});
