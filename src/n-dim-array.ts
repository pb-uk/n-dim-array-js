// src/n-d-array.ts

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

export class NDimArray {
  protected shape: number[];
  protected buffer: Float64Array;
  protected strides: number[];

  constructor(shape = [1]) {
    this.shape = shape;
    this.strides = calculateStrides(shape);
    this.buffer = createBuffer(shape);
  }

  throwError() {
    throw new Error('This is not the method you are looking for');
  }

  getIndexOf(indices: number[]) {
    let index = 0;
    for (let i = 0; i < this.shape.length; ++i) {
      index += this.strides[i] * indices[i];
    }
    return index;
  }

  getItem(indices: number[]) {
    return this.buffer[this.getIndexOf(indices)];
  }

  setItem(indices: number[], value: number) {
    this.buffer[this.getIndexOf(indices)] = value;
  }

  toFlatArray(): number[] {
    return Array.from(this.buffer.values());
  }
}
