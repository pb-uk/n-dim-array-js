// src/index.ts

import { NdaF64 } from './nda/nda-f64.js';
import { NdaC128 } from './nda/nda-c128.js';

type NDimArrayOptions = {
  type?: string;
};

const defaults: NDimArrayOptions = {};

export const getFloatArray = (shape: [1], options: NDimArrayOptions = {}) => {
  const settings = { ...defaults, ...options };
  return new NdaF64(shape);
};
