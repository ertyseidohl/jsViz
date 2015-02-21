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
			case "LiteralDeclarator":
				this.context[item.name] = item.value;
				console.log("show literal " + item.name + " in display as value " + item.value);
				//todo show in display
				break;
			case "ArrayDeclarator":
				context[item.name] = [];
				for (var index in item.elements) {
					switch (item.elements[index].type) {
						case "Literal" :
							this.context[item.name][index] = item.elements[index].value;
							console.log("show anonymous literal in display as value " + item.elements[index].value);
							//show in display
							break;
						default :
							//pass back into parser???
							break;
					}
				}
				break;
			case "ForStatement":

				break;
		}
	},
	render : function() {
		console.log("render");
	}
};
