// src/index.ts

import { NdaF64 } from './nda/nda-f64.js';

export const getArray = (shape: [1]) => {
  return new NdaF64(shape);
};
