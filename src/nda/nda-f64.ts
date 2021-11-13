// src/nda/nda-f64.ts

import { NDimArray } from '../n-dim-array';

const createBuffer = (length: number): Float64Array => {
  return new Float64Array(length);
};

const nestArrayLevel = (
  buffer: Float64Array,
  shape: number[],
  strides: number[],
  dimension: number,
  offset: number
) => {
  if (dimension === 0) {
    const values = Array(shape[0]);
    for (let i = 0; i < shape[0]; ++i) {
      values[i] = buffer[offset];
      offset += 1;
    }
    return values;
  }

  const nested = Array(shape[dimension]);

  for (let i = 0; i < shape[dimension]; ++i) {
    nested[i] = nestArrayLevel(buffer, shape, strides, dimension - 1, offset);
    offset += strides[dimension];
  }

  return nested;
};

export class NdaF64 extends NDimArray {
  protected _buffer: Float64Array;

  constructor(shape?: number[]) {
    super(shape);
    this._buffer = createBuffer(this._length);
  }

  public get buffer(): Float64Array {
    return this._buffer;
  }

  /**
   * Get the element at an offset.
   *
   * @param indices The indices of the element.
   * @returns The value of the element specified by the indices.
   */
  getItemUnsafe(indices: number[]): number {
    return this._buffer[this.getOffsetUnsafe(indices)];
  }

  /**
   * Set the value of the element at an offset.
   *
   * @param indices The indices of the element.
   * @param value The value to set.
   */
  setItemUnsafe(indices: number[], value: number): void {
    this._buffer[this.getOffsetUnsafe(indices)] = value;
  }

  /**
   * Get the elements as a flattened array.
   *
   * @returns An ordinary JS Array listing the elements.
   */
  toFlatArray(): number[] {
    return Array.from(this._buffer.values());
  }

  /**
   * Get the elements as a nested array.
   *
   * @returns An ordinary JS Array containing nested arrays listing the elements.
   */
  toNestedArray(): Array<[]> {
    return nestArrayLevel(
      this._buffer,
      this._shape,
      this._strides,
      this._shape.length - 1,
      0
    );
  }

  AddScalarUnsafe(b: number, result: NdaF64): NdaF64 {
    const c = result;
    const cBuffer: Float64Array = c.buffer;
    for (let i = 0; i < this._length; ++i) {
      cBuffer[i] = this._buffer[i] + b;
    }
    return c;
  }

  iAddScalarUnsafe(b: number): void {
    for (let i = 0; i < this._length; ++i) {
      this._buffer[i] = this._buffer[i] + b;
    }
  }

  addUnsafe(b: NdaF64, result: NdaF64): NdaF64 {
    const bBuffer = b.buffer;
    const c = result;
    const cBuffer: Float64Array = c.buffer;
    for (let i = 0; i < this._length; ++i) {
      cBuffer[i] = this._buffer[i] + bBuffer[i];
    }
    return c;
  }

  iAddUnsafe(b: NdaF64): void {
    const bBuffer = b.buffer;
    for (let i = 0; i < this._length; ++i) {
      this._buffer[i] += bBuffer[i];
    }
  }

  *getGenerator() {
    for (let i = 0; i < this._buffer.length; ++i) {
      yield this._buffer[i];
    }
  }
}
