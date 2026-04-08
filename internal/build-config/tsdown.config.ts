import { defineConfig } from 'tsdown'

import { tsDownConfig } from './src/index.ts'

export default defineConfig({
  entry: './src/index.ts',
  ...tsDownConfig
})
