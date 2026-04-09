import { tsDownConfig } from '@silas-moonwood/build-config'
import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: './src/index.ts',
  ...tsDownConfig
})
