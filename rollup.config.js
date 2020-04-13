import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import filesize from 'rollup-plugin-filesize'
import pkg from './package.json'

export default [
  {
    external: ['axios', 'event-emitter', 'urijs', 'js-base64'],
    input: 'src/index.ts',
    output: [
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
