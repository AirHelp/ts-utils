import { cli } from '../cli'
import { tsUtilsLint } from '../ts-utils-lint'

jest.mock('../ts-utils-lint')

const tsUtilsLintMock = tsUtilsLint as jest.MockedFunction<typeof tsUtilsLint>
const logMock = jest.fn()
console.log = logMock

const setup = () => {
  logMock.mockClear()
  tsUtilsLintMock.mockClear()

  return {
    cli: (command?: string) => cli(['node', 'script.ts', command])
  }
}

test('calls tsUtilsLint without arguments by default', () => {
  const { cli } = setup()
  cli()

  expect(tsUtilsLintMock).toHaveBeenCalledWith()
})

test('does not call tsUtilsLint when --help argument is given', () => {
  const { cli } = setup()
  cli('--help')

  expect(tsUtilsLintMock).not.toHaveBeenCalled()
})

test('prints description when --help argument is given', () => {
  const { cli } = setup()
  cli('--help')

  expect(logMock).toHaveBeenCalledWith(
    expect.stringContaining('ts-utils-lint wraps ESLint/Prettier-related packages')
  )
})

test('prints description when -h argument is given', () => {
  const { cli } = setup()
  cli('-h')

  expect(logMock).toHaveBeenCalledWith(
    expect.stringContaining('ts-utils-lint wraps ESLint/Prettier-related packages')
  )
})

test('calls tsUtilsLint with writeFixes equal false when --ci argument is given', () => {
  const { cli } = setup()
  cli('--ci')

  expect(tsUtilsLintMock).toHaveBeenCalledWith({ writeFixes: false })
})
