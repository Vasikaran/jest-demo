let add = (a, b) => {
  return a + b;
};

describe('Sample group', () => {
  it('Sample test case', () => {
    expect(add(1, 2)).toEqual(3);
  });

  it('Sample test case2', () => {
    expect(add(1, 4)).toEqual(5);
  });
});
