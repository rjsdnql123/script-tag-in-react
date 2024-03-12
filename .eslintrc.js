module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  rules: {
    "no-var": "warn",
    eqeqeq: "warn",
    "react/prop-types": 0,
    "no-extra-semi": "error",
    "react/jsx-filename-extension": [2, { extensions: [".ts", ".tsx"] }],
    "arrow-parens": ["warn", "as-needed"],
    "no-unused-vars": ["error"],
    "no-console": ["off"],
    "import/prefer-default-export": ["off"],
    "react-hooks/exhaustive-deps": ["warn"],
    "react/jsx-pascal-case": "warn",
    "no-debugger": "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "react/function-component-definition": [
      2,
      { namedComponents: ["arrow-function", "function-declaration"] }
    ],
    "react/react-in-jsx-scope": 0,
    "react/prefer-stateless-function": 0,
    "react/jsx-one-expression-per-line": 0,
    "no-nested-ternary": 0,
    "react/jsx-curly-brace-presence": [
      "warn",
      { props: "always", children: "always" }
    ],
    "import/no-unresolved": ["error", { caseSensitive: false }],
    "react/jsx-props-no-spreading": [1, { custom: "ignore" }],
    "linebreak-style": 0,
    "import/extensions": 0,
    "no-use-before-define": 0,
    "import/no-extraneous-dependencies": 0,
    "no-shadow": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "prettier/prettier": [
      "error",
      {
        printWidth: 80,
        tabWidth: 4,
        singleQuote: false,
        trailingComma: "none",
        bracketSpacing: false,
        semi: true,
        useTabs: false,
        parser: "babylon",
        jsxBracketSameLine: false
      }
    ]
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
};
