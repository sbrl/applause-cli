# Changelog
This is the master changelog for [`applause-cli`](https://npmjs.org/package/applause-cli).

Release template text:

	Install or update from npm:

	```bash
	npm install --save applause-cli
	```


## v1.3.0
 - Output the extra rogue values as a new `extras` property on the object returned by `.parse()`, but only if the object doesn't exist in the output options object already


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
