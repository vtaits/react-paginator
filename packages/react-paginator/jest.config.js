module.exports = {
  testPathIgnorePatterns: [
    '/node_modules/',
  ],

  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  transform: {
    '\\.tsx?$': [
      'ts-jest',
    ],
  },
};
