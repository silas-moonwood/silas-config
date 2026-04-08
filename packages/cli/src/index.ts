#!/usr/bin/env node
import { outro, multiselect, confirm, isCancel, spinner, intro } from '@clack/prompts'
import cac from 'cac'
import pc from 'picocolors'

import { updateFmtConfig } from './fmtConfig.js'
import { updateLintConfig } from './lintConfig.js'

const cli = cac('silas-cli')
cli.command('init', '初始化 OXC 配置文件').action(async () => {
  intro(pc.bgCyan(pc.black(' Silas Config System ')))

  // 1. 插件多选
  const plugins = await multiselect({
    message: '选择需要启用的 Lint 插件:',
    options: [
      { value: 'typescript', label: 'TypeScript', hint: '推荐' },
      { value: 'vue', label: 'Vue' },
      { value: 'react', label: 'React' },
      { value: 'unicorn', label: 'Unicorn' },
      { value: 'import', label: 'Import' },
      { value: 'vitest', label: 'Vitest' }
    ]
  })

  if (isCancel(plugins)) {
    outro(pc.yellow('操作已取消'))
    process.exit(0)
  }

  // 2. 是否启用格式化配置
  const useFmt = await confirm({
    message: '是否同步生成 oxfmt.config.ts 格式化配置?',
    initialValue: true
  })

  if (isCancel(useFmt)) {
    outro(pc.yellow('操作已取消'))
    process.exit(0)
  }

  // 3. 执行任务并显示状态
  const s = spinner()
  s.start('正在生成配置文件...')

  try {
    const tasks = [updateLintConfig(plugins)]

    if (useFmt) {
      // 可以在这里传入默认的格式化选项
      tasks.push(updateFmtConfig())
    }

    await Promise.all(tasks)

    s.stop(pc.green('配置文件处理完成！'))

    outro(pc.bgGreen(pc.black(' DONE ')) + pc.green(' 所有的 OXC 配置已就绪，开启高效开发吧！'))
  } catch (error) {
    s.stop(pc.red('生成失败'))
    console.error(error)
    process.exit(1)
  }
})

// 默认命令提示
cli.help()
cli.version('1.0.0')

// 只有在没有子命令时才显示帮助，或者解析执行命令
cli.parse()

if (!cli.matchedCommand && !cli.options.help && !cli.options.version) {
  cli.outputHelp()
}
