import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import css from "@eslint/css";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } },
  
]);
