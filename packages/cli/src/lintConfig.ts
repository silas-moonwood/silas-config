import fs from 'fs-extra'
import { resolve } from 'pathe'
import pc from 'picocolors'

import { OX_LINT_CONFIG_TEMPLATE } from './constants'

const fileCreate = async (pluginsCode: string, lintConfigPath: string) => {
  console.log(pc.bgBlue('ℹ️ 开始创建 oxlint.config.ts'))
  console.log(pc.bgBlue('ℹ️ 插件配置:'))
  const finalContent = OX_LINT_CONFIG_TEMPLATE.replace('__PLUGINS__', pluginsCode)
  await fs.writeFile(lintConfigPath, finalContent, 'utf-8')
  console.log('✨ 已成功生成 oxlint.config.ts')
}

const fileUpdate = async (lintConfigPath: string, pluginsConfig: string[]) => {
  console.log(pc.bgBlue('ℹ️ 开始更新 oxlint.config.ts'))
  // 如果文件已存在，读取内容
  const existingContent = await fs.readFile(lintConfigPath, 'utf-8')

  // 这里你可以根据需要做正则替换，或者直接提示已存在
  console.log(pc.blue('ℹ️ 发现已存在的配置文件:'))
  const pluginsRegex = /plugins:\s*\[([\s\S]*?)\]/
  const match = existingContent.match(pluginsRegex)
  const oldPluginsRaw =
    (match?.[1] ?? '')
      .split(',')
      .map((s) => s.trim().replace(/['"]/g, '')) // 移除引号和空格
      .filter(Boolean) // 移除空值

  const combinedPlugins = Array.from(new Set([...oldPluginsRaw, ...pluginsConfig]))

  const updatedPluginsStr = `plugins: ${JSON.stringify(combinedPlugins, null, 2)}`

  const updatedContent = existingContent.replace(pluginsRegex, updatedPluginsStr)

  await fs.writeFile(lintConfigPath, updatedContent, 'utf-8')
}

export const updateLintConfig = async (pluginsConfig: string[]) => {
  const cwd = process.cwd()
  const lintConfigPath = resolve(cwd, 'oxlint.config.ts')
  const pluginsCode = JSON.stringify(pluginsConfig, null, 2)

  try {
    // 3. 检查文件是否存在
    const isExist = await fs.pathExists(lintConfigPath)
    if (isExist) {
      // 4. 更新配置
      await fileUpdate(lintConfigPath, pluginsConfig)
    } else {
      await fileCreate(pluginsCode, lintConfigPath)
    }
  } catch (err) {
    console.error('❌ 操作文件系统时出错:', err)
  }
}
