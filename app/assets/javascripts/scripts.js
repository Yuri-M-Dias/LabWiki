if(window.addEventListener) {
window.addEventListener('load', function () {
  var testbed = {};
  resetItAll();
  var canvas, context, canvaso, contexto;
  // The active tool instance.
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

  
 }
  
$(function() {
  var frozen = false;
  var othertest = "";
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
  if(testbed[this.id][3] === undefined)
    testbed[this.id][3] = "";
  $("#example_index").html("Testbed " + testbed[this.id][0] + " foi clicada ou arrastada!");
  $("#testbed_pos").html("The image is REALLY located at: " + testbed[this.id][1] + ", " + testbed[this.id][2]);
  if(frozen){
    if(othertest !== "" && !hasConnection(this.id, othertest)){
      context.beginPath();
      context.moveTo(testbed[this.id][1], testbed[this.id][2]);
      context.lineTo(testbed[othertest][1], testbed[othertest][2]);
      context.stroke();
      context.closePath();
      img_update();
      addConnectedNames(this.id, othertest);
      addConnectedNames(othertest, this.id);
      othertest = "";
    }else
      othertest = this.id;
  }
  fixPosition();
  $("#testbed_con").html("Connexions with: " + testbed[this.id][3]);
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

function addConnectedNames(saindo, entrando){
  if((saindo === entrando) || (hasConnection(saindo, entrando)) || (hasConnection(entrando, saindo)))
    return;
  testbed[saindo][3] += " " + entrando;
  testbed[entrando][3] += " " + saindo;
}

function resetItAll(){
  for (var x in testbed){
      testbed[x][3] = "";
    }
}

function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
    xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
    yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
    return { x: xPosition, y: yPosition };
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
  if(testbed[name][3].indexOf(other) > -1){
    has = true;
  }
  return has;
}
  init();

}, false); }

// vim:set spell spl=en fo=wan1croql tw=80 ts=2 sw=2 sts=2 sta et ai cin fenc=utf-8 ff=unix:
