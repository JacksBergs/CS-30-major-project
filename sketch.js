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
let squareShow = 0;

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
    barSquareCharge();
    // Framecount makes it charge the bar past the frame amount 
    if (frameCount % 1 === 0) {
      barPower++;
    }
  }
  else {
    barPower = 0;
  }
}

function barSquareCharge() {
  if (barPower > squareShow && squareShow < 30) {
    fill("red");
    square(80, 80, 40);
    squareShow++;
  }
  else if (barPower > squareShow & squareShow < 60){
    fill("orange");
    square(120, 120, 40);
    squareShow++;
  }
  else if (barPower > squareShow & squareShow < 90){
    fill("yellow");
    square(160, 160, 40);
    squareShow++;
  }
  else if (barPower > squareShow & squareShow < 120){
    fill("green");
    square(200, 200, 40);
    squareShow++;
  }
  else if (barPower > squareShow & squareShow < 140){
    fill("black");
    square(400, 400, 40);
    squareShow++;
  }
  else if (barPower > squareShow & squareShow < 141){
    squareShow = 0;
  }
  console.log(squareShow);
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
    fill("black");
    // make horizontal bar
    rect(pmx - 80, pmy + 20, 20, 30);
  }
  
  else { 
    // Rests the rod on the water 
    image(rodStateNormal, pmx, pmy-(pmy - 480), 100, 100);
    rect(pmx - 80, pmy + 20, 20, 30);
  }
}