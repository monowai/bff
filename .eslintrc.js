module.exports = {
  parser: "@typescript-eslint/parser",  // Specifies the ESLint parser
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
    sourceType: "module"  // Allows for the use of imports
  },
  "rules": {
    "strict": "error",
    "complexity": ["error", 5],
    "max-nested-callbacks": ["error", 3],
    "max-params": ["error", 4],
    "max-depth": ["error", 3],
    "max-len": [
      "error",
      {
        "code": 80,
        "ignoreStrings": true,
        "ignoreComments": true,
        "ignoreTemplateLiterals": true
      }
    ],
    "require-await": "error",
    "no-func-assign": "error",
    "object-shorthand": [
      "error",
      "methods",
      { "avoidExplicitReturnArrows": false }
    ],
    "object-curly-spacing": ["error", "always"],
    "prefer-const": ["error", {
      "destructuring": "any",
      "ignoreReadBeforeAssign": false
    }],
    "no-useless-return": "error",
    "no-else-return": "error",
    "no-return-await": "error",
    "no-var": "error"
  },
  "env": {
    "es6": true,
    "jest": true,
    "node": true
  }
};