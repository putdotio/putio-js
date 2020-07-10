const { defaults } = require('jest-config')

module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, 'dist'],
  collectCoverageFrom: ['./src/middlewares/**', './src/utils/**'],
}
