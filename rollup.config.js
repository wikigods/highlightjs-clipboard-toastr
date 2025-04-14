import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
    input: [
        'build/js/hl-clip-toast.js',
        'build/js/example.js'
    ],
    output: [
        {
            dir: 'dist/js',
            // format: 'esm',
            sourcemap: true,
            chunkFileNames: '[name]-[hash].js',
        },
        {
            dir: 'dist/js',
            // format: 'esm',
            sourcemap: true,
            chunkFileNames: '[name]-[hash].min.js',
            entryFileNames: '[name].min.js',
            plugins: [terser()]
        }
    ],
    plugins: [
        resolve(),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
            presets: ['@babel/preset-env'],
            babelHelpers: 'bundled',
        }),
        terser(),
    ],
};
