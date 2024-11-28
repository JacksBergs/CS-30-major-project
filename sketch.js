//Fishing Game
// Maybe make a new canvas
// https://p5js.org/reference/p5/textFont/
// Have to click in between a certain area
// Rectangle changes colour when you hover over it
// If hide cursor equals true, put cursor at the top right

let startClick = false;

let cast;
let rodStateNormal;
let rodStateFishing;
let rodStateHooked;
let rodStateCaught;
let rodStateLost;

function preload() {
  // When the rod is neutral
  rodStateNormal = loadImage("Rod.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  beginningScreen();
  if (startClick === true) {
    background(220);
    showRod();
  }
}

function beginningScreen() {
  let rectX = width/2 - 250;
  let rectY = height/2 - 100;
  background(220);
  textAlign(CENTER);
  fill("red");
  rect(rectX, rectY, 400, 200);
  fill("black");
  text("This is the start of the game", width/2 - 50, height/2);
}

function mousePressed() {
  if (mouseX >= rectX && mouseY >= rectY){
    startClick = true;
  }
}

function mouseDragged(){

}


// function castingState() {
//   // Casting state will be able to look at a certain distance from left to right 
//   // translate() shifting what the origin is meaning I can shift where my character goes
// }

function showRod(){
  noCursor();
  let pmx = pmouseX + 46;
  let pmy = pmouseY - 38;
  imageMode(CENTER);
  image(rodStateNormal, pmx, pmy, 100, 100);
}