import { expect } from 'chai';
import { NdaF64 } from '../../src/nda/nda-f64';

describe('NDimensionalArray', function () {
  describe('The constructor', function () {
    it('should create an array of 1 element by default', function () {
      const arr = new NdaF64();
      expect(arr.getItemUnsafe([0])).to.equal(0);
    });

    it('should create a 2D array', function () {
      const arr = new NdaF64([3, 4]);
      let item = 1;
      for (let j = 0; j < 4; ++j) {
        for (let i = 0; i < 3; ++i) {
          arr.setItemUnsafe([i, j], item);
          ++item;
        }
      }
      expect(arr.toFlatArray()).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    });

    it('should create a 3D array', function () {
      const arr = new NdaF64([2, 3, 4]);
      let item = 1;
      const expected = [];
      for (let k = 0; k < 4; ++k) {
        for (let j = 0; j < 3; ++j) {
          for (let i = 0; i < 2; ++i) {
            arr.setItemUnsafe([i, j, k], item);
            expected.push(item);
            ++item;
          }
        }
      }
      expect(arr.toFlatArray()).to.eql(expected);
    });
  });
});
