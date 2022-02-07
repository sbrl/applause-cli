#!/usr/bin/env node
"use strict";

import path from 'path';

import CliParser from './src/index.mjs';
// When using it, you would do this:
// 
//import CliParser from 'applause-cli';
// 
// ....but for development I reference the index.mjs file directly.

// HACK: Make sure __dirname is defined when using es6 modules. I forget where I found this - a PR with a source URL would be great :D
const __dirname = import.meta.url.slice(7, import.meta.url.lastIndexOf("/"));

// Locate your package.json - this assumes it's sitting in the same directory as this file
const package_json_filepath = path.resolve(__dirname, "./package.json");

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
