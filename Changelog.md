# Changelog
This is the master changelog for [`applause-cli`](https://npmjs.org/package/applause-cli).

Release template text:

-----

Install or update from npm:

```bash
npm install --save applause-cli
```

-----

## Unreleased changes
- Bump version of dev dependency `documentation``


## v1.8.2
 - Slightly improve docs on Subcommand class
 - Add subcommand name and description to subcommand-specific help text


## v1.8.1
 - Update dependencies


## v1.8
 - When `--help` is specified after a subcommand, subcommand-specific help is now displayed
 - Minor clarification in README
 - Fix example in README
 - Bump versions of development dependencies


## v1.7
 - Add `date` as compatible argument format
 - Update development dependencies


## v1.6
 - Update development dependencies
 - Allow not specifying a path to an NPM package.json file
 - Add `.set_author()` method to `Program`


## v1.5.1
 - Minor layout improvement


## v1.5
 - Change names of `.name()` → `.set_name()`, `.description()` → `.set_description()`, and `.description_extended()` → `.set_description_extended()` to avoid clash with variable names


## v1.4
 - Add new extended description with `.description_extended(str)` method


## v1.3.3
 - Fix argument default values that contain dashes `-`


## v1.3.2
 - Update dependencies


## v1.3.1
 - Fix help output for arguments that don't take a value


## v1.3.0
 - Output the extra rogue values as a new `extras` property on the object returned by `.parse()`, but only if the object doesn't exist in the output options object already
 - Update development dependencies


## v1.2.4
 - Bugfix: Don't crash if the subcommand entered by the user doesn't exist


## v1.2.3
 - Bugfix: Correctly apply default values for arguments of subcommands


## v1.2.2
 - Bugfix: Correctly apply default values


## v1.2.1
 - Update README


## v1.2
 - Fix missing `import` in `Subcommand.mjs`


## v1.1
 - Fix missing `export` in `Argument.mjs`


## v1.0
 - Initial release! Refactored out from my main PhD codebase.
