module.exports = {
  env: {
    browser: true,
    'jest/globals': true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended',
  ],
  plugins: ['react', 'jest', '@typescript-eslint'],
  parserOptions: {
    project: './tsconfig.validate.json'
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  },
  rules: {
    'arrow-parens': ['error', 'always'],
    'import/prefer-default-export': 'off',
    'no-plusplus': 'off',
    'no-nested-ternary': 'off',
    'import/no-extraneous-dependencies': ['off', {
      'devDependencies': ['**/setup-jest.js', '**/__tests__/**/*', '**/__stories__/**/*']
    }],
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'off',
    'import/extensions': ['error', 'ignorePackages', {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never'
    }],
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off'
  }
};
