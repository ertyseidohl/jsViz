var readEditor = ace.edit("read-editor");
readEditor.setTheme("ace/theme/monokai");
readEditor.getSession().setMode("ace/mode/javascript");
readEditor.setReadOnly(true);

var writeEditor = ace.edit("write-editor");
writeEditor.setTheme("ace/theme/monokai");
writeEditor.getSession().setMode("ace/mode/javascript");
var aceDoc = writeEditor.getSession().getDocument();
var timeOutHandle;

var timeOutCallback = function(code) {
  var ast = esprima.parse(code);
  estraverse.traverse(ast, {
    enter: function(node, parent) {

      console.log(node);
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
      }
    }
  });
};

aceDoc.addEventListener('change', function() {
  if (timeOutHandle) {
    clearTimeout(timeOutHandle);
  }
  timeOutHandle = setTimeout(function(){
    timeOutCallback(aceDoc.getValue());
  }, 1000);

});