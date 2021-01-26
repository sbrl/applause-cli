# Changelog
This is the master changelog for [`applause-cli`](https://npmjs.org/package/applause-cli).

Release template text:

-----

Install or update from npm:

```bash
npm install --save applause-cli
```

-----


## v1.5.2 (unreleased)
 - Update development dependencies


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
