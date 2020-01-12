import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'
import pkg from './package.json'

export default [
  {
    external: ['axios'],
    input: 'src/index.ts',
    output: [
      {
        name: 'PutioAPI',
        file: pkg.browser,
        format: 'umd',
        globals: { axios: 'axios' },
        plugins: [terser()],
      },
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
      },
      {
        file: pkg.module,
        format: 'es',
        exports: 'named',
      },
    ],
    plugins: [
      typescript({ useTsconfigDeclarationDir: true }),
      resolve({
        mainFields: ['jsnext', 'browser'],
        preferBuiltins: true,
      }),
      json(),
      commonjs({ include: 'node_modules/**' }),
      filesize(),
    ],
  },
]
