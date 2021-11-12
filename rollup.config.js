// rollup/config.js

const camelCase = require('camelcase');
const pkg = require('./package.json');
import typescript from '@rollup/plugin-typescript';

// Human timestamp for banner.
const datetime = new Date().toISOString().substring(0, 19).replace('T', ' ');

const pkgName = pkg.name.replace(/@.*\//, '');

// Main banner.
const banner = `/*! ${pkgName} v${pkg.version} ${datetime}
 *  ${pkg.homepage}
 *  Copyright ${pkg.author} ${pkg.license} license.
 */
`;

export default {
  input: 'esm/dist/index.js',
  output: {
    banner,
    sourcemap: true,
    file: pkg.main,
    format: 'iife',
    name: camelCase(pkgName, { pascalCase: true }),
  }
};
