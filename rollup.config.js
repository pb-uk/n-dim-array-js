// rollup/config.js

/**
 * Notes:
 * - Rollup builds a cjs module and a minified iife build for the browser.
 * - ES module build and types are handled by Typescript.
 */

import camelCase from 'camelcase';
import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

// Human timestamp for banner.
const datetime = new Date().toISOString().substring(0, 19).replace('T', ' ');

const pkgName = pkg.name.replace(/@.*\//, '');

// Add a banner to the generated files.
const banner = `/*! ${pkgName} v${pkg.version} ${datetime}
 *  ${pkg.homepage}
 *  Copyright ${pkg.author} ${pkg.license} license.
 */
`;

const input = 'src/index.ts';

export default [
  {
    // IIFE browser build.
    input,
    output: {
      banner,
      sourcemap: true,
      file: pkg.browser,
      format: 'iife',
      name: camelCase(pkgName, { pascalCase: true }),
    },
    plugins: [
      typescript({
        module: 'esnext',
      }),
      terser(),
    ],
  },
  {
    // Common JS module build.
    input,
    output: {
      banner,
      sourcemap: true,
      file: pkg.main,
      format: 'cjs',
    },
    plugins: [
      typescript({
        module: 'esnext',
      }),
    ],
  },
];
