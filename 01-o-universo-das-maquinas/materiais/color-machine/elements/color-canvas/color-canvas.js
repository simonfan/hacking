(function () {
  'use strict';

  Polymer({
    is: 'color-canvas',

    properties: {
      value: {
        type: String,
        notify: true,
        value: '',
        observer: '_handleValueChange'
      },

      columns: {
        type: Number,
        notify: true,
      },

      charWidth: {
        type: Number,
        notify: true,
      },

      charHeight: {
        type: Number,
        notify: true
      },

      height: {
        type: Number,
        notify: true,
      },

      width: {
        type: Number,
        notify: true
      },

      colorMapping: {
        type: Object,
        notify: true,
        value: {
          '0': 'white',
          '1': 'black',
        }
      }
    },

    _handleValueChange: function (value, old) {

      var splitRegExp = new RegExp('.{1,' + this.get('columns') + '}', 'g');

      var lines = value.match(splitRegExp) || [];

      var charWidth  = this.get('charWidth');
      var charHeight = this.get('charHeight');

      this.clear();

      var colorMapping = this.get('colorMapping');

      // draw for each line
      lines.forEach(function (lineContents, lineIndex) {
        Array.prototype.forEach.call(lineContents, function (ch, chIndex) {

          // console.log('print at line %s and char %s', lineIndex, chIndex);

          // new Rectangle(x, y, width, height)
          var rectangle = new paper.Rectangle(
            chIndex * charWidth + 5,
            lineIndex * charHeight,
            charWidth,
            charHeight
          );

          var path = new paper.Path.Rectangle(rectangle);

          path.fillColor = colorMapping[ch] || 'red';
        })
      });


      // draw at end
      if (paper.view) {
        paper.view.draw();
      }
    },

    ready: function () {
      // Get a reference to the canvas object
      var canvas = this.$.canvas
      // Create an empty project and a view for the canvas:
      paper.setup(canvas);
    },

    clear: function () {
      // clean up canvas.. this is not the paper way but who cares?
      if (paper.project && paper.project.activeLayer) {
        paper.project.activeLayer.removeChildren();
      }

      var canvas = this.$.canvas;

      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

    }
  })
})();