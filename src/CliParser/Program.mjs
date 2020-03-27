"use strict";

import fs from 'fs';

import a from '../Helpers/Ansi.mjs';
import Argument from './Argument.mjs';
import Subcommand from './Subcommand.mjs';

/**
 * Represents a program and all it's arguments and subcommands.
 * TODO: Publish on npm under the name "applause-cli", since it's inspired by clap?
 * @license MPL-2.0
 */
class Program {
	/**
	 * Whether this Program has subcommands or not.
	 * @return {Boolean}
	 */
	get has_subcommands() {
		return Object.keys(this.subcommands).length > 0;
	}
	
	/**
	 * Whether this Program has any *global* arguments or not.
	 * @return {Boolean}
	 */
	get has_arguments() {
		return Object.keys(this.arguments_global).length > 0
	}
	
	/**
	 * The max length - in characters - of all arguments (both global and subcommand-local).
	 * Useful for lining everything up neatly :P
	 * @return {number}
	 */
	get max_arg_length() {
		return Object.values(this.arguments_global)
			.concat(...Object.values(this.subcommands)
				.map((subc) => Object.values(subc.arguments)))
			.reduce((prev, next) => Math.max(prev, next.toString().length), 0);
	}
	
	/**
	 * Creates a new Program instance for specifying arguments and subcommands.
	 * @param	{string}	npm_package_json_loc	The filepath to your project's package.json file.
	 */
	constructor(npm_package_json_loc) {
		this.npm_package = JSON.parse(fs.readFileSync(npm_package_json_loc, "utf-8"));
		this.name = this.npm_package.name;
		this.version = this.npm_package.version;
		this.author = this.npm_package.author;
		this.description = this.npm_package.description;
		
		// Global argument definitions
		this.arguments_global = {};
		// Subcommand definitions
		this.subcommands = {};
		
		// The selected subcommand
		this.current_subcommand = null;
		// Extra args we found while parsing
		this.extras = [];
		
		this.options = {};
		
		// Ansi colours
		this.c_heading = a.fgreen + a.hicol
		this.c_smallheading = a.fblue + a.hicol;
		this.c_subcommand = a.fmagenta;
		this.c_argument = a.fyellow;
	}
	
	/**
	 * Specifies the name of the program - defaults to the name from your package.json
	 * @param  {string} str The name of the program
	 * @return {this}
	 */
	name(str) {
		this.name = str;
		return this;
	}
	
	/**
	 * Specifies the description of the program - defaults to the description from your package.json
	 * @param  {string} str The description of the program
	 * @return {this}
	 */
	description(str) {
		this.description = str;
		return this;
	}
	
	/**
	 * Adds an argument to the program.
	 * @param	{string}	name			The name of the argument
	 * @param	{string}	description		A description of the argument
	 * @param	{any}		default_value	The default value of the argument
	 * @param	{Boolean}	[type="string"]	The type of this argument. Set to "boolean" for flags that have no value.
	 * @return	{this}
	 */
	argument(name, description, default_value, type = "string") {
		this.arguments_global[name] = new Argument(
			name,
			description,
			default_value,
			type
		);
		return this;
	}
	
	/**
	 * Adds a subcommand to the program.
	 * @param	{string}		name		The name of the subcommand
	 * @param	{string}		description	A description of the subcommand
	 * @return	{Subcommand}	The subcommand instance. Useful for specifying subcommand-specific arguments.
	 */
	subcommand(name, description) {
		let subcommand = new Subcommand(name, description);
		this.subcommands[name] = subcommand;
		return subcommand;
	}
	
	/**
	 * Parses the given argument set.
	 * Note that the returned object will also include all the default values of all relevant arguments.
	 * @param	{string[]}	args	The array of arguments to parse.
	 * @return	{Object}	The parsed arguments.
	 */
	parse(args) {
		// Apply the default argument values
		for(let name in this.arguments)
			this.options[name] = this.arguments[name].default_value;
		
		// Parse the specified options
		for(let i = 0; i < args.length; i++) {
			if(!args[i].startsWith("-")) {
				// If a subcommand hasn't been specified yet, do so now
				if(this.has_subcommands && this.current_subcommand == null) {
					this.current_subcommand = args[i];
					// Apply the default subcommand argument values
					for(let name in this.arguments)
						this.options[name] = this.arguments[name].default_value;
					continue;
				}
				
				// Otherwise, note it down and move on
				this.extras.push(args[i]);
				continue;
			}
			
			// It's an argument
			let argument_text = args[i].replace(/^-+/, "");
			// Handle special cases
			switch(argument_text) {
				case "help":
					this.write_help_exit();
					break;
				case "version":
					this.write_version_exit();
					break;
			}
			
			// Check the global arguments
			let argument_obj = this.arguments_global[argument_text];
			if(typeof argument_obj == "undefined" && this.current_subcommand !== null) {
				argument_obj = this.subcommands[this.current_subcommand].arguments[argument_text];
			}
			if(typeof argument_obj == "undefined") {
				// We couldn't find it
				console.error(`${a.hicol}${a.fred}Error: Unknown argument ${args[i]}. Did you specify it after the subcommand?
Try --help for usage information.${a.reset}`);
				process.exit(1);
			}
			
			// Found it!
			
			// Apply the specified argument value
			if(argument_obj.has_value) {
				let parsed_value = argument_obj.parse_value(args[++i]);
				if(argument_obj.multiple_values) {
					if(!(this.options[argument_obj.option_name] instanceof Array))
						this.options[argument_obj.option_name] = [];
					this.options[argument_obj.option_name].push(parsed_value);
				}
				else
					this.options[argument_obj.option_name] = parsed_value;
			}
			else
				this.options[argument_obj.option_name] = true;
		}
		
		return this.options;
	}
	
	write_version_exit() {
		console.log(this.version);
		process.exit(0);
	}
	
	write_help_exit() {
		let result = `${a.hicol}${this.name}${a.reset} - ${this.description}
    ${a.locol}By ${this.author}${a.reset}

${this.c_heading}Usage:${a.reset}
${" ".repeat(4)}${this.name}${this.has_subcommands ? " [subcommand]" : ""} [options]
`;
		
		if(this.has_subcommands)
			result += this._stringify_subcommands();
		
		if(this.has_arguments)
			result += this._stringify_global_options();
		
		if(this.has_subcommands)
			result += this._stringify_subcommand_args();
		
		console.error(result);
		process.exit(0);
	}
	
	_stringify_global_options() {
		let result = `\n${this.c_heading}Global Options:${a.reset}\n`;
		
		result += this._stringify_arg_list(Object.values(this.arguments_global));
		return result;
		
	}
	
	_stringify_subcommand_args() {
		let result = `\n${this.c_heading}Subcommand Options:${a.reset}\n`;
		for(let subcommand of Object.values(this.subcommands)) {
			if(!subcommand.has_arguments) continue;
			
			result += `    ${this.c_smallheading}${subcommand.name}:${a.reset}\n`;
			result += this._stringify_arg_list(
				Object.values(subcommand.arguments),
				" ".repeat(8)
			);
		}
		return result;
	}
	
	_stringify_subcommands() {
		let result = `\n${this.c_heading}Subcommands:${a.reset}\n`;
		
		let max_subc_length = Object.values(this.subcommands)
			.reduce((prev, next) => Math.max(prev, next.name.length), 0);
				
		for(let subcommand of Object.values(this.subcommands)) {
			result += `    ${this.c_subcommand}${subcommand.name.padStart(max_subc_length)}${a.reset}  ${subcommand.description}\n`;
		}
		return result;
	}
	
	_stringify_arg_list(args, indent = "    ") {
		let result = "";
		
		for(let arg of args) {
			result += `${indent}${this.c_argument}${arg.toString().padStart(this.max_arg_length)}${a.reset}  ${arg.description}\n`;
		}
		
		return result;
	}
}

export default Program;
