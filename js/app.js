var map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var caseDefiner = randomNumber(0, 4);
var indexStart = randomNumber(0, 12);
var endPt = [randomNumber(0, 12), randomNumber(0, 12)];
var startPt = [0, 0];

switch (caseDefiner) {
  case 0: //top
    startPt = [0, indexStart];
    break;
  case 1: //bottom
    startPt = [11, indexStart];
    break;
  case 2: //left
    startPt = [indexStart, 0];
    break;
  case 3: //right
    startPt = [indexStart, 11];
    break;
  default:
}
//map creation
map[startPt[0]][startPt[1]] = 2;
var correctPath = [];
buildPath(startPt, endPt);

function buildPath(startPt, endPt) {
  var curPt = [startPt[0], startPt[1]];
  while (!(curPt[0] == endPt[0] && curPt[1] == endPt[1])) {
    var dir = randomNumber(0, 2);
    correctPath.push(curPt);
    switch (dir) {
      case 0: //move on x
        if (curPt[0] < endPt[0]) {
          curPt[0]++;
        }
        if (curPt[0] > endPt[0]) {
          curPt[0]--;
        }
        break;
      case 1: //move on y
        if (curPt[1] < endPt[1]) {
          curPt[1]++;
        }
        if (curPt[1] > endPt[1]) {
          curPt[1]--;
        }
        break;
      default:
    }
    correctPath.push(curPt);
    if (map[curPt[0]][curPt[1]] != 2 && map[curPt[0]][curPt[1]] != 3) {
      map[curPt[0]][curPt[1]] = 1;
    }
  }
}

map[endPt[0]][endPt[1]] = 3;
//end of map creation
//construst fake paths
var numberOfFakePaths = randomNumber(2, 5);
for (var i = 0; i < numberOfFakePaths; i++) {
  var fakeStartPt = correctPath[randomNumber(0, correctPath.length)];
  var fakeEndPt = [randomNumber(0, 12), randomNumber(0, 12)];
  buildPath(fakeStartPt, fakeEndPt);
}
//end of construct fake paths
//map drawing
var mapDom = document.getElementById("map");
var mapString = "";
var walkableBlocksIndecies = [];
for (var i = 0; i < 12; i++) {
  mapString += "<div class='row'>";
  for (var x = 0; x < 12; x++) {
    if (map[i][x] == 1) {
      mapString += "<div class='block col-1 path'></div>"
    }
    if (map[i][x] == 2) {
      mapString += "<div id='start' class='block col-1 start bg-warning'>Start</div>"
    }
    if (map[i][x] == 3) {
      mapString += "<div id='end' class='block col-1 end path'></div>"
    }
    if (map[i][x] == 0) {
      mapString += "<div class='block col-1 grid'></div>"
    }
  }
  mapString += "</div>";
}
mapDom.innerHTML = mapString;
//end of map drawing
// Function to generate random number
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


//game █████████████████████████████████████████████████████████████████████████

//spawn player

var startBlock = document.getElementById("start").getBoundingClientRect();
var endBlock = document.getElementById("end").getBoundingClientRect();
var player = document.getElementById("player");

movePlayer(startBlock); //move player to intial position

//check possible moves ███████████████
var possibleMoves = [];
checkPossibleMoves(possibleMoves);

function checkPossibleMoves(possibleMoves) {
  var curPt = [startPt[0], startPt[1]];
  //x+1 y, x-1 y, x,y+1, x,y-1
  if (curPt[0] - 1 >= 0 && curPt[0] - 1 < 12) {
    if (map[curPt[0] - 1][curPt[1]] != 0) {
      possibleMoves.push([curPt[0] - 1, curPt[1], 0]); //up 0
    }
  }
  if (curPt[0] + 1 >= 0 && curPt[0] + 1 < 12) {
    if (map[curPt[0] + 1][curPt[1]] != 0) {
      possibleMoves.push([curPt[0] + 1, curPt[1], 1]); //down 1
    }
  }
  if (curPt[1] - 1 >= 0 && curPt[1] - 1 < 12) {
    if (map[curPt[0]][curPt[1] - 1] != 0) {
      possibleMoves.push([curPt[0], curPt[1] - 1, 2]); //left 2
    }
  }
  if (curPt[1] + 1 >= 0 && curPt[1] + 1 < 12) {
    if (map[curPt[0]][curPt[1] + 1] != 0) {
      possibleMoves.push([curPt[0], curPt[1] + 1, 3]); //right 3
    }
  }

  console.log(possibleMoves);
}
console.log(map);


//lock impossible moves
var btnsObj = document.querySelectorAll(".btnUp,.btnRight,.btnDown,.btnLeft");
//lock impossible moves ███████████████
lockMoves(possibleMoves);

function lockMoves(possibleMoves) {
  for (var i = 0; i < 4; i++) {
    btnsObj[i].disabled = true;
  }
  for (var i = 0; i < possibleMoves.length; i++) {
    document.querySelector(".btn" + possibleMoves[i][2]).disabled = false;
  }
}
//fill disabled moves
var moves = [-1, -1, -1, -1];
prepareMoves();

function prepareMoves() {
  var x = 0;
  for (var i = 0; i < possibleMoves.length; i++) {
    moves.splice(possibleMoves[i][2], 0, possibleMoves[i]);
  }
  console.log(moves);
}

//get move input
var blocks = document.querySelectorAll(".block");

function moveDirection(dir) {
  switch (dir) {
    case 0:
      console.log("input up");
      // console.log(moves[0]);
      // console.log(blocks[((moves[0][0]*12) + moves[0][1])]);
      // console.log(((moves[0][0]*12) + moves[0][1]));
      movePlayer(blocks[((moves[0][0] * 12) + moves[0][1])].getBoundingClientRect());
      startPt = [moves[0][0], moves[0][1]];
      checkWin(blocks[((moves[0][0] * 12) + moves[0][1])]);

      reset();

      break;
    case 1:
      console.log("input down");
      // console.log(moves[1]);
      // console.log(blocks[((moves[1][0]*12) + moves[1][1])]);
      // console.log(((moves[1][0]*12) + moves[1][1]));
      movePlayer(blocks[((moves[1][0] * 12) + moves[1][1])].getBoundingClientRect());
      startPt = [moves[1][0], moves[1][1]];
      checkWin(blocks[((moves[1][0] * 12) + moves[1][1])]);
      reset();

      break;
    case 2:
      console.log("input left");
      // console.log(moves[2]);
      // console.log(blocks[((moves[2][0]*12) + moves[2][1])]);
      // console.log(((moves[2][0]*12) + moves[2][1]));
      movePlayer(blocks[((moves[2][0] * 12) + moves[2][1])].getBoundingClientRect());
      startPt = [moves[2][0], moves[2][1]];
      checkWin(blocks[((moves[2][0] * 12) + moves[2][1])]);
      reset();

      break;
    case 3:
      console.log("input right");
      // console.log(moves[3]);
      // console.log(blocks[((moves[3][0]*12) + moves[3][1])]);
      // console.log(((moves[3][0]*12) + moves[3][1]));
      movePlayer(blocks[((moves[3][0] * 12) + moves[3][1])].getBoundingClientRect());
      startPt = [moves[3][0], moves[3][1]];
      checkWin(blocks[((moves[3][0] * 12) + moves[3][1])]);
      reset();
      break;
    default:

  }
}

//move
function movePlayer(blockRect) {
  player.style.top = (blockRect.top + blockRect.height / 4) + "px";
  player.style.left = (blockRect.left + blockRect.width / 4) + "px";
  player.style.width = blockRect.width / 2 + "px";
  player.style.height = blockRect.height / 2 + "px";
}
//RESET AND PREPARE FOR NEXT INPUT
function reset() {
  possibleMoves = [];
  console.log(possibleMoves);
  checkPossibleMoves(possibleMoves);
  lockMoves(possibleMoves);
  moves = [-1, -1, -1, -1];
  prepareMoves();
  vision(possibleMoves);
}

//check if won
function checkWin(block) {
  if (block.getAttribute("id") == "end") {
    alert("win"); //END GAME
    document.querySelector(".controls").innerHTML = "";
    for (var i = 0; i < path.length; i++) {
      path[i].style.background = "#fff";
    }
  }
}

var path = document.querySelectorAll(".path");
var endObj = document.querySelector("#end");
vision(possibleMoves);
function vision(possibleMoves) {
  for (var i = 0; i < path.length; i++) {
    path[i].style.background = "#000";
  }
  for (var i = 0; i < possibleMoves.length; i++) {
    blocks[((possibleMoves[i][0] * 12) + possibleMoves[i][1])].style.background = "#fff";
    if(blocks[((possibleMoves[i][0] * 12) + possibleMoves[i][1])] == endObj){
      endObj.innerHTML = "Finish";
    }
  }
}
