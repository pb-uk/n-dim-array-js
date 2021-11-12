// src/nda/nda-f64.ts

// import { NdaFloatArray } from '../nda-float-array.js';

const createBuffer = (shape: number[]): Float64Array => {
  let length = 1;
  for (let i = 0; i < shape.length; ++i) {
    length *= shape[i];
  }
  return new Float64Array(length);
};

const calculateStrides = (shape: number[]): number[] => {
  let stride = 1;
  const strides = new Array(shape.length);
  for (let i = 0; i < shape.length; ++i) {
    strides[i] = stride;
    stride *= shape[i];
  }
  return strides;
};

export class NdaF64 {
  protected _shape: number[];
  protected _buffer: any;
  protected _strides: number[];

  constructor(shape = [1]) {
    this._shape = shape;
    this._strides = calculateStrides(shape);
    this._buffer = createBuffer(shape);
  }

  public get buffer() {
    return this._buffer;
  }

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

  /**
   * Get the element at an offset.
   *
   * @param indices The indices of the element.
   * @returns The value of the element specified by the indices.
   */
  getItemUnsafe(indices: number[]) {
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

  toFlatArray(): number[] {
    return Array.from(this._buffer.values());
  }
}
