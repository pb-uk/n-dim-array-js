// src/nda/nda-f64.ts

import { NdaFloatArray } from './nda-float-array';

const createBuffer = (length: number): Float64Array => {
  return new Float64Array(length);
};

export class NdaF64 extends NdaFloatArray {
  constructor(shape = [1]) {
    super(shape, createBuffer);
  }
}
