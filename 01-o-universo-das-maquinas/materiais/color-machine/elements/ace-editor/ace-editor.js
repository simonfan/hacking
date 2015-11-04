(function () {
  'use strict';

  Polymer({
    is: 'ace-editor',

    properties: {
      value: {
        type: String,
        notify: true,
        value: Array(25 * 7).join("1"),
      },

      columns: {
        type: Number,
        notify: true,
        value: 25,
        observer: '_handleDimensionsChange',
      },

      rows: {
        type: Number,
        notify: true,
        value: 7,
        observer: '_handleDimensionsChange',
      },

      fontSize: {
        type: Number,
        notify: true,
        value: 20,
        observer: '_handleDimensionsChange',
      },

      charWidth: {
        type: Number,
        notify: true,
      },

      charHeight: {
        type: Number,
        notify: true,
      },

      editorHeight: {
        type: Number,
        notify: true,
      },

      editorWidth: {
        type: Number,
        notify: true
      },

      opacity: {
        type: Number,
        notify: true,
        value: 0.3,
        observer: '_handleOpacityChange'
      }
    },

    attached: function () {
      var editor = ace.edit(this.$.editor);

      // save reference to the editor
      this.editor = editor;

      // disable gutter
      editor.renderer.setShowGutter(false);

      // hide print margin
      editor.setShowPrintMargin(false);

      // set initial value onto editor
      editor.setValue(this.get('value'));

      this._handleDimensionsChange(this.get('columns'));

      editor.on('change', this._handleEditorChange.bind(this));
    },

    _handleOpacityChange: function (opacity, old) {

      this.style.opacity = opacity;
    },

    _handleDimensionsChange: function () {
      var editor = this.editor;

      if (!editor) {
        return;
      }

      console.log('_handleDimensionsChange')

      editor.setFontSize(this.get('fontSize'));

      // tell ace-edit to recalculate stuff
      this.editor.resize(true);

      var input = Polymer.dom(this.$.editor).querySelector('.ace_cursor');

      this.set('charWidth', input.offsetWidth);
      this.set('charHeight', input.offsetHeight);

      var session = editor.getSession();

      // wrap!
      session.setUseWrapMode(true);
      session.setWrapLimitRange(this.get('columns'), this.get('columns'));

      session.setUseSoftTabs(true);
      session.setTabSize(0);


      // calculate editor height and width
      // padding
      editor.renderer.setPadding(5);

      var editorHeight = this.get('charHeight') * this.get('rows');
      var editorWidth = this.get('charWidth') * this.get('columns') + 10;


      this.$.editor.style.height = editorHeight + 'px';
      this.$.editor.style.width = editorWidth + 'px';

      // tell ace-edit to recalculate stuff
      this.editor.resize(true);

      this.set('editorHeight', editorHeight);
      this.set('editorWidth', editorWidth);
    },


    /**
     * Handles ace-edit change
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    _handleEditorChange: function(e) {

      var editor = this.editor;


      // MAxlength hack
      var maxLength = this.get('columns') * this.get('rows');

      var length = editor.getValue().length;

      // max length hack
      if (length > maxLength) {
        var cursorPos = editor.selection.getCursor();

        editor.setValue(editor.getValue().substr(0, maxLength));
        editor.navigateFileEnd();
      }

      // set value
      this.set('value', editor.getValue());
    },
  });

})();