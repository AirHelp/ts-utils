import { tsUtilsLint } from './ts-utils-lint'

interface CliArgs {
  0: string
  1: string
  2?: string
}

/**
 * @param args - 3 element array. The first two are inserted automatically and they are paths
 * to Node.js executable and the script file being executed. The 3rd one is optional argument
 * provided by user.
 */
export const cli = (args: CliArgs) => {
  switch (args[2]) {
    case '-h':
    case '--help':
      console.log(`
        ts-utils-lint wraps ESLint/Prettier-related packages and exposes a single command to lint TypeScript files
        under src directory of your application respecting its .eslintrc and .prettierrc files.

        Usage: jest [--ci]

        Options:
        --ci ....... No errors are fixed automatically
      `)
      break
    case '--ci':
      tsUtilsLint({ writeFixes: false })
      break
    default:
      tsUtilsLint()
      break
  }
}
