var permissionGranted=!1,nonios13device=!1,permissionModal,rotationX=0,rotationY=0;
"undefined"!==typeof DeviceOrientationEvent&&"function"===typeof DeviceOrientationEvent.requestPermission?DeviceOrientationEvent.requestPermission()["catch"](function(){permissionModal=document.querySelector(".permission-modal-container");permissionModal.style.display="block";document.querySelector("#button-cancel").addEventListener("click",function(){permissionModal.remove()});document.querySelector("#button-allow").addEventListener("click",onAskButtonClicked);throw error;}).then(function(){permissionGranted=
!0}):(nonios13device=!0,console.log("non iOS 13 device is being used."));function onAskButtonClicked(){permissionModal.remove();DeviceOrientationEvent.requestPermission().then(function(a){permissionGranted="granted"===a?!0:!1})["catch"](console.error)}var dim,item,happy,ratio,mouse,decodedMsg,blackbox;paper.install(window);
window.onload=function(){var a=document.querySelector("#canvas");paper.setup(a);project.importSVG("happyholiday-final-outlined.svg",function(a,c){item=a;ratio=item.bounds.width/item.bounds.height;setupCanvas();item.style={fillColor:{hue:50,saturation:.6,brightness:.6}};happy=item.children.happy;happy.style={fillColor:{gradient:{stops:[["lightgreen",0],["darkorange",1]]},origin:happy.bounds.topCenter,destination:happy.bounds.bottomCenter}};var e=(new URLSearchParams(window.location.search)).get("msg");
console.log("got param from url: "+e);decodedMsg=new PointText;decodedMsg.fillColor="#d4af37";decodedMsg.justification="center";e?(decodedMsg.content=decryptParam(e),setupMsg(),console.log("decoded param from url: "+decodedMsg.content)):decodedMsg.content="Peace        Joy        Love"});document.querySelector(".msg-modal-toggle").addEventListener("click",function(){var a=document.querySelector(".msg-modal-container");a.style.top="50px"===a.style.top?"-400px":"50px"});document.querySelector(".msg-modal-container button.msg-modal-close").addEventListener("click",
function(){document.querySelector(".msg-modal-container").style.top="-400px"});a=document.querySelector("#url-generate-button");var b=document.querySelector("#url-generated");a.addEventListener("click",function(a){var c=document.querySelector("input.msg").value;console.log("param val: "+c);a=window.location.href;console.log("full url: "+a);a=a.split("?")[0];console.log("base url: "+a);c=encryptParam(c);a+="?msg="+c;console.log("end url: "+a);b.value=a;document.querySelector("#url-open-newtab").setAttribute("href",
a);b.classList.remove("anim-flash");setTimeout(function(){b.classList.add("anim-flash")},10)});b.addEventListener("click",function(a){a.preventDefault();this.focus();this.select();document.execCommand("copy")});window.addEventListener("deviceorientation",function(a){rotationX=a.gamma;rotationY=a.beta});var d=new Point;view.onFrame=function(a){if(item){a=30*a.time;var c=new Point([rotationX,rotationY]);c.x=clamp(c.x,-30,30);c.y=clamp(c.y,-30,30);happy.translate([.1*(c.x-d.x),.1*(c.y-d.y)]);for(var b=
item.children.length-1;0<=b;b--){var f=item.children[b],e=.04*Math.floor((item.children.length-b)/20);f.name||0!=b&&f.translate([(c.x-d.x)*e,(c.y-d.y)*e])}d=c.clone();for(c=0;c<item.children.length;c++)b=item.children[c],1!==c&&(b.fillColor.saturation=.6+.2*Math.cos(c+a/10),b.fillColor.brightness=.5+.2*Math.cos(c+a/8));item.children.newyear.fillColor="#d4af37";item.children.frame.fillColor="#d4af37";item.children.message.fillColor="#d4af37";setupMsg();mouse=new Point(rotationX,rotationY);mouse.x=
map(mouse.x,-20,20,happy.bounds.left,happy.bounds.right);mouse.y=map(mouse.y,-20,20,0,happy.bounds.bottom);c=clamp(mouse.x,happy.bounds.left,happy.bounds.right);b=happy.bounds.center.x+(happy.bounds.center.x-c);f=happy.fillColor;f.origin=[c,happy.bounds.top];f.destination=[b,happy.bounds.bottom];f.gradient.stops[0].color.hue=120+(40+40*Math.cos(a/30));f.gradient.stops[1].color.hue=35+(40+40*Math.cos(a/30))}}};
function setupMsg(){var a=item.children.message,b=decodedMsg.bounds.width;for(decodedMsg.fontSize=a.bounds.height/32*17;b>=.98*a.bounds.width;)decodedMsg.scale(.98),b=decodedMsg.bounds.width,console.log("too long, resized the text.");decodedMsg.position=[a.bounds.center.x,a.bounds.bottom-a.bounds.height/2]}
function setupCanvas(){var a=window.innerWidth,b=window.innerHeight;dim=calcDimensionFromRatio(ratio);view.viewSize.set(dim.x,dim.y);canvas.width=dim.x;canvas.height=dim.y;canvas.style.left=(a-canvas.width)/2+"px";canvas.style.top=(b-canvas.height)/2+"px";item.bounds.width=canvas.width;item.bounds.height=canvas.height}function calcDimensionFromRatio(a){if(window.innerWidth/window.innerHeight>a){var b=window.innerHeight;var d=b*a}else d=window.innerWidth,b=1*d/a;return{x:d,y:b}}window.onresize=function(a){setupCanvas()};
function clamp(a,b,d){return a<=b?b:a>=d?d:a}function map(a,b,d,e,c){return e+(a-b)/(d-b)*(c-e)}function lerp(a,b,d){return a+(b-a)*d}function encryptParam(a){return btoa(encodeURIComponent(a))}function decryptParam(a){return decodeURIComponent(atob(a))};