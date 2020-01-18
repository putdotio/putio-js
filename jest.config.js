const { defaults } = require('jest-config')

module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: [...defaults.testPathIgnorePatterns, 'dist'],
}
