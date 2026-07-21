import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import reactPlugin from "eslint-plugin-react";
import jestPlugin from "eslint-plugin-jest";
import testingLibraryPlugin from "eslint-plugin-testing-library";
import babelParser from "@babel/eslint-parser";

export default defineConfig([
  {
    ignores: [
      "node_modules/**",
      "build/**",
      "coverage/**",
      "reports/**",
    ],
  },

  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      parser: babelParser,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
      },
    },

    plugins: {
      react: reactPlugin,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      ...reactPlugin.configs.recommended.rules,

      // React 17+ does not require `import React` for JSX.
      "react/react-in-jsx-scope": "off",
          "react/prop-types": "off",

    },
  },

  {
    files: [
      "**/*.test.{js,jsx}",
      "**/*.spec.{js,jsx}",
      "**/__tests__/**/*.{js,jsx}",
    ],

    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },

    plugins: {
      jest: jestPlugin,
      "testing-library": testingLibraryPlugin,
    },

    rules: {
      ...jestPlugin.configs.recommended.rules,
      ...testingLibraryPlugin.configs.react.rules,
      "testing-library/await-async-events": "off",

            // Disabled for this sample lab project.
      "react/prop-types": "off",
      "testing-library/await-async-utils": "off",
      "testing-library/no-wait-for-side-effects": "off",
      "jest/expect-expect": "off",
    },
  },
]);