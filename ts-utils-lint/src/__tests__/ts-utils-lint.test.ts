import { tsUtilsLint } from '../index'
import path from 'path'

const setup = () => {
  const logSpy = jest.spyOn(console, 'log').mockImplementationOnce(() => undefined)
  const restoreSpy = () => logSpy.mockRestore()

  const lint = () =>
    tsUtilsLint({
      allowInlineConfig: false,
      filesToLint: path.resolve(__dirname, 'test-app/src/**/*.ts'),
      outputFixes: false
    })

  return {
    lint,
    logSpy,
    restoreSpy
  }
}

test('logs linting errors', () => {
  const { lint, logSpy, restoreSpy } = setup()

  lint()
  expect(logSpy.mock.calls[0][0]).toMatch('3 problems (2 errors, 1 warning)')

  restoreSpy()
})

test('lints respecting .eslintrc.json and .prettierrc.json', () => {
  const { lint, restoreSpy } = setup()
  const results = lint()

  expect(results[0].messages).toStrictEqual([
    {
      column: 5,
      endColumn: 61,
      endLine: 2,
      line: 2,
      message:
        "Identifier 'this_is_some_super_non_sense_and_long_variable_name' is not in camel case.",
      messageId: 'notCamelCase',
      nodeType: 'Identifier',
      ruleId: '@typescript-eslint/camelcase',
      severity: 2
    },
    {
      column: 5,
      endColumn: 61,
      endLine: 2,
      line: 2,
      message:
        "'this_is_some_super_non_sense_and_long_variable_name' is assigned a value but never used.",
      nodeType: 'Identifier',
      ruleId: '@typescript-eslint/no-unused-vars',
      severity: 1
    },
    {
      column: 58,
      endColumn: 61,
      endLine: 2,
      line: 2,
      message: 'Unexpected any. Specify a different type.',
      messageId: 'unexpectedAny',
      nodeType: 'TSAnyKeyword',
      ruleId: '@typescript-eslint/no-explicit-any',
      severity: 2
    }
  ])

  restoreSpy()
})
