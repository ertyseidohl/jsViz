var display = {
	element : null,
	context : {},
	init : function(elementId) {
		this.element = document.getElementById(elementId);
		return this;
	},
	append : function(data) {
		for (var i = 0; i < data.length; i++) {
			this.run(data[i]);
		}
	},
	run : function(item) {
		switch(item.type) {
			case 'AssignmentExpression' :
				this.context[item.left] = item.right;
				console.log("update literal " + item.left + " to have value " + item.right);
				break;
			case "LiteralDeclarator":
				this.context[item.name] = item.value;
				console.log("show literal " + item.name + " in display as value " + item.value);
				//todo show in display
				break;
			case "ArrayDeclarator":
				this.context[item.name] = [];
				console.log("show new array " + item.name + " in display");
				for (var index in item.elements) {
					switch (item.elements[index].type) {
						case "Literal" :
							this.context[item.name][index] = item.elements[index].value;
							console.log("show anonymous literal in display as value " + item.elements[index].value + " as part of " + item.name);
							//show in display
							break;
						default :
							this.context[item.name][index] = eval(escodegen.generate(item.elements[index]));
							console.log("show eval'd value in display as value " + this.context[item.name][index] + " as part of " + item.name);
							break;
					}
				}
				break;
			case "ForStatement":

				break;
			case "WhileStatement":

				break;
			case "UndefinedDeclarator":
				this.context[item.name] = undefined;
				console.log("show literal " + item.name + " in display as undefined");
		}
	},
	render : function() {
		console.log("render");
	}
};
