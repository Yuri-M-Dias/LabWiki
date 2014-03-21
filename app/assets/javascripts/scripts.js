= require jquery
= require jquery_ujs
= require turbolinks
= require_tree .

  $(function() {
    $( "#draggable" ).draggable();
  });
        <!-- This script and many more are available free online at -->
        <!-- Created by: elouai.com -->
        <!-- Início
         
        var ie=document.all;
        var nn6=document.getElementById&&!document.all;
        var isdrag=false;
        var x,y;
        var dobj;
         
        function movemouse(e){
        if(isdrag){
            dobj.style.left = nn6 ? tx + e.clientX - x : tx + event.clientX - x;
            dobj.style.top = nn6 ? ty + e.clientY - y : ty + event.clientY - y;
            return false;
            }
        }
         
        function selectmouse(e){
            var fobj = nn6 ? e.target : event.srcElement;
            var topelement = nn6 ? "HTML" : "BODY";
            while (fobj.tagName != topelement && fobj.className != "dragme"){
                fobj = nn6 ? fobj.parentNode : fobj.parentElement;
            }
             
            if (fobj.className=="dragme"){
                isdrag = true;
                dobj = fobj;
                tx = parseInt(dobj.style.left+0);
                ty = parseInt(dobj.style.top+0);
                x = nn6 ? e.clientX : event.clientX;
                y = nn6 ? e.clientY : event.clientY;
                document.onmousemove=movemouse;
                return false;
            }
        }
         
        document.onmousedown=selectmouse;
        document.onmouseup=new Function("isdrag=false");
        // Fim -->

    $(document).ready(function() {

     $("#example div").click(function() {
        var index = $(this).index();
        $("#example_index").html("Index " + index + " was clicked");
     });
   
     });

    (function(){ 
      var c = document.getElementById(''); 
      var ctx = c.getContext("2d"); /* on mouse "mexe" */ 
    });