module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  extends: ['eslint:recommended', 'airbnb'],
  parser: 'babel-eslint',

  plugins: [
    'react',
    'jest',
  ],

  rules: {
    'arrow-parens': ['error', 'always'],
    'react/no-did-update-set-state': 'off',
    'no-plusplus': 'off',
    'no-nested-ternary': 'off',

    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: [
          __dirname,
          './packages/react-paginator',
        ],

        devDependencies: [
          '**/__tests__/**/*',
          '**/__stories__/**/*',
        ],
      },
    ],

    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'off',
  },
};
