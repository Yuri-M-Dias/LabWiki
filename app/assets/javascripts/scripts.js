if(window.addEventListener) {
window.addEventListener('load', function () {
  var testbed = {};
  resetItAll();
  var canvas, context, canvaso, contexto;
  var nodeurl = "omf.ufg.node";
  function init () {
    canvaso = document.getElementById('imageTemp');
    if (!canvaso) {
      //alert('Error: I cannot find the canvas element!');
      return;
    }
    contexto = canvaso.getContext('2d');
    if (!contexto) {
      alert('Error: failed to getContext!');
      return;
    }
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
  var lastclicked = "";
 $(".arrastavel").draggable({ containment: "#containment-wrapper", scroll: true });
 $(".arrastavel").draggable({
  start: function(){
    if(testbed[this.id] === undefined)
      testbed[this.id] = new Array();
  },
  drag: function() {
    var position = getPosition(this);
    testbed[this.id][0] = this.id;
    testbed[this.id][1] = position.x - 50;
    testbed[this.id][2] = position.y - 50;
    if(testbed[this.id][3] === undefined)
      testbed[this.id][3] = "";
    $("#testbed_pos").html("The image is REALLY located at: " + testbed[this.id][1] + ", " + testbed[this.id][2]);
    fixPosition();
  }
 });
 $(".arrastavel").on("start dragstop click", function() {
  if(testbed[this.id] === undefined)
    testbed[this.id] = new Array();
  if(testbed[this.id][3] === undefined)
    testbed[this.id][3] = "";
  if(frozen){
    if(lastclicked !== "" && !hasConnection(this.id, lastclicked) && lastclicked !== this.id){
      if(!ifNeighborhoods(this.id, lastclicked)){
        alert("The nodes need to be neighborhoods for the configuration to work!");
        lastclicked = "";
      }else{
        contexto.beginPath();
        contexto.moveTo(testbed[this.id][1], testbed[this.id][2]);
        contexto.lineTo(testbed[lastclicked][1], testbed[lastclicked][2]);
        contexto.stroke();
        contexto.closePath();
        img_update();
        addConnectedNames(this.id, lastclicked);
        addConnectedNames(lastclicked, this.id);
        lastclicked = "";
      }
    }else
      lastclicked = this.id;
  }else{
    if(lastclicked === "" && lastclicked !== this.id){
      lastclicked = this.id;
    }
  }
  if(lastclicked !== "" && lastclicked !== this.id){
    $("#testbed_name2").html("Nó: " +nodeurl+testbed[lastclicked][0] + " com vizinhos: " + testbed_neighborhoods[lastclicked]);
    $("#testbed_ip2").html("Ip: " + testbed_ips[lastclicked]);
    $("#testbed_con2").html("Conectado atualmente com: " + testbed[lastclicked][3]);
    lastclicked = "";
  }
    $("#testbed_name").html("Nó: " +nodeurl+testbed[this.id][0] + " com vizinhos: " + testbed_neighborhoods[this.id]);
    $("#testbed_ip").html("Ip: " + testbed_ips[this.id]);
    $("#testbed_con").html("Conectado atualmente com: " + testbed[this.id][3]);
  fixPosition();
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
    resetItAll();
  });
 $("#script").on("click", function(){
  for (var x in testbed){
    for (var y in testbed){
      if(hasConnection(x, y)){
        setText(document.getElementById('nodename1'), "omf.ufg.node"+testbed[x][0]);
        setText(document.getElementById('nodename2'), "omf.ufg.node"+testbed[y][0]);
        setText(document.getElementById('ip1'), testbed_ips[x]);
        setText(document.getElementById('ip2'), testbed_ips[x]);
        setText(document.getElementById('ip3'), testbed_ips[y]);
      }
    }
  }
 });
 $("#downs").on("click", function(){
  var blob = new Blob([getText(document.getElementById('texto'))], {
    type: "text/plain;charset=utf-8;",
  });
  saveAs(blob, "scriptTestbedNode.rb");
 });
});

function img_update () {
  contexto.drawImage(canvas, 0, 0);
}

function getText(obj) {
    return obj.textContent ? obj.textContent : obj.innerText;
}

function setText(obj, to) {
    obj.textContent? obj.textContent = to : obj.innerText = to;
}

function ifNeighborhoods(original, other){
  return testbed_neighborhoods[original].indexOf(other) > -1;
}

function draw_image(ix, iy){
  base_image = new Image();
  base_image.src = '/testbed.png'
  base_image.onload = function(){
    contexto.drawImage(base_image, ix, iy);
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
  for (var x in testbed){
    for (var y in testbed){
      if(hasConnection(x, y)){
        contexto.beginPath();
        contexto.moveTo(testbed[y][1], testbed[y][2]);
        contexto.lineTo(testbed[x][1], testbed[x][2]);
        contexto.stroke();
      }
    }
  }
}

function hasConnection(name, other){
  return testbed[name][3].indexOf(other) > -1;
}

  init();

}, false); }