import fs from 'fs-extra'
import { resolve } from 'pathe'
import pc from 'picocolors'

import { OX_FMT_CONFIG_TEMPLATE } from './constants'

export const updateFmtConfig = async () => {
  const cwd = process.cwd()
  const fmtConfigPath = resolve(cwd, 'oxfmt.config.ts')
  console.log(pc.bgBlue('ℹ️ 开始创建 oxfmt.config.ts'))
  await fs.writeFile(fmtConfigPath, OX_FMT_CONFIG_TEMPLATE, 'utf-8')
  console.log('✨ 已成功生成 oxfmt.config.ts')
}
