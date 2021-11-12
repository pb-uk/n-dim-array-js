// src/nda-typed-array.ts

import { NDimArray } from '../n-dim-array';

type BufferType = Float64Array | Float32Array;

export class NdaTypedArray extends NDimArray {
  protected _buffer: Float64Array | Float32Array;

  constructor(shape: number[], createBuffer: (length: number) => BufferType) {
    super(shape);
    this._buffer = createBuffer(this._length);
  }

  public get buffer() {
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
}
