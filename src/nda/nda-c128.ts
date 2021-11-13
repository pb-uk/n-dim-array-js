// src/nda/nda-f64.ts

import { NdaF64 } from './nda-f64';

export class NdaC128 extends NdaF64 {
  constructor(shape = [2, 1]) {
    super(shape);
  }
}
