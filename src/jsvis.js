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
      // console.log(node.type);
      switch(node.type) {
        case 'AssignmentExpression':
          data.push({
            type: 'AssignmentExpression',
            left: node.left.name,
            right: node.right
          })
          break;
        case 'VariableDeclarator':
          if (node.init) {
            switch(node.init.type) {
              case 'Literal':
                data.push({
                  name: node.id.name,
                  type : "LiteralDeclarator",
                  value: node.init.value
                });
              break;
              case 'BinaryExpression':
                data.push({
                  name: node.id.name,
                  type: "BinaryDeclarator",
                  value : node.init
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
          } else {
            data.push({
              name: node.id.name,
              type : "UndefinedDeclarator",
            });
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
        case 'WhileStatement':
          data.push({
            type: node.type,
            test: node.test,
            body: node.body
          })
        break;
      }
    }
  });
  return data;
};

var run = document.getElementById('run');
run.addEventListener('click', function() {
  var runCode = writeDoc.getValue();
  if (runCode.length === 0) {
    return;
  }
  writeDoc.setValue('');
  readDoc.setValue(readDoc.getValue() + '\n\n' + runCode);
  var data = parse(runCode);
  displayEditor.append(data);
  displayEditor.render();
});
