export default {
  coverageDirectory: 'target/coverage',
  testMatch: ['<rootDir>/src/**/__tests__/?(*.)+(spec|test).js'],
  // "transform": {
  //   "^.+\\.jsx?$": "babel-jest",
  // },
  transformIgnorePatterns: ['<rootDir>/(node_modules)'],
};
