commit 0eb39e72a2cfb168d23b9a8895d188bf3d353bb4
Author: Hoier <yurimathe.yp@gmail.com>
Date:   Mon Jun 30 15:03:02 2014 -0300

    Atualizando arquivos

diff --git a/app/assets/javascripts/scripts.js b/app/assets/javascripts/scripts.js
index 364b4ff..702cbee 100644
--- a/app/assets/javascripts/scripts.js
+++ b/app/assets/javascripts/scripts.js
@@ -155,7 +155,7 @@ function addConnectedNames(saindo, entrando){
 function resetItAll(){
   for (var x in testbed){
       testbed[x][3] = "";
-    }
+  }
 }
 
 function getPosition(element) {
diff --git a/app/assets/stylesheets/application.css b/app/assets/stylesheets/application.css
index 361ee8e..b6199b5 100644
--- a/app/assets/stylesheets/application.css
+++ b/app/assets/stylesheets/application.css
@@ -67,4 +67,8 @@ canvas {
 	top: 0px; 
 	left: -3px; 
 	background: transparent;
-} 
\ No newline at end of file
+} 
+
+#texto{
+
+}
\ No newline at end of file
diff --git a/app/views/home/index.html.erb b/app/views/home/index.html.erb
index ed1c7a7..f3e4100 100644
--- a/app/views/home/index.html.erb
+++ b/app/views/home/index.html.erb
@@ -29,50 +29,50 @@ b {
         <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
         <h4 class="modal-title" id="myModalLabel">Script gerado</h4>
       </div>
-      <span id="texto" class="modal-body">
-# Definição do grupo server<br/>
-defGroup('server', "<span id="nodename1">omf.ufg.node1</span>") do |node|<br/>
-    &emsp;node.net.e1.ip = "<span id="ip1">192.168.10.1</span>"<br/>
-<br/>
-    &emsp;# Adiciona uma aplicação pré-definida<br/>
-    &emsp;node.addApplication("oml:app:iperf") do |app|<br/>
-        &emsp;&emsp;&emsp;# Configura propriedades pré-definidas na aplicação<br/>
-        &emsp;&emsp;&emsp;app.setProperty('server', true)<br/>
-        &emsp;&emsp;&emsp;app.setProperty('port', 5000)<br/>
-    &emsp;&emsp;end<br/>
-end<br/>
-<br/>
-# Definição do grupo client<br/>
-defGroup('client', "<span id="nodename2">omf.ufg.node2</span>") do |node|<br/>
-    &emsp;&emsp;node.net.e1.ip = "<span id="ip2">192.168.10.2</span>"<br/>
-    &emsp;&emsp;# Adiciona uma aplicação pré-definida<br/>
-    &emsp;&emsp;node.addApplication("oml:app:iperf") do |app|<br/>
-        &emsp;&emsp;&emsp;# Configura propriedades pré-definidas na aplicação<br/>
-        &emsp;&emsp;&emsp;app.setProperty('client', '<span id="ip3">192.168.10.1</span>')<br/>
-        &emsp;&emsp;&emsp;app.setProperty('port', 5000)<br/>
-        &emsp;&emsp;&emsp;app.setProperty('time', 30)<br/>
-        &emsp;&emsp;&emsp;app.setProperty('interval', '1')<br/>
+      <pre id="texto" class="modal-body">
+# Definição do grupo server
+defGroup('server', "<span id="nodename1">omf.ufg.node1</span>") do |node|
+    node.net.e1.ip = "<span id="ip1">192.168.10.1</span>"
+
+    # Adiciona uma aplicação pré-definida
+    node.addApplication("oml:app:iperf") do |app|
+        # Configura propriedades pré-definidas na aplicação
+        app.setProperty('server', true)
+        app.setProperty('port', 5000)
+    end
+end
+
+# Definição do grupo client
+defGroup('client', "<span id="nodename2">omf.ufg.node2</span>") do |node|
+    node.net.e1.ip = "<span id="ip2">192.168.10.2</span>"
+    # Adiciona uma aplicação pré-definida
+    node.addApplication("oml:app:iperf") do |app|
+        # Configura propriedades pré-definidas na aplicação
+        app.setProperty('client', '<span id="ip3">192.168.10.1</span>')
+        app.setProperty('port', 5000)
+        app.setProperty('time', 30)
+        app.setProperty('interval', '1')
         
-        &emsp;&emsp;# Define qual ponto de medida será coletado e como será feito a coleta<br/>
-        &emsp;&emsp;app.measure('transfer', :samples => 1)<br/>
-    &emsp;&emsp;end<br/>
-end<br/>
-<br/>
-#A execução do experimento é condicionada ao evento ALL_UP_AND_INSTALLED, isto é, o experimento só terá inicio quando todos os nós tiverem ligados e com as aplicações definidas acima devidamente instaladas.<br/> 
-onEvent(:ALL_UP_AND_INSTALLED) do |event|<br/>
-    &emsp;&emsp;wait 5<br/>
-  &emsp;&emsp;#Inicia a aplicação definida no grupo server<br/>
-    &emsp;&emsp;group("server").startApplications<br/>
-    &emsp;&emsp;wait 5<br/>
-  &emsp;&emsp;#Inicia a aplicação definida no grupo client<br/>
-    &emsp;&emsp;group("client").startApplications<br/>
-    &emsp;&emsp;wait 40<br/>
-    &emsp;&emsp;#Pausa execução das aplicações em todos os grupos<br/>
-    &emsp;&emsp;allGroups.stopApplications<br/>
-    &emsp;&emsp;#Faz a chamada para finalizar o experimento<br/>
-    &emsp;&emsp;Experiment.done<br/>
-end<br/>
-      </span>
+        # Define qual ponto de medida será coletado e como será feito a coleta
+        app.measure('transfer', :samples => 1)
+    end
+end
+
+#A execução do experimento é condicionada ao evento ALL_UP_AND_INSTALLED, isto é, o experimento só terá inicio quando todos os nós tiverem ligados e com as aplicações definidas acima devidamente instaladas. 
+onEvent(:ALL_UP_AND_INSTALLED) do |event|
+    wait 5
+  #Inicia a aplicação definida no grupo server
+    group("server").startApplications
+    wait 5
+  #Inicia a aplicação definida no grupo client
+    group("client").startApplications
+    wait 40
+    #Pausa execução das aplicações em todos os grupos
+    allGroups.stopApplications
+    #Faz a chamada para finalizar o experimento
+    Experiment.done
+end
+      </pre>
       <div class="modal-footer">
         <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
         <button type="button" class="btn btn-primary" value="Download" id="downs">Download</button>
