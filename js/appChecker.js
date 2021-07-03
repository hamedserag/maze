

var mapDom = document.getElementById("map");
if(mapDom.children.length == 0){
  console.log("Reset");
  window.location.reload();
}else {
  console.log("Map Drawn Correctly");
}
