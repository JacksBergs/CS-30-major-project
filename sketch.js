//Fishing Game
// Maybe make a new canvas
// https://p5js.org/reference/p5/textFont/
// Have to click in between a certain area
// Rectangle changes colour when you hover over it
// If hide cursor equals true, put cursor at the top right
// p5.touchgui
// mouseButton

const BAR_CHARGE = 5;

let gui;

let barPower = 0;

let startClick = false;
let castHold = false;

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

let bar = 0;

function preload() {
  // When the rod is neutral
  rodStateNormal = loadImage("Rod.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gui = createGui();
  startButton = createButton("Start the game", width/2 - 250, height/2 - 105, 400, 200);
}

function draw() {
  background(220);
  drawGui();
  if (startClick === true) {
    worldOne();
    showRod();
    fishingBar();
    console.log(barPower);
  }
}

function worldOne() {
  background(220);
  fill(75, 175, 250);
  rect(0, height/1.5, width, height);
}

function mousePressed() {
  if (mouseX > width/2 - 250 && mouseX < width/2 + 150){
    startClick = true;
  }
  if (mouseY >= 284 && mouseY <= 290){
    startClick = true;
  }
  console.log(mouseX);
  console.log(mouseY);
}

function mouseReleased() {

}

function fishingBar() {
  // mouseisPressed keeps going unless if it equals false
  if (mouseIsPressed) {
    // Framecount makes it charge the bar past the frame amount 
    if (frameCount % 3 === 0) {
      barPower++;
    }
  }
  else {
    barPower = 0;
  }
}


// function castingState() {
//   // Casting state will be able to look at a certain distance from left to right 
//   // translate() shifting what the origin is meaning I can shift where my character goes
// }

function showRod(){
  noCursor();
  let pmx = pmouseX + 46;
  let pmy = pmouseY - 38;
  if (pmy < 480){
    imageMode(CENTER);
    image(rodStateNormal, pmx, pmy, 100, 100);
  }
  
  else if (pmy > 480){
  }

}