wormx = 0;
wormy = 0;
wormxspeed = 1;
wormyspeed = 0;
wormtotal = 0;
wormtail = [];

var w = 87; 
var s = 83;
var a = 65;
var d = 68;

var worm;
var grid = 20;

var dirt;

let gameOver = false;

function preload(){
  img =loadImage("Images/worm_game_over.png");
}

function setup() {
  createCanvas(500, 500);
  worm = new Worm();
  frameRate(5);
  pickLocation();
}

function draw() {
  if (!gameOver){
    background(0,150,0);
  wormdeath();
  wormmove();
  wormshape();
  
 if (wormeat(dirt)) {
   pickLocation();
 }
  
  fill(150, 75, 0);
  rect(dirt.x, dirt.y, grid, grid);

  } else {
    background(0,150,0);
    image(img,0,0,500,500);
  }
  
}

function keyPressed()
{
  if(keyCode === w)
    {
        wormdirection(0,-1);   
    }
    else if (keyCode === s)
    {
        wormdirection(0,1);
    }
    else if (keyCode === d)
    {
        wormdirection(1,0);
    }
    else if (keyCode === a)
    {
        wormdirection(-1,0); }
}

function pickLocation(){
  var cols = floor(width/grid);
  var rows = floor(height/grid);
  dirt = createVector (floor (random(cols)), floor (random (rows)));
  dirt.mult(grid);
}

function Worm (){ 
  
  wormdirection = function(x, y){
    wormxspeed = x;
    wormyspeed = y;
  }
  
  wormeat = function(pos) {
    var distance = dist(wormx, wormy, pos.x, pos.y);
    if (distance < 1){
      wormtotal++;
      return true;
    } else {
      return false;
    }
  }
  
  wormmove = function() {
    if (wormtotal === wormtail.length) {
       for (var i = 0; i < wormtail.length-1; i++) {
        wormtail[i] = wormtail[i+1];
    }
  }
      wormtail[wormtotal-1] = createVector(wormx, wormy);
    
    wormx = wormx + wormxspeed*grid;
    wormy = wormy + wormyspeed*grid;
    
    wormx = constrain(wormx, 0, width-grid);
    wormy = constrain(wormy, 0, height-grid);
    
  }
  
  wormshape = function(){
     fill(255, 200, 200);
      for (var i = 0; i < wormtail.length; i++) {
        rect(wormtail[i].x, wormtail[i].y, grid, grid);
      }
    rect(wormx, wormy, grid, grid);}
  
  wormdeath = function(){
    for (var i = 0; i < wormtail.length; i++) {
      var pos = wormtail[i];
      var distance = dist(wormx, wormy, pos.x, pos.y);
      if (distance < 1){
        console.log('GAME OVER');
        wormtotal = 0;
        wormtail = [];
        gameOver = true;
      }
    }
  }
  
}

function endGame() {
  noLoop();
  gameOver = true;
}