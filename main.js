var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 912;
canvas.height= 880;
document.body.appendChild(canvas);

//Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady=true;

};

bgImage.src = "images/preview.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;

};
heroImage.src = "images/icecram.png";
console.log(heroImage);
//Monster image

var monsterReady = false;
var monsterImage = new Image ();
monsterImage.onload = function () {
  monsterReady = true;

};
monsterImage.src = "images/KimK.png"

// Game Objects
var hero = {
  speed : 256,

};

var monster = {

};

var monstersCaught = 0;

//Handle keyboard control

var keysDown = {};

addEventListener("keydown", function (e){
   keysDown[e.keyCode]= true;
}, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches monster
var reset = function () {
  hero.x = canvas.width / 2;
  hero.y = canvas.heght / 2;

  //Throw the monster somewhere on the screen randomly
  monster.x = 32 + (Math.random() * (canvas.width - 64));
  monster.y = 32 + (Math.random() *(canvas.width -64))

};

// Update game objects

var update = function (modifier) {
  if (38 in keysDown) {// Player holding up
    hero.y -= hero.speed * modifier;
  }

  if (40 in keysDown) {// Player holding down
    hero.y += hero.speed * modifier;

  }

  if (37 in keysDown) { // Player holding left
    hero.x -= hero.speed * modifier;
  }
  if (39 in keysDown) {
    hero.x += hero.speed * modifier;
  }


// Are they touching?
if (
  hero.x <= (monster.x + 32)
  && monster.x <= (hero.x + 32)
  && hero.y <= (monster.y + 32)
  && monster.y <= (hero.y +32)
) {
  ++monstersCaught;
  reset ();
}
};

//Draw everything
var render = function () {

  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }
  if (monsterReady) {
    ctx.drawImage(monsterImage, monster.x, monster.y);

  }

// Score

ctx.fillStyle = "rgb(250, 250, 250)";
ctx.font = "24px Helvetica";
ctx.textAlign = "left";
ctx.textBaseline = "top";
ctx.fillText("Monsters caught: " + monstersCaught, 32, 32);
};

var main = function () {
  var now = Date.now();
  var delta = now - then;

  update(delta/1000);
  render();
  then = now;

// Request to do this again
    requestAnimationFrame(main);


};

//Cross-browser support for requestAnimation
//var w = window;
//requestAnimationFrame= w.requestAnimation || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
main ();
