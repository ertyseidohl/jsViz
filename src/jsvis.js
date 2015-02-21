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

var parse = function(code) {
  var ast = esprima.parse(code);
  estraverse.traverse(ast, {
    enter: function(node, parent) {

      // console.log(node.type);
      switch(node.type) {
        case 'VariableDeclarator':
          switch(node.id.type) {
            case 'Literal':
              var name = node.name;
              var val = node.value;
            break;
            case 'ArrayExpression':
              var elements = node.elements;
            break;

          }
        break;
        case 'ForStatement':
          console.log(escodegen.generate(node));
        break;
      }
    }
  });
};

var run = document.getElementById('run');
run.addEventListener('click', function() {
  var runCode = writeDoc.getValue();
  writeDoc.setValue('');
  readDoc.setValue(readDoc.getValue() + '\n\n' + runCode);
  var data = parse(runCode);
  // display.append(data);
  // display.render();
});