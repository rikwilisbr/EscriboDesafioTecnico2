module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: 'standard',
  overrides: [
    {
      files: ['**/*.test.js', '**/*.spec.js'],
      env: {
        jest: true
      },
      parserOptions: {
        sourceType: 'module'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
  }
}
