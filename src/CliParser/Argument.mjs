"use strict";

/**
 * Represents a single command-line argument.
 * You probably won't interact with this class directly - it's safe to ignore
 * it until you need it.
 */
class Argument {
	/**
	 * The name that this argument should have in the final output object.
	 * Useful to make argument names more easily accessible (e.g. min-value → min_value).
	 * @return {string} The name this argument should have in the final output object.
	 */
	get option_name() {
		return this.name.replace(/\-/g, "_");
	}
	
	/**
	 * Whether this argument supports multiple values or not.
	 * @return {boolean}
	 */
	get multiple_values() {
		return typeof this.type == "string" && this.type.endsWith("_multi");
	}
	
	constructor(name, description, default_value, type) {
		this.name = name;
		this.description = description;
		this.default_value = default_value;
		this.has_value = type !== "boolean";
		if(typeof type == "function")
			this.value_parser(type);
		else
			this.type = type;
	}
	
	/**
	 * Sets the type of this argument.
	 * @param  {string} type The type of this argument.
	 * @return {this}
	 */
	type(type) {
		this.type = type;
		return this;
	}
	/**
	 * Sets a custom function for parsing values.
	 * @param	{Function}	func	The custom parsing function. Will be passed a single string, and the return value will be treated ast he final parsed output. Arbitrary objects are supported.
	 * @return	{this}
	 */
	value_parser(func) {
		this.type = "custom";
		this.type_parser = func;
		return this;
	}
	
	/**
	 * Parses a value according to the type of this argument.
	 * @param	{any}	val	The value to parse.
	 * @return	{any}	The parsed value
	 */
	parse_value(val) {
		if(typeof val === this.type)
			return val;
		
		if(typeof val == "string") {
			switch(this.type.split("_")[0]) {
				case "integer":
					return parseInt(val, 10);
				case "float":
					return parseFloat(val);
				case "boolean":
					return JSON.parse(val.toLowerCase());
				case "custom":
					return this.type_parser(val);
				case "string":
					return val;
				default:
					throw new Error(`Error: Unknown argument value type ${val} for argument --${this.name}`);
			}
		}
	}
	
	toString() {
		if(this.has_value)
			return `--${this.name} value`;
		else
			return `--${this.name}`;
	}
}

export default Argument;
