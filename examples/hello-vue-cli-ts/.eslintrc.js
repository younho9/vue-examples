module.exports = {
  extends: [
    '../../.eslintrc.js',
    '@vue/typescript/recommended',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
  },
};
