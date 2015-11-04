window.addEventListener('WebComponentsReady', function () {

  var machine = window.machine = document.querySelector('#m');
  var textEditor = document.querySelector('#text-editor');
  var workspace = document.querySelector('#workspace');

  // machine.set('columns', 10);
  // machine.set('rows', 5);

  textEditor.addEventListener('editor-width-changed', setWorkspaceSizing);
  textEditor.addEventListener('editor-height-changed', setWorkspaceSizing);

  function setWorkspaceSizing() {
    // should be inside event listener
    workspace.style.width = textEditor.get('editorWidth') + 'px';
    workspace.style.height = textEditor.get('editorHeight') + 'px';
  }

  setWorkspaceSizing();

  machine.set('hello', 'hey')
});