const { defaults } = require('jest-config')

module.exports = {
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  testEnvironment: 'node',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
}
