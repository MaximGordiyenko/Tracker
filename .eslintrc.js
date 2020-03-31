module.exports = {
  'env': {
    'browser': false,
    'es6': true,
    'node': true,
  },
  'extends': 'eslint:recommended',
  'globals': {
    '__dirname': 'readonly',
    'process': 'readonly',
    'require': 'readonly',
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'rules': {
    indent: ['error', 2],
    semi: ['error', 'always'],
    'no-unused-vars': ['error', { 'args': 'none' }],
    'no-multi-spaces': 'error',
    'eol-last': ["error", "always"],
    'newline-before-return': "error",
    'no-multiple-empty-lines': ["error", { "max": 2, "maxBOF": 1}]
  },
};