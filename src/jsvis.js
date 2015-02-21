var readEditor = ace.edit("read-editor");
readEditor.setTheme("ace/theme/monokai");
readEditor.getSession().setMode("ace/mode/javascript");
readEditor.setReadOnly(true);
var readDoc = readEditor.getSession().getDocument();

var writeEditor = ace.edit("write-editor");
writeEditor.setTheme("ace/theme/monokai");
writeEditor.getSession().setMode("ace/mode/javascript");
var writeDoc = writeEditor.getSession().getDocument();
var timeOutHandle;

var displayEditor = display.init("display");

var parse = function(code) {
  var ast = esprima.parse(code);
  var data = [];
  estraverse.traverse(ast, {
    enter: function(node, parent) {
      // console.log(node);
      switch(node.type) {
        case 'VariableDeclarator':
          switch(node.init.type) {
            case 'Literal':
              data.push({
                name: node.id.name,
                type : "LiteralDeclarator",
                value: node.init.value
              });
            break;
            case 'ArrayExpression':
              data.push({
                name: node.id.name,
                type : "ArrayDeclarator",
                elements: node.init.elements
              });
            break;
          }
        break;
        case 'ForStatement':
          data.push({
            type : node.type,
            init : escodegen.generate(node.init),
            test : escodegen.generate(node.test),
            body : escodegen.generate(node.body),
            update : escodegen.generate(node.update)
          });
        break;
      }
    }
  });
  return data;
};

var run = document.getElementById('run');
run.addEventListener('click', function() {
  var runCode = writeDoc.getValue();
  writeDoc.setValue('');
  readDoc.setValue(readDoc.getValue() + '\n\n' + runCode);
  var data = parse(runCode);
  displayEditor.append(data);
  displayEditor.render();
});
