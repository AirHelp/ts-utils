# @airhelp/ts-utils-lint

**ts-utils-lint** wraps ESLint/Prettier-related packages and exposes a single command to lint TypeScript files under `src` directory of your application respecting its `.eslintrc` and `.prettierrc` files.

## Setup

```bash
./a-lib ➜ yarn add --dev @airhelp/ts-utils-lint
```

```json
// a-lib/package.json
{
  "scripts": {
    "lint": "ts-utils-lint"
  }
}
```

## How it works

**ts-utils-lint** is a simple wrapper around `CLIEngine` API exposed by ESLint. Given `lib-a` directory, executing `ts-utils-lint` inside means going through the following steps:

1. Read `.eslintrc` configuration in `lib-a`
2. Set `ts-utils-lint` as a current working directory for ESLint in order to resolve the dependencies (namely, ESLint plugins) correctly.
3. Lint all TypeScript files under `lib-a/src` directory.
4. Fix errors automatically and print the report.

## Roadmap

**ts-utils-lint** is meant to always be _a single command to lint TypeScript files respecting .eslintrc and .prettierrc files of your application_. It means that in terms of features not much is going to change. What we would like to improve in the upcoming releases though, is its configurability. For instance:

* [x] a `--ci` flag to skip automatic fixes and return with a non-zero code in case of errors [#3](https://github.com/AirHelp/ts-utils/pull/3)
* [ ] custom pattern for files to be linted

## Code editors integration

Please, make sure to setup your code editor so that you get instant feedback and auto fixes when you code. Too long line or unused variable errors making you CI pipeline red and being the very last thing preventing you from an important release suck. Don't go that way!

### VSCode

1. Install **ESLint** (`dbaeumer.vscode-eslint`) extension.
2. `View > Command Pallette...` (⇧ + ⌘ + P)
3. Go to `> Preferences: Open Settings (JSON)`
4. Append the following configuration:

	```jsonc
	{
	  "files.autoSave": "onFocusChange", // not required, although highly recommended
	  "eslint.autoFixOnSave": true,
	  "eslint.validate": [
	    {"language": "typescript", "autoFix": true },
	    {"language": "typescriptreact", "autoFix": true }
  	]
	}
	```

### WebStorm

_To do_

### Sublime Text

_To do_

## Contributing
_To do_

## License
[MIT](https://opensource.org/licenses/MIT)
