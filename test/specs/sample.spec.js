import { expect } from 'chai';

import add from 'Src/index.js';


describe('This test', () => {
  it('should run', () => {
    expect(add(2, 2)).to.equal(4);
  });
});
