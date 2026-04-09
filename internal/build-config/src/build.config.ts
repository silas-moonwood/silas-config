import { type UserConfig } from 'tsdown'

export const buildConfig: UserConfig = {
  format: ['esm'],
  dts: true,
  deps: {
    skipNodeModulesBundle: true
  }
}
