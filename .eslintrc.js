module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    // airbnb rules
    'airbnb',
    // eslint TypeScript rules (github.com/typescript-eslint/typescript-eslint)
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    // eslint react rules (github.com/yannickcr/eslint-plugin-react)
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    // Prettier plugin
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
    // accessibility plugin
    'plugin:jsx-a11y/recommended',
  ],
  rules: {
    // With this we don't need Prettier plugin since we let eslint manage .prettierrc.js rules
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true,
      },
    ],

    // Next.js doesn't require react in scope
    'react/react-in-jsx-scope': 'off',

    // We will use href prop in Next.js's Link component instead of anchor tag
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'react/no-unescaped-entities': 'off',

    // We turn off prop-types rule, as we will use TypeScript's types instead.
    'react/prop-types': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'import/extensions': 'off',
    'react/jsx-props-no-spreading': ['error', { custom: 'ignore' }],
    'import/prefer-default-export': 'off',
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': ['warn'],
      },
    },
  ],
  plugins: ['@typescript-eslint', 'react', 'prettier', 'simple-import-sort'],
  settings: {
    react: {
      version: 'detect',
    },
    // TypeScript needs this to resolve nextjs absolute imports
    'import/resolver': {
      typescript: {
        project: '.',
      },
    },
  },
};
