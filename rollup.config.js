import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'

export default [
	{
		input: 'src/index.js',
		output: [
			{
				name: 'PutioAPI',
				file: pkg.browser,
				format: 'umd'
			},
			{
				file: pkg.main,
				format: 'cjs'
			},
			{
				file: pkg.module,
				format: 'es'
			}
		],
		plugins: [
			babel({
				exclude: 'node_modules/**'
			}),
			resolve({
				module: true,
				jsnext: true,
				main: true,
				browser: true,
			}),
			commonjs({
				include: 'node_modules/**'
			}),
			json(),
		]
	},
];