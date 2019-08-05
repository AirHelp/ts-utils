module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['node_modules'],
  testMatch: [ '**/__tests__/**/*.test.ts?(x)']
};