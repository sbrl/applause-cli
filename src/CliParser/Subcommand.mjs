"use strict";

import Argument from './Argument.mjs'

/**
 * Represents a subcommand on the CLI.
 * Example call on the command line:
 * ```bash
 * path/to/file.mjs foo --bar baz
 * ```
 * In the above, "foo" (without quotes) is the subcommand.
 * Arguments can be attached either to the global Program instance, or to a specific Subcommand instance.
 * @param	{string}	name		The name of the subcommand
 * @param	{string}	description	The human-readable description of the subcommand (displayed in the help text)
 */
class Subcommand {
	/**
	 * Whether this Subcommand instance has any arguments or not.
	 * @return	{Boolean}
	 */
	get has_arguments() {
		return Object.keys(this.arguments).length > 0
	}
	
	constructor(name, description) {
		/**
		 * The name of this subcommand.
		 * @var {string}
		 */
		this.name = name;
		/**
		 * The human-readable description of this subcommand.
		 * @var {string}
		 */
		this.description = description;
		this.arguments = {};
	}
	
	/**
	 * Adds a new argument to this Subcommand instance.
	 * Note that the new argument will be specific to this subcommand - and
	 * will not work globally (only when this subcommand is called). For that,
	 * you probably want Program.argument() instead.
	 * @param	{string}	name			The name of the argument. Dashes are automatically converted to underscores in the parsing process.
	 * @param	{string}	description		The human-readable description of the argument. Displayed in the help text.
	 * @param	{any}		default_value	The default value of this argument.
	 * @param	{String}	[type="string"]	The type of this argument. See Program.argument() for more information.
	 * @return	{this}		The current Subcommand. Useful for daisy-chaining.
	 */
	argument(name, description, default_value, type = "string") {
		this.arguments[name] = new Argument(name, description, default_value, type);
		return this;
	}
}

export default Subcommand;
