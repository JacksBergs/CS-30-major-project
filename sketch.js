//Fishing Game
// Maybe make a new canvas
// https://p5js.org/reference/p5/textFont/
// Have to click in between a certain area
// Rectangle changes colour when you hover over it
// If hide cursor equals true, put cursor at the top right
// p5.touchgui

let gui;

let startClick = false;

let cast;
let rodStateNormal;
let rodStateFishing;
let rodStateHooked;
let rodStateCaught;
let rodStateLost;
let rectX;
let rectY;
let rectW;
let rectH;

function preload() {
  // When the rod is neutral
  rodStateNormal = loadImage("Rod.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gui = createGui();
  b = createButton("Start the game", width/2 - 250, height/2 - 105, 400, 200);
}

function draw() {
  background(220);
  drawGui();
  if (startClick === true) {
    worldOne();
    showRod();
  }
}

function worldOne() {
  background(220);
  fill("blue");
  rect(0, height/1.5, width, height);
}

function mousePressed() {
  if (mouseX > 200 && mouseX < 6000){
    startClick = true;
  }
  if (mouseY >= 284 && mouseY <= 290){
    startClick = true;
  }
  console.log(mouseX);
  console.log(mouseY);
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