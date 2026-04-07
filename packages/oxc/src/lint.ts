import { defineConfig, type OxlintConfig } from 'oxlint'

const plugins: OxlintConfig['plugins'] = [
  'eslint',
  'typescript',
  'unicorn',
  'oxc',
  'jsx-a11y',
  'jsdoc',
  'react',
  'vitest',
  'vue',
  'import'
]

const oxcConfigs: OxlintConfig['rules'] = {
  'oxc/approx-constant': 'error',
  'oxc/bad-bitwise-operator': 'error',
  'oxc/no-this-in-exported-function': 'error',
  'oxc/double-comparisons': 'error'
}

const jsxA11yConfigs: OxlintConfig['rules'] = {
  'jsx-a11y/anchor-has-content': 'error',
  'jsx-a11y/aria-props': 'error',
  'jsx-a11y/aria-unsupported-elements': 'error',
  'jsx-a11y/no-aria-hidden-on-focusable': 'error',
  'jsx-a11y/no-redundant-roles': 'error',
  'jsx-a11y/aria-role': 'error'
}

const typeScriptConfigs: OxlintConfig['rules'] = {
  'typescript/array-type': 'error',
  'typescript/await-thenable': 'error',
  'typescript/no-confusing-void-expression': 'error',
  'typescript/no-unsafe-function-type': 'error',
  'typescript/promise-function-async': 'error'
}

const vueConfigs: OxlintConfig['rules'] = {
  'vue/no-deprecated-destroyed-lifecycle': 'error',
  'vue/prefer-import-from-vue': 'error',
  'vue/no-arrow-functions-in-watch': 'error',
  'vue/no-export-in-script-setup': 'error',
  'vue/no-import-compiler-macros': 'error',
  'vue/no-lifecycle-after-await': 'error',
  'vue/no-multiple-slot-args': 'error',
  'vue/no-required-prop-with-default': 'error',
  'vue/no-this-in-before-route-enter': 'error',
  'vue/require-default-export': 'error',
  'vue/require-typed-ref': 'error',
  'vue/valid-define-emits': 'error',
  'vue/valid-define-props': 'error',
  'vue/define-props-declaration': ['error', 'type-based'],
  'vue/define-emits-declaration': ['error', 'type-based'],
  'vue/max-props': [
    'error',
    {
      maxProps: 5
    }
  ]
}

const otherConfigs: OxlintConfig['rules'] = {
  'unicorn/prefer-type-error': 'error',
  'unicorn/prefer-array-flat': 'error',
  'unicorn/prefer-native-coercion-functions': 'error',
  'no-var': 'error',
  'no-unused-vars': [
    'error',
    {
      args: 'argsIgnorePattern',
      caughtErrors: 'all'
    }
  ],
  'no-empty-function': [
    'error',
    {
      allow: ['constructors']
    }
  ],
  'arrow-body-style': [
    'error',
    'as-needed',
    {
      requireReturnForObjectLiteral: true
    }
  ],
  'capitalized-comments': 'error',
  'valid-typeof': 'error',
  'react/exhaustive-deps': 'error',
  'react/prefer-function-component': 'error',
  'vitest/hoisted-apis-on-top': 'error',
  'prefer-const': 'error',
  'class-methods-use-this': 'error',
  'jsdoc/check-property-names': 'error'
}

const ignorePatterns: string[] = [
  'node_modules/**',
  'dist/**',
  'coverage/**',
  'vendor/**',
  'test/snapshots/**'
]

export const lintConfig = defineConfig({
  plugins,
  ignorePatterns,
  categories: {
    correctness: 'warn'
  },
  options: {
    typeAware: true
  },

  rules: {
    ...oxcConfigs,
    ...jsxA11yConfigs,
    ...typeScriptConfigs,
    ...vueConfigs,
    ...otherConfigs
  }
})
