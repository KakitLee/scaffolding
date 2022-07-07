const setupFiles = [
   //'<rootDir>/jest.mock.moment.js'
];

export default {
  coverageDirectory: 'target/coverage',
  setupFiles,
  testMatch: ['<rootDir>/src/**/__tests__/?(*.)+(spec|test).js'],
  // "transform": {
  //   "^.+\\.jsx?$": "babel-jest",
  // },
  transformIgnorePatterns: ['<rootDir>/(node_modules)'],
};
