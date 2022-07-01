module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    eqeqeq: 'off',
    'no-prototype-builtins': 'off',
    semi: ['error', 'never'],
    'object-curly-newline': ['error', 'always'],
    'prettier/prettier': [
      'error',
      {
        "endOfLine": "auto",
      },
    ],
    'vue/valid-v-slot': ['error', {
      "allowModifiers": true,
    }],
  },
}
