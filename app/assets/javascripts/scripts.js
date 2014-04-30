if(window.addEventListener) {
window.addEventListener('load', function () {

  var testbed = {};
  resetItAll();

function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
    xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
    yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
    return { x: xPosition, y: yPosition };
}

function comparePositions(xPosition, yPosition){
  var name = "";
  for (var x in testbed){
    if((testbed[x][1] === xPosition - 106) && (testbed[x][2] === yPosition - 94)){
      name = testbed[x][0];
    }
  }
  return name;
}

function getClicked(original){
  for (var x in testbed){
    if(testbed[x][3] === true && name !== x){
      name = testbed[x][0];
    }else
      testbed[x][3] = false;
  }
  return name;
}

  var canvas, context, canvaso, contexto;
  // The active tool instance.
  var tool;
  var tool_default = 'line';
  function init () {
    // Find the canvas element.
    canvaso = document.getElementById('imageView');
    if (!canvaso) {
      //alert('Error: I cannot find the canvas element!');
      return;
    }
    if (!canvaso.getContext) {
      alert('Error: no canvas.getContext!');
      return;
    }
    // Get the 2D canvas context.
    contexto = canvaso.getContext('2d');
    if (!contexto) {
      alert('Error: failed to getContext!');
      return;
    }
    // Add the temporary canvas.
    var container = canvaso.parentNode;
    canvas = document.createElement('canvas');
    if (!canvas) {
      alert('Error: I cannot create a new canvas element!');
      return;
    }
    canvas.id     = 'imageTemp';
    canvas.width  = canvaso.width;
    canvas.height = canvaso.height;
    container.appendChild(canvas);
    context = canvas.getContext('2d');
    if (tools[tool_default]) {
      tool = new tools[tool_default]();
    }
    // Attach the mousedown, mousemove and mouseup event listeners.
    canvas.addEventListener('mousedown', ev_canvas, false);
    canvas.addEventListener('mousemove', ev_canvas, false);
    canvas.addEventListener('mouseup', ev_canvas, false);
    canvas.addEventListener('dragstop', ev_canvas, false);
  }

  // The general-purpose event handler. This function just determines the mouse 
  // position relative to the canvas element.
  function ev_canvas (ev) {
    if (ev.layerX || ev.layerX == 0) {
      ev._x = ev.layerX;
      ev._y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) {
      ev._x = ev.offsetX;
      ev._y = ev.offsetY;
    }

    var func = tool[ev.type];
    if (func) {
      func(ev);
    }
  }
  // This function draws the #imageTemp canvas on top of #imageView, after which 
  // #imageTemp is cleared. This function is called each time when the user 
  // completes a drawing operation.
  function img_update () {
		contexto.drawImage(canvas, 0, 0);
		context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function draw_image(ix, iy){
    base_image = new Image();
    base_image.src = '/testbed.png'
    base_image.onload = function(){
      context.drawImage(base_image, ix, iy);
    }
  }

  var tools = {};
  // The line tool.
  tools.line = function () {
    var tool = this;
    this.started = false;

    this.mousedown = function (ev) {
      tool.started = true;
      tool.x0 = ev._x;
      tool.y0 = ev._y;
    };

    this.mousemove = function (ev) {
      if (!tool.started) {
        return;
      }
      //Resets the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      context.beginPath();
      context.moveTo(tool.x0, tool.y0);
      context.lineTo(ev._x, ev._y);
      context.stroke();
      context.closePath();
    };

    this.mouseup = function (ev) {
      if (tool.started) {
        tool.mousemove(ev);
        tool.started = false;
        img_update();
      }
    };
  };
  
$(function() {
  var frozen = false;
 $(".arrastavel").draggable({ containment: "#containment-wrapper", scroll: true });
 $(".arrastavel").draggable({
  start: function(){
    if(testbed[this.id] === undefined)
      testbed[this.id] = new Array();
  },
  drag: function() {
    var position = getPosition(this);
    testbed[this.id][0] = this.id;
    testbed[this.id][1] = position.x - 81;
    testbed[this.id][2] = position.y - 69;
    $("#testbed_pos").html("The image is REALLY located at: " + testbed[this.id][1] + ", " + testbed[this.id][2]);
    fixPosition();
  }
 });
 $(".arrastavel").on("start dragstop click", function() {
  if(testbed[this.id] === undefined)
    testbed[this.id] = new Array();
  if(testbed[this.id][4] === undefined)
    testbed[this.id][4] = "";
  $("#example_index").html("Testbed " + testbed[this.id][0] + " foi clicada ou arrastada!");
  $("#testbed_pos").html("The image is REALLY located at: " + testbed[this.id][1] + ", " + testbed[this.id][2]);
  if(frozen){
    testbed[this.id][3] = true;
    var othertest = getClicked();
    if(othertest !== "" && !hasConnection(this.id, othertest)){
      context.beginPath();
      context.moveTo(testbed[this.id][1], testbed[this.id][2]);
      context.lineTo(testbed[othertest][1], testbed[othertest][2]);
      context.stroke();
      context.closePath();
      img_update();
      addConnectedNames(this.id, othertest);
      addConnectedNames(othertest, this.id);
    }
  }
  fixPosition();
  $("#testbed_con").html("Connexions with: " + testbed[this.id][4]);
  });
 $("#freeze").on("click", function(){
  if(!frozen){
    $(".arrastavel").draggable("disable");
    frozen = true;
  }else{
    $(".arrastavel").draggable("enable");
    frozen = false;
  }
 });
 $("#reset").on("click", function(){
    contexto.clearRect(0, 0, canvaso.width, canvaso.height);
    context.clearRect(0, 0, canvas.width, canvas.height);
    resetItAll();
  });
});

function addConnectedNames(saindo, entrando){
  if((saindo === entrando) || (hasConnection(saindo, entrando)) || (hasConnection(entrando, saindo)))
    return;
  testbed[saindo][4] += " " + entrando;
  testbed[entrando][4] += " " + saindo;
}

function resetItAll(){
  for (var x in testbed){
      testbed[x][4] = "";
    }
}

function fixPosition(){
  contexto.clearRect(0, 0, canvaso.width, canvaso.height);
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (var x in testbed){
    for (var y in testbed){
      if(hasConnection(x, y)){
        context.beginPath();
        context.moveTo(testbed[y][1], testbed[y][2]);
        context.lineTo(testbed[x][1], testbed[x][2]);
        context.stroke();
      }
    }
  }
}

function hasConnection(name, other){
  var has = false;
  if(testbed[name][4].indexOf(other) > -1){
    has = true;
  }
  return has;
}
  init();

}, false); }

// vim:set spell spl=en fo=wan1croql tw=80 ts=2 sw=2 sts=2 sta et ai cin fenc=utf-8 ff=unix:
