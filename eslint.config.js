import js from "@eslint/js";
import parserTs from "@typescript-eslint/parser";
import pluginTs from "@typescript-eslint/eslint-plugin";

export default [
  js.configs.recommended,

  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        project: "./tsconfig.eslint.json",
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": pluginTs,
    },
    rules: {
      ...pluginTs.configs.recommended.rules,
    },
  },
];
