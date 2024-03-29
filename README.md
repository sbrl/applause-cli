# applause-cli

> Super-duper lightweight no-dependency alternative to clap

Inspired by [`clap`](https://www.npmjs.com/package/clap). It wasn't quite what I wanted, so I wrote my own :P

This is refactored out of my main PhD codebase, so if you're wondering why there aren't very many commits, that's why.

 - **Current version:** ![current npm version - see the GitHub releases](https://img.shields.io/npm/v/applause-cli)
 - **API Docs:** https://starbeamrainbowlabs.com/code/applause-cli/
 - **Changelog:** https://github.com/sbrl/applause-cli/blob/master/Changelog.md


## Install
Install via `npm`:

```bash
npm install applause-cli --save
```


## Usage
Example usage:

```javascript
"use strict";

import path from 'path';

import CliParser from 'applause-cli';

// HACK: Make sure __dirname is defined when using es6 modules. I forget where I found this - a PR with a source URL would be great :D
const __dirname = import.meta.url.slice(7, import.meta.url.lastIndexOf("/"));

// Locate your package.json - this assumes it's sitting in the parent directory of this file (e.g. if this file was ./src/index.json and it was at ./package.json)
const package_json_filepath = path.resolve(__dirname, "../package.json");

// Create a new CLI parser
// The name description, version number, etc are all populated from there
const cli = new CliParser(package_json_filepath);

cli.argument("foo", "This is a global argument.", true, "boolean")

cli.subcommand("do_stuff", "Do some stuff.")
	// An argument just for this subcommand
	.argument("input", "The input file to do stuff with.", "default_value_here", "string");

console.log(
	cli.parse(process.argv.slice(2))
);
```

The full API documentation can be found here: <https://starbeamrainbowlabs.com/code/applause-cli/>.

### Argument Types
Several argument types are currently supported. They are specified as the 4th argument to the `.argument()` command (either globally or on a specific subcommand):

Type		| Meaning
------------|----------------------------
`string`	| Just a string.
`integer`	| An integer (`parseInt(value, 10)` is used)
`float`		| A floating-point number (`parseFloat(value)` is used)
`boolean`	| A boolean `true`/`false` value. Unlike other types, arguments with this type do not take an explicit value on the cli (e.g. `--foo bar`) - rather their presence on the CLI sets the value to `true`. This can be overridden though with `argument.has_value = true`.
`date`		| Parse the string as a date with `new Date(value)`
`<function>`| Pass a function to do custom parsing. The function provided will be called with a single argument - the value that needs parsing. The return value will be considered the parsed value.

In addition, a function can be passed instead of a string defining the type of an argument, and that function will be called with a single argument to parse values instead:

```javascript
// .....
cli.argument("foo", "An example argument --foo", 128, function(value) {
	// Parse the value as an int and double it before returning
	return parseInt(value, 10) * 2;
});
```

## Read-world use
 - I'm using it for the main Node.js application for my PhD in Computer Science!
 - [`terrain50-cli`](https://www.npmjs.com/package/terrain50-cli) - also developed as part of my PhD
 - [`nimrod-data-downloader`](https://www.npmjs.com/package/nimrod-data-downloader) - another component of my PhD
 - _(Are you using this project? Get in touch by [opening an issue](https://github.com/sbrl/applause-cli/issues/new))_


## Contributing
Contributions are welcome as PRs! Don't forget to say that you donate your contribution under the _Mozilla Public License 2.0_ in your PR comment.


## Licence
This project is licensed under the _Mozilla Public License 2.0_. See the `LICENSE` file in this repository for the full text.
