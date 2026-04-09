const OX_LINT_CONFIG_TEMPLATE = `import { lintConfig } from '@silas-moonwood/oxc-config'
import { defineConfig } from 'oxlint'

export default defineConfig({
  plugins: __PLUGINS__,
  ...lintConfig,
})
`.trim()

const OX_FMT_CONFIG_TEMPLATE = `import { fmtConfig } from '@silas-moonwood/oxc-config'
import { defineConfig } from 'oxfmt'

export default defineConfig(fmtConfig)
`.trim()

export { OX_LINT_CONFIG_TEMPLATE, OX_FMT_CONFIG_TEMPLATE }
