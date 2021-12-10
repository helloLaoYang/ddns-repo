import typescript from '@rollup/plugin-typescript'
import { uglify } from 'rollup-plugin-uglify'

const uglifyJs = function (options = {}) {
  return uglify(options)
}

const plugins = [
  typescript(),
  uglifyJs(),
]

// rollup.config.js
export default {
  input: 'src/index.ts',
  plugins,
  external: [
    'path',
    'stream',
    'url',
    'http',
    'fs',
    'util',
    'events',
    'os',
    'querystring',
    'net',
    'tty',
    'crypto',
    'assert',
    'process',
    'dgram',
    'buffer',
    'https',
    'zlib',
    'tls',
  ],
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    sourcemap: true,
  },
}