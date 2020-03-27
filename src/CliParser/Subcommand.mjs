"use strict";

class Subcommand {
	get has_arguments() {
		return Object.keys(this.arguments).length > 0
	}
	
	constructor(name, description) {
		this.name = name;
		this.description = description;
		this.arguments = {};
	}
	
	argument(name, description, default_value, type = "string") {
		this.arguments[name] = new Argument(name, description, default_value, type);
		return this;
	}
}

export default Subcommand;
