import { tsUtilsLint } from '../ts-utils-lint'
import path from 'path'

const setup = () => {
  const logSpy = jest.spyOn(console, 'log').mockImplementationOnce(() => undefined)
  const restoreSpy = () => logSpy.mockRestore()

  const lint = () =>
    tsUtilsLint({
      allowInlineConfig: false,
      filesToLint: path.resolve(__dirname, 'test-app/src/**/*.ts'),
      writeFixes: false
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
      column: 7,
      endColumn: 58,
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
      column: 7,
      endColumn: 58,
      endLine: 2,
      line: 2,
      message:
        "'this_is_some_super_non_sense_and_long_variable_name' is assigned a value but never used.",
      nodeType: 'Identifier',
      ruleId: '@typescript-eslint/no-unused-vars',
      severity: 1
    },
    {
      column: 62,
      endColumn: 144,
      endLine: 2,
      fix: {
        range: [89, 171],
        text:
          "\n  'string in double quotes, wut?',\n  'the line length limit is gonna be sooo exceeded'\n"
      },
      line: 2,
      message:
        'Replace `"string·in·double·quotes,·wut?",·"the·line·length·limit·is·gonna·be·sooo·exceeded"` with `⏎··\'string·in·double·quotes,·wut?\',⏎··\'the·line·length·limit·is·gonna·be·sooo·exceeded\'⏎`',
      nodeType: null,
      ruleId: 'prettier/prettier',
      severity: 2
    }
  ])

  restoreSpy()
})
