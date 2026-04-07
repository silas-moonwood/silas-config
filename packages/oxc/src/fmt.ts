import { defineConfig } from 'oxfmt'

export const fmtConfig = defineConfig({
  ignorePatterns: ['node_modules', 'dist', 'public', 'build', '.nuxt/**/*', '.output/**/*'],
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'none',
  sortImports: true,
  sortTailwindcss: true,
  jsdoc: true
})
