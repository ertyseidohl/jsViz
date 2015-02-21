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
	addItem: function(type, name, value) {
		var container = document.createElement('div');
		container.setAttribute('class', type);
		container.setAttribute('id', name);
		var typeElement = document.createElement('div');
		typeElement.setAttribute('class', 'variableType');
		typeElement.innerHTML = type;
		var nameElement = document.createElement('div');
		nameElement.setAttribute('class', 'variableName');
		nameElement.innerHTML = name;
		var valueElement = document.createElement('div');
		valueElement.setAttribute('class', 'variableValue');
		valueElement.innerHTML = value;
		container.appendChild(typeElement);
		container.appendChild(nameElement);
		container.appendChild(valueElement);
		var displayContainer = document.getElementById('display');
		displayContainer.appendChild(container);
	},
	updateItem: function(type, name, value) {
		var element = document.querySelector('#' + name);
		if (element) {
			element.setAttribute('class', type);
			var elementType = document.querySelector('#' + name + ' .variableType' );
			elementType.innerHTML = type;
			var elementValue = document.querySelector('#' + name + ' .variableValue');
			elementValue.innerHTML = value;
		} else {
			this.addItem(type, name, value);
		}
	},
	run : function(item) {
		switch(item.type) {
			case 'AssignmentExpression' :
				this.context[item.left] = item.right;
				this.updateItem(typeof(item.right), item.left, item.right);
				break;
			case "LiteralDeclarator":
				this.context[item.name] = item.value;
				this.updateItem(typeof(item.value), item.name, item.value);
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
