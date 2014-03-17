<script type="text/javascript" src="jquery-1.3.2.min.js"></script>
    <script type="text/javascript">
    $(document).ready(function() {
        line(50,30, 100, 150);
        circle(110,110, 100);
    });

    function line(x1, y1, x2, y2) {
        c = $(document.body);
        var dx = Math.abs(x2-x1);
        var dy = Math.abs(y2-y1);
        var d = Math.max(dx, dy);
        var i=0;
        for(i=0; i < d; i++) {
            var img = $(document.createElement('img')).attr('src', 'blank.gif');
            var div = $(document.createElement('div')).width(1).height(1).css({'background-color': '#f00', position: 'absolute', left: Math.min(x1,x2)+(i*dx/d), top: Math.min(y1,y2)+(i*dy/d) });
            div.append(img);
            c.append(div);
        }
    }
    function circle(x, y, r) {
        c = $(document.body);
        var l = 2 * Math.PI * r;
        var i=0;
        for(i=0; i < l * (1+((10-Math.log(r+1))/10)); i++) {
            var x2 = r * Math.sin(360 * i/l);
            var y2 = r * Math.cos(360 * i/l);
            var img = $(document.createElement('img')).attr('src', 'blank.gif');
            var div = $(document.createElement('div')).width(1).height(1).css({'background-color': '#f00', position: 'absolute', left: x+x2, top: y+y2 });
            div.append(img);
            c.append(div);
        }
    }
    </script>
    <style type="text/css">
        <!--
        .dragme{position:relative;}
        -->
    </style>
    
    <script type="text/javascript">
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
         
    </script>

    <script>
    $(document).ready(function() {

     $("#example div").click(function() {
        var index = $(this).index();
        $("#example_index").html("Index " + index + " was clicked");
     });
   
     });
    </script>

    <script>(function(){ var c = document.getElementById(''); var ctx = c.getContext("2d"); /* on mouse "mexe" */ });</script>

