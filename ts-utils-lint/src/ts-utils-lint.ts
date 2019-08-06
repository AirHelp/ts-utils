import path from 'path'
import ESLint from 'eslint'

const srcPath = path.join(process.cwd(), 'src')
const defaultFilesToLint = `${srcPath}/**/*.{ts,tsx,json}`

/**
 * @param filesToLint - Path to a file or directory of files to lint (supports wildcards)
 * @param outputFixes - Shall the fixes be output to disk?
 * @param allowInlineConfig - Disables "magic" comments like `eslint-disable`
 */
export const tsUtilsLint = ({
  filesToLint = defaultFilesToLint,
  outputFixes = true,
  allowInlineConfig = true
}) => {
  /**
   * in order to resolve plugins correctly,
   * `ts-utils-lint` is explicitly set as a current working directory.
   */
  const cwd = path.resolve(__dirname, '..')

  const { CLIEngine } = ESLint

  const cli = new CLIEngine({
    allowInlineConfig,
    cwd,
    fix: true
  })

  const report = cli.executeOnFiles([filesToLint])
  const formatter = cli.getFormatter()

  console.log(formatter(report.results))

  outputFixes && CLIEngine.outputFixes(report)

  /**
   * The purpose of returning results is to make unit testing easier.
   */
  return report.results
}
