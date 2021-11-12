// src/index.ts

import { NDimArray } from './n-dim-array.js';

export const getArray = (shape: [1]) => {
  return new NDimArray(shape);
};
