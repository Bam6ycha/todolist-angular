module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: "module"
  },
  plugins: ["@typescript-eslint"],
  rules: {
    quotes: ["error", "double"]
  }
};
