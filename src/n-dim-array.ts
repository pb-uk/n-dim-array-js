// src/n-dim-array.ts

/**
 * Calculate the strides from the array's shape.
 *
 * @param shape The shape.
 * @returns The array of stride lengths and the total length.
 */
const calculateStrides = (shape: number[]): [number[], number] => {
  let stride = 1;
  const strides = new Array(shape.length);
  for (let i = 0; i < shape.length; ++i) {
    strides[i] = stride;
    stride *= shape[i];
  }
  return [strides, stride];
};

export class NDimArray {
  protected _shape: number[];

  protected _strides: number[];
  protected _length: number;

  constructor(shape = [1]) {
    this._shape = shape;
    const size = calculateStrides(shape);
    [this._strides, this._length] = size;
  }

  /**
   * Get the (flattened) length of the array.
   */
  public get length() {
    let length = 1;
    for (let i = 0; i < this._shape.length; ++i) {
      length *= this._shape[i];
    }
    return length;
  }

  /**
   * The strides relating to the array's shape.
   */
  public get strides() {
    return this._strides;
  }

  /**
   * Get the offset for an element without checks.
   *
   * @param indices The indices to be compiled into an offset.
   * @returns The offset of the element specified by the indices.
   */
  getOffsetUnsafe(indices: number[]): number {
    let index = 0;
    for (let i = 0; i < this._shape.length; ++i) {
      index += this.strides[i] * indices[i];
    }
    return index;
  }
}
