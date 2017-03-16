"use strict";angular.module("tramappApp",["ngAnimate","ngRoute","leaflet-directive"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"})}]),angular.module("tramappApp").controller("MainCtrl",["DataService","$interval","$http","$scope",function(a,b,c,d){var e=this;e.stops=[],L.Icon.Default.imagePath="leaflet-images",e.stopFilter={},e.stopData={title:"Titulo"},e.tituloParada="",e.selectedStopId=101,e.selectedStop={},e.zaragoza={lat:41.65,lng:-.89,zoom:13},c.get("data/paradas.json").success(function(b,c){e.geojson={data:b,style:{fillColor:"green",weight:3,opacity:1,color:"black",dashArray:"2",fillOpacity:.7},onEachFeature:function(b,c){c.bindPopup(b.properties.NOMBRE),c.on({mouseover:function(){c.openPopup()},click:function(){e.selectedStopId=b.properties.POSTE,e.selectedStop=a.getStopById(e.selectedStopId)}})}};for(var d=0;d<b.features.length;d++)e.stops.push(b.features[d].properties)}),e.getStops=function(){return a.data},e.setCurrentStop=function(a){e.selectedStopId=a.id,e.selectedStop=a,e.updateLed(a)},e.setCurrentStopById=function(b){e.selectedStopId=b,e.selectedStop=a.getStopById(stopID),e.updateLed(stop)},e.updateLed=function(a){var b=a;f(b.destinos),g(b.mensajes)},a.updateData().then(function(b){e.selectedStop=a.getStopById(e.selectedStopId),e.updateLed(e.selectedStop)}),a.startAutoUpdate(3e4,function(){e.selectedStop=a.getStopById(e.selectedStopId),e.updateLed(e.selectedStop)});var f=function(a){if(void 0!=a){if(a.length>0){var b=a[0];$("#firstDestination").changeText(b.linea+" "+b.destino),$("#firstDestination").changeMinutes(""+b.minutos)}if(a.length>1){var b=a[1];$("#secondDestination").changeText(b.linea+" "+b.destino),$("#secondDestination").changeMinutes(""+b.minutos)}}else $("#firstDestination").changeText("SIN DATOS"),$("#secondDestination").changeText("SIN DATOS")},g=function(a){if(a&&a.length>0){var b="";for(var c in a)b+=a[c]+"                 ";$("#messages").changeText(b)}},h={horizontalPixelsCount:100,verticalPixelsCount:5,pixelSize:1,disabledPixelColor:"#404040",enabledPixelColor:"red",pathToPixelImage:"images/pixel.669c0cb3.png",stepDelay:50,fixed:!0,runImmidiatly:!0},i={horizontalPixelsCount:100,verticalPixelsCount:5,pixelSize:3,disabledPixelColor:"#404040",enabledPixelColor:"red",pathToPixelImage:"images/pixel.669c0cb3.png",stepDelay:50,fixed:!1,runImmidiatly:!0};$("#firstDestination").leddisplay($.extend(h,{pixelSize:3.5})),$("#firstDestination").changeText("SIN DATOS"),$("#secondDestination").leddisplay($.extend(h,{pixelSize:3.5})),$("#secondDestination").changeText("SIN DATOS"),$("#messages").leddisplay($.extend(i,{pixelSize:3.5})),$("#messages").changeText("SIN DATOS")}]),angular.module("tramappApp").service("DataService",["$http","$interval",function(a,b){function c(a,b){return a=parseInt(a.id),b=parseInt(b.id),b>a?-1:a>b?1:0}var d=this;d.data=[];var e=null;d.getStopById=function(a){for(var b=!1,c=null,e=0;e<d.data.length&&!b;e++)d.data[e].id==a&&(b=!0,c=d.data[e]);return c},d.updateData=function(){return a.get("https://www.zaragoza.es/api/recurso/urbanismo-infraestructuras/tranvia.json?srsname=utm30n").then(function(a){if(a.data.totalCount>0){d.data=a.data.result,d.data.sort(c);for(var b=0;b<d.data.length;b++){var e=d.data[b].id.slice(-1);"1"==e?d.data[b].direction="Mago de Oz":"2"==e?d.data[b].direction="Avda. Academia":(console.err("Unknown direction "+e),d.data[b].direction="")}}else console.error("Totalcount returned by webservice is 0!");return d.data},function(a){return console.error("Error retrieving data: "+a),null})},d.startAutoUpdate=function(a,c){d.cancelAutoUpdate(),e=b(function(){d.updateData().then(function(a){c(a)})},a)},d.cancelAutoUpdate=function(){null!=e&&b.cancel(e)},d.stopData=function(b){return a({method:"GET",url:"http://www.zaragoza.es/api/recurso/urbanismo-infraestructuras/tranvia/"+b+".json?srsname=wgs84"}).then(function(a){return a.data},function(a){return null})}}]),function(a){var b={97:[[0,1,1,1,1],[1,0,1,0,0],[1,1,1,1,1]],65:[[0,1,1,1,1],[1,0,1,0,0],[1,1,1,1,1]],1072:[[0,1,1,1,1],[1,0,1,0,0],[1,1,1,1,1]],1040:[[0,1,1,1,1],[1,0,1,0,0],[1,1,1,1,1]],1041:[[1,1,1,1,1],[1,0,1,0,1],[1,0,1,1,1]],1073:[[1,1,1,1,1],[1,0,1,0,1],[1,0,1,1,1]],1042:[[1,1,1,1,1],[1,0,1,0,1],[0,1,0,1,0]],1074:[[1,1,1,1,1],[1,0,1,0,1],[0,1,0,1,0]],98:[[1,1,1,1,1],[1,0,1,0,1],[0,1,0,1,0]],66:[[1,1,1,1,1],[1,0,1,0,1],[0,1,0,1,0]],1043:[[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0]],1075:[[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0]],1076:[[0,0,0,1,1],[0,1,1,1,0],[1,0,0,1,0],[1,1,1,1,0],[0,0,0,1,1]],1044:[[0,0,0,1,1],[0,1,1,1,0],[1,0,0,1,0],[1,1,1,1,0],[0,0,0,1,1]],1045:[[1,1,1,1,1],[1,0,1,0,1],[1,0,0,0,1]],1077:[[1,1,1,1,1],[1,0,1,0,1],[1,0,0,0,1]],1025:[[1,1,1,1,1],[1,0,1,0,1],[1,0,0,0,1]],1105:[[1,1,1,1,1],[1,0,1,0,1],[1,0,0,0,1]],69:[[1,1,1,1,1],[1,0,1,0,1],[1,0,0,0,1]],101:[[1,1,1,1,1],[1,0,1,0,1],[1,0,0,0,1]],1046:[[1,1,0,1,1],[0,0,1,0,0],[1,1,1,1,1],[0,0,1,0,0],[1,1,0,1,1]],1078:[[1,1,0,1,1],[0,0,1,0,0],[1,1,1,1,1],[0,0,1,0,0],[1,1,0,1,1]],1047:[[1,0,0,0,1],[1,0,1,0,1],[0,1,0,1,0]],1079:[[1,0,0,0,1],[1,0,1,0,1],[0,1,0,1,0]],1048:[[1,1,1,1,1],[0,0,0,1,0],[0,0,1,0,0],[1,1,1,1,1]],1080:[[1,1,1,1,1],[0,0,0,1,0],[0,0,1,0,0],[1,1,1,1,1]],1049:[[1,1,1,1,1],[0,0,0,1,0],[0,0,1,0,0],[1,1,1,1,1]],1081:[[1,1,1,1,1],[0,0,0,1,0],[0,0,1,0,0],[1,1,1,1,1]],1050:[[1,1,1,1,1],[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1]],1082:[[1,1,1,1,1],[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1]],75:[[1,1,1,1,1],[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1]],107:[[1,1,1,1,1],[0,0,1,0,0],[0,1,0,1,0],[1,0,0,0,1]],1051:[[0,0,0,0,1],[0,1,1,1,1],[1,0,0,0,0],[1,1,1,1,1]],1083:[[0,0,0,0,1],[0,1,1,1,1],[1,0,0,0,0],[1,1,1,1,1]],1052:[[1,1,1,1,1],[0,1,0,0,0],[0,0,1,0,0],[0,1,0,0,0],[1,1,1,1,1]],1084:[[1,1,1,1,1],[0,1,0,0,0],[0,0,1,0,0],[0,1,0,0,0],[1,1,1,1,1]],77:[[1,1,1,1,1],[0,1,0,0,0],[0,0,1,0,0],[0,1,0,0,0],[1,1,1,1,1]],109:[[1,1,1,1,1],[0,1,0,0,0],[0,0,1,0,0],[0,1,0,0,0],[1,1,1,1,1]],72:[[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1]],104:[[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1]],1053:[[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1]],1085:[[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1]],79:[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],111:[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],1054:[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],1086:[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],1055:[[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],1087:[[1,1,1,1,1],[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],1056:[[1,1,1,1,1],[1,0,1,0,0],[1,1,1,0,0]],1088:[[1,1,1,1,1],[1,0,1,0,0],[1,1,1,0,0]],80:[[1,1,1,1,1],[1,0,1,0,0],[1,1,1,0,0]],112:[[1,1,1,1,1],[1,0,1,0,0],[1,1,1,0,0]],67:[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1]],99:[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1]],1057:[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1]],1089:[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1]],1058:[[1,0,0,0,0],[1,1,1,1,1],[1,0,0,0,0]],1090:[[1,0,0,0,0],[1,1,1,1,1],[1,0,0,0,0]],84:[[1,0,0,0,0],[1,1,1,1,1],[1,0,0,0,0]],116:[[1,0,0,0,0],[1,1,1,1,1],[1,0,0,0,0]],1059:[[1,1,1,0,1],[0,0,1,0,1],[1,1,1,1,0]],1091:[[1,1,1,0,1],[0,0,1,0,1],[1,1,1,1,0]],1092:[[0,1,1,0,0],[1,0,0,1,0],[1,1,1,1,1],[1,0,0,1,0],[0,1,1,0,0]],1060:[[0,1,1,0,0],[1,0,0,1,0],[1,1,1,1,1],[1,0,0,1,0],[0,1,1,0,0]],1061:[[1,1,0,1,1],[0,0,1,0,0],[1,1,0,1,1]],1093:[[1,1,0,1,1],[0,0,1,0,0],[1,1,0,1,1]],88:[[1,1,0,1,1],[0,0,1,0,0],[1,1,0,1,1]],120:[[1,1,0,1,1],[0,0,1,0,0],[1,1,0,1,1]],1062:[[1,1,1,1,1],[0,0,0,0,1],[1,1,1,1,1],[0,0,0,0,1]],1094:[[1,1,1,1,1],[0,0,0,0,1],[1,1,1,1,1],[0,0,0,0,1]],1063:[[1,1,1,0,0],[0,0,1,0,0],[1,1,1,1,1]],1095:[[1,1,1,0,0],[0,0,1,0,0],[1,1,1,1,1]],1064:[[1,1,1,1,1],[0,0,0,0,1],[0,0,1,1,1],[0,0,0,0,1],[1,1,1,1,1]],1096:[[1,1,1,1,1],[0,0,0,0,1],[0,0,1,1,1],[0,0,0,0,1],[1,1,1,1,1]],1065:[[1,1,1,1,1],[0,0,0,0,1],[0,0,1,1,1],[0,0,0,0,1],[1,1,1,1,1],[0,0,0,0,1]],1097:[[1,1,1,1,1],[0,0,0,0,1],[0,0,1,1,1],[0,0,0,0,1],[1,1,1,1,1],[0,0,0,0,1]],1066:[[1,0,0,0,0],[1,1,1,1,1],[0,0,1,0,1],[0,0,1,1,1]],1098:[[1,0,0,0,0],[1,1,1,1,1],[0,0,1,0,1],[0,0,1,1,1]],1067:[[1,1,1,1,1],[0,0,1,0,1],[0,0,1,1,1],[0,0,0,0,0],[1,1,1,1,1]],1099:[[1,1,1,1,1],[0,0,1,0,1],[0,0,1,1,1],[0,0,0,0,0],[1,1,1,1,1]],1068:[[1,1,1,1,1],[0,0,1,0,1],[0,0,1,1,1]],1100:[[1,1,1,1,1],[0,0,1,0,1],[0,0,1,1,1]],1069:[[0,1,0,1,0],[1,0,0,0,1],[1,0,1,0,1],[0,1,1,1,0]],1101:[[0,1,0,1,0],[1,0,0,0,1],[1,0,1,0,1],[0,1,1,1,0]],1070:[[1,1,1,1,1],[0,0,1,0,0],[0,1,1,1,0],[1,0,0,0,1],[0,1,1,1,0]],1102:[[1,1,1,1,1],[0,0,1,0,0],[0,1,1,1,0],[1,0,0,0,1],[0,1,1,1,0]],1071:[[1,1,1,0,1],[1,0,1,1,0],[1,1,1,1,1]],1103:[[1,1,1,0,1],[1,0,1,1,0],[1,1,1,1,1]],68:[[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],100:[[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],70:[[1,1,1,1,1],[1,0,1,0,0],[1,0,0,0,0]],102:[[1,1,1,1,1],[1,0,1,0,0],[1,0,0,0,0]],71:[[0,1,1,1,0],[1,0,0,0,1],[1,0,1,0,1],[1,0,1,1,1]],103:[[0,1,1,1,0],[1,0,0,0,1],[1,0,1,0,1],[1,0,1,1,1]],73:[[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1]],105:[[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1]],74:[[0,0,0,1,0],[0,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0]],106:[[0,0,0,1,0],[0,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0]],76:[[1,1,1,1,1],[0,0,0,0,1],[0,0,0,0,1]],108:[[1,1,1,1,1],[0,0,0,0,1],[0,0,0,0,1]],78:[[1,1,1,1,1],[0,0,1,0,0],[0,0,0,1,0],[1,1,1,1,1]],110:[[1,1,1,1,1],[0,0,1,0,0],[0,0,0,1,0],[1,1,1,1,1]],81:[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0],[0,0,0,0,1]],113:[[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0],[0,0,0,0,1]],82:[[1,1,1,1,1],[1,0,1,1,0],[1,1,1,0,1]],114:[[1,1,1,1,1],[1,0,1,1,0],[1,1,1,0,1]],83:[[0,1,1,0,1],[1,0,1,0,1],[1,0,1,1,0]],115:[[0,1,1,0,1],[1,0,1,0,1],[1,0,1,1,0]],85:[[1,1,1,1,0],[0,0,0,0,1],[0,0,0,0,1],[1,1,1,1,0]],117:[[1,1,1,1,0],[0,0,0,0,1],[0,0,0,0,1],[1,1,1,1,0]],86:[[1,1,1,0,0],[0,0,0,1,0],[0,0,0,0,1],[0,0,0,1,0],[1,1,1,0,0]],118:[[1,1,1,0,0],[0,0,0,1,0],[0,0,0,0,1],[0,0,0,1,0],[1,1,1,0,0]],87:[[1,1,1,1,0],[0,0,0,0,1],[0,0,1,1,0],[0,0,0,0,1],[1,1,1,1,0]],119:[[1,1,1,1,0],[0,0,0,0,1],[0,0,1,1,0],[0,0,0,0,1],[1,1,1,1,0]],89:[[1,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1],[0,0,1,0,0],[1,1,0,0,0]],121:[[1,1,0,0,0],[0,0,1,0,0],[0,0,0,1,1],[0,0,1,0,0],[1,1,0,0,0]],90:[[1,0,0,1,1],[1,0,1,0,1],[1,1,0,0,1]],122:[[1,0,0,1,1],[1,0,1,0,1],[1,1,0,0,1]],49:[[0,1,0,0,1],[1,1,1,1,1],[0,0,0,0,1]],50:[[1,0,1,1,1],[1,0,1,0,1],[1,1,1,0,1]],51:[[1,0,1,0,1],[1,0,1,0,1],[1,1,1,1,1]],52:[[1,1,1,0,0],[0,0,1,0,0],[1,1,1,1,1]],53:[[1,1,1,0,1],[1,0,1,0,1],[1,0,1,1,1]],54:[[0,1,1,1,1],[1,0,1,0,1],[0,0,1,1,1]],55:[[1,0,0,0,0],[1,0,0,0,0],[1,1,1,1,1]],56:[[1,1,1,1,1],[1,0,1,0,1],[1,1,1,1,1]],57:[[1,1,1,0,1],[1,0,1,0,1],[1,1,1,1,1]],48:[[1,1,1,1,1],[1,0,0,0,1],[1,1,1,1,1]],43:[[0,0,1,0,0],[0,1,1,1,0],[0,0,1,0,0]],45:[[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]],46:[[0,0,0,0,1]],44:[[0,0,0,0,1],[0,0,0,1,0]],33:[[1,1,1,0,1]],40:[[0,1,1,1,0],[1,0,0,0,1]],41:[[1,0,0,0,1],[0,1,1,1,0]],32:[[0,0,0,0,0],[0,0,0,0,0]]},c=[0,0,0,0,0],d={horizontalPixelsCount:90,verticalPixelsCount:5,pixelSize:5,disabledPixelColor:"#404040",enabledPixelColor:"red",pathToPixelImage:"pixel.png",stepDelay:40,backgroundColor:"#202020",pixelRatio:.7,runImmidiatly:!0},e=function(b){return"DIV"==b.tagName?g:"CANVAS"==b.tagName?h:void a.error('Element "'+b.tagName+'" dont supported in jQuery.leddisplay plugin')},f={getPixelByOptions:function(b){var c=a("<div></div>");return c.css("width",b.pixelSize+"px"),c.css("height",b.pixelSize+"px"),c.css("background",'url("'+b.pathToPixelImage+'")'),c.css("float","left"),c.css("background-size","cover"),c.css("background-color",b.disabledPixelColor),c},showTextDiv:function(b,c,d){var e=b.data("options"),f=0;0>d&&(f=-1*d);var g=c.length;g=d>=0?f+(e.horizontalPixelsCount-d):f+e.horizontalPixelsCount,g>c.length&&(g=c.length);for(var h=b.data("allPixels"),i=f;g>i;i++)for(var j=c[i],k=d+i,l=0;l<j.length;l++){k>e.horizontalPixelsCount&&(k-=e.horizontalPixelsCount);var m=h[l*e.horizontalPixelsCount+k];0==j[l]?a(m).css("background-color",e.disabledPixelColor):a(m).css("background-color",e.enabledPixelColor)}},showTextCanvas:function(a,b,c){var d=a.data("options"),e=a.data("2dContext"),f=0;0>c&&(f=-1*c);var g=b.length;g=c>=0?f+(d.horizontalPixelsCount-c):f+d.horizontalPixelsCount,g>b.length&&(g=b.length);for(var h=a.data("allPixels"),i=f;g>i;i++)for(var j=b[i],k=c+i,l=0;l<j.length;l++)if(0!=j[l]){k>d.horizontalPixelsCount&&(k-=d.horizontalPixelsCount);var m=h[l*d.horizontalPixelsCount+k];e.beginPath(),e.arc(m.centerX,m.centerY,m.radius,0,2*Math.PI,!1),m.enabled=!0,e.fillStyle=d.enabledPixelColor,e.fill()}},getDataFromString:function(a){for(var b=[],d=0;d<a.length;d++){for(var e=a[d],f=this.getDataForCharacter(e),g=0;g<f.length;g++)b.push(f[g]);32!=e.charCodeAt()&&b.push(c)}return b},getDataForCharacter:function(a){var c=a.charCodeAt();return 32>c?[]:b[c]?b[c]:[[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1]]},clearDiv:function(a){var b=a.data("options"),c=a.data("allPixels");c.css("background-color",b.disabledPixelColor)},clearCanvas:function(a){var b=a.data("options"),c=a.data("allPixels"),d=a.data("2dContext");f.canvas_drawDisabledPixels(d,c,b)},canvas_fillBackground:function(a,b){a.beginPath();var c=b.horizontalPixelsCount*b.pixelSize,d=b.verticalPixelsCount*b.pixelSize;a.rect(0,0,c,d),a.fillStyle=b.backgroundColor,a.fill()},canvas_drawDisabledPixels:function(b,c,d){a(c).each(function(){if(this.enabled){var a=this.centerX-d.pixelSize/2,c=this.centerY-d.pixelSize/2;b.beginPath(),b.rect(a,c,d.pixelSize,d.pixelSize),b.fillStyle=d.backgroundColor,b.fill(),b.beginPath(),b.arc(this.centerX,this.centerY,this.radius,0,2*Math.PI,!1),b.fillStyle=d.disabledPixelColor,b.fill(),this.enabled=!1}})}},g={init:function(b,c){var e=a.extend(d,b);this.data("options",e),this.data("fixed",e.fixed);var g="hi";this.data("initialText",g),this.data("textData",f.getDataFromString(g)),this.text(""),this.data("currentPosition",e.horizontalPixelsCount),this.css("width",e.horizontalPixelsCount*e.pixelSize+"px"),this.css("height",e.verticalPixelsCount*e.pixelSize+"px");for(var h=1;h<=e.verticalPixelsCount;h++)for(var i=1;i<=e.horizontalPixelsCount;i++)this.append(f.getPixelByOptions(e));this.data("allPixels",this.find("div"));var j=this;if(e.runImmidiatly){var k=j.data("fixed");if(k){var l=j.data("textData");f.showTextDiv(j,l,1),j.data("currentPosition",1)}var m=setInterval(function(){f.clearDiv(j);var a=j.data("currentPosition"),b=j.data("textData"),c=j.data("minutesData"),d=j.data("minutesText");if(k||a--,f.showTextDiv(j,b,a),k&&c&&d&&d.length>0){var g=e.horizontalPixelsCount-4*d.length;f.showTextDiv(j,c,g)}0>=a&&b.length<-1*a&&(a=e.horizontalPixelsCount),j.data("currentPosition",a)},e.stepDelay);this.data("intervalId",m)}},destroy:function(){clearInterval(this.data("intervalId")),this.children().remove(),this.removeData(),this.css("width",""),this.css("height","")}},h={init:function(b,c){var e=a.extend(d,b),g=this[0].getContext("2d");this.data("2dContext",g),this.data("options",e);var h=c?c:this.text();this.data("initialText",h),this.data("textData",f.getDataFromString(h)),this.text(""),this.data("currentPosition",e.horizontalPixelsCount),this.attr("width",e.horizontalPixelsCount*e.pixelSize+"px"),this.attr("height",e.verticalPixelsCount*e.pixelSize+"px"),f.canvas_fillBackground(g,e);for(var i=[],j=0;j<e.verticalPixelsCount;j++)for(var k=0;k<e.horizontalPixelsCount;k++){var l=k*e.pixelSize+e.pixelSize/2,m=j*e.pixelSize+e.pixelSize/2,n=e.pixelSize*(e.pixelRatio/2);i.push({centerX:l,centerY:m,radius:n,enabled:!0})}f.canvas_drawDisabledPixels(g,i,e),this.data("allPixels",i);var o=this;if(e.runImmidiatly){var p=setInterval(function(){f.clearCanvas(o);var a=o.data("currentPosition"),b=o.data("textData");f.showTextCanvas(o,b,--a),0>=a&&b.length<-1*a&&(a=e.horizontalPixelsCount),o.data("currentPosition",a)},e.stepDelay);this.data("intervalId",p)}},destroy:function(){clearInterval(this.data("intervalId")),this.removeData(),this.removeAttr("width"),this.removeAttr("height")}},i={init:function(){var b=arguments;return this.each(function(){var c=a(this);if(!c.data("leddisplay")){c.data("leddisplay",!0);var d=e(this);d.init.apply(c,b)}})},destroy:function(){var b=arguments;return this.each(function(){var c=a(this);if(c.data("leddisplay")){c.data("leddisplay",null);var d=e(this);d.destroy.apply(c,b)}})},start:function(){},stop:function(){}};a.fn.changeText=function(a){var b=a;this.data("initialText",b),this.data("textData",f.getDataFromString(b))},a.fn.changeMinutes=function(a){var b=a;this.data("minutesText",b),this.data("minutesData",f.getDataFromString(b))},a.fn.leddisplay=function(b){return i[b]?i[b].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof b&&b?void a.error('Method "'+b+'" dont find in jQuery.leddisplay plugin'):i.init.apply(this,arguments)}}(jQuery),angular.module("tramappApp").run(["$templateCache",function(a){a.put("views/main.html",'<!--{{main.stopData.title}}\n<br/>\nLast updated: {{main.stopData.lastUpdated}}\n<div class="row marketing">\n  <div ng-repeat="destino in main.stopData.destinos">{{destino.linea}} {{destino.destino}} {{destino.minutos}}</div>\n</div>\n\n<div class="row marketing">\n  <div ng-repeat="mensaje in main.stopData.mensajes">{{mensaje}}</div>\n</div>\n--> <div class="flex-container"> <div class="flex-column"> <leaflet center="main.zaragoza" geojson="main.geojson"></leaflet> </div> <div class="fixed-column"> <div class="well well-sm" id="stopTitle"><span id="title">{{main.selectedStop.title}}</span> <br><span id="direction">Sentido {{main.selectedStop.direction}}</span></div> <div id="ledDisplay"> <div class="ledRow" id="firstDestination">{{main.stopData.title}}</div> <br> <div class="ledRow" id="secondDestination">{{main.stopData.title}}</div> <br> <div class="ledRow" id="messages">{{main.stopData.title}}</div> </div> <div id="stopFilter" class="form-group"> <input id="searchinput" ng-model="main.stopFilter.title" class="form-control" type="search" placeholder="Filtrar..."> </div> <div id="stopList"> <button type="button" class="list-group-item" ng-repeat="stop in main.getStops() | filter:main.stopFilter" ng-click="main.setCurrentStop(stop)" class="list-group-item" ng-class="{\'active\':stop.id == main.selectedStop.id}">{{stop.title}} <span class="badge" ng-if="stop.destinos.length>0">{{stop.destinos[0].minutos}} min.</span> <span class="badge" ng-if="!stop.destinos || stop.destinos.length==0">Sin info</span> <br><span style="float:left;font-size:0.8em">Sentido: {{stop.direction}}</span> </button> </div> </div> </div>')}]);