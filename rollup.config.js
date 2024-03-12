
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const extensions = [ 'js', 'jsx', 'ts', 'tsx', 'mjs' ];

const pkg = require('./package.json')

const config = [
	{
		external: [ 'react' ],
		input: './src/index.tsx',
		output: [
            {
                file: pkg.main,
                format: 'cjs',
                sourcemap: true,
              },
              {
                file: pkg.module,
                format: 'esm',
                sourcemap: true,
              },
		],
		plugins: [
			nodeResolve({ extensions }),
			babel({
				exclude: 'node_modules/**',
				extensions,
				include: [ 'src/**/*' ],
				presets: ['@babel/preset-env', '@babel/preset-react'],
			}),
			commonjs({ include: 'node_modules/**' }),
			peerDepsExternal(),
			typescript({ tsconfig: './tsconfig.json' }),
		]
	}
];

export default config;