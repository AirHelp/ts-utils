import path from 'path'
import ESLint from 'eslint'

const srcPath = path.join(process.cwd(), 'src')
const defaultFilesToLint = `${srcPath}/**/*.{ts,tsx,json}`

/**
 * @param filesToLint - Path to a file or directory of files to lint (supports wildcards)
 * @param writeFixes - Shall the fixes be output to disk?
 * @param allowInlineConfig - Disables "magic" comments like `eslint-disable`
 */
export const tsUtilsLint = ({
  filesToLint = defaultFilesToLint,
  writeFixes = true,
  allowInlineConfig = true
} = {}) => {
  /**
   * In order to resolve plugins correctly,
   * `ts-utils-lint` is explicitly set as a current working directory.
   */
  const cwd = path.resolve(__dirname, '..')

  const { CLIEngine } = ESLint

  /**
   * According to ESLint documentation:
   * > Files on disk are never changed regardless of the value of fix.
   * > To persist changes to disk, call outputFixes().
   * Apparently, it's not the case when Prettier is integrated with ESLint as a plugin.
   * It decides whether to output fixes or not based on `fix` parameter passed to CLIEngine
   * while ignoring `outputFixes`.
   */
  const cli = new CLIEngine({
    allowInlineConfig,
    cwd,
    fix: writeFixes
  })

  const report = cli.executeOnFiles([filesToLint])
  const formatter = cli.getFormatter()

  console.log(formatter(report.results))

  writeFixes && CLIEngine.outputFixes(report)

  /**
   * The purpose of returning results is to make unit testing easier.
   */
  return report.results
}
