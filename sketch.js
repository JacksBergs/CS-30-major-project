//Fishing Game
// Maybe make a new canvas
// https://p5js.org/reference/p5/textFont/
// Have to click in between a certain area
// Rectangle changes colour when you hover over it
// If hide cursor equals true, put cursor at the top right
// p5.touchgui
// mouseButton

//Code is lagging for some unknown reason


const BAR_SQUARE_CHARGE = 5;

let barCharge = 5;

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
let inSweetSpot = false;

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
}

function mouseReleased() {

}

function fishingBar() {
  let pmx = pmouseX + 46;
  let pmy = pmouseY - 38;
  // mouseisPressed keeps going unless if it equals false
  if (mouseIsPressed) {
    barSquareCharge();
    // Framecount makes it charge the bar past the frame amount 
    if (frameCount % 1 === 0) {
      barPower++;
    }
  }
  else if (mouseReleased){
    // want to throw the line in
    if (squareShow < 30){
      line(pmx, pmy, 400, 500);
    }
    else{
      barPower = 0;
      squareShow = 0;
    }
  }
}


// Maybe make a line that goes from one side to the other by every frame
function barSquareCharge() {
  let powerColour;
  let pmx = pmouseX + 46;
  let pmy = pmouseY - 38;
  if (barPower > squareShow && squareShow < 30) {
    inSweetSpot = false;
    powerColour = fill("red");
    square(pmx - 40, pmy + 40, 10);
    squareShow++;
  }
  else if (barPower > squareShow && squareShow < 60){
    inSweetSpot = false;
    powerColour = fill("orange");
    square(pmx - 30, pmy + 40, 10);
    squareShow++;
  }
  else if (barPower > squareShow && squareShow < 90){
    inSweetSpot = false;
    powerColour = fill("yellow");
    square(pmx - 20, pmy + 40, 10);
    squareShow++;
  }
  else if (barPower > squareShow && squareShow < 120){
    inSweetSpot = false;
    powerColour = fill("green");
    square(pmx - 10, pmy + 40, 10);
    squareShow++;
  }
  else if (barPower > squareShow && squareShow < 140){
    // inSweetSpot === true we will make a noise, and you will get a perfect cast
    inSweetSpot = true;
    powerColour = fill("blue");
    square(pmx, pmy + 40, 10);
    squareShow++;
  }
  else{
    inSweetSpot = false;
    squareShow = 0;
  }
}

function shortThrow() {
  if (mouseReleased){

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
  if (pmy < height/1.6){
    imageMode(CENTER);
    image(rodStateNormal, pmx, pmy, 100, 100);
    fill("black");
    // make horizontal bar
    rect(pmx - 40, pmy + 40, 50, 10);
  }
  
  else { 
    // Rests the rod on the water 
    image(rodStateNormal, pmx, pmy-(pmy - 480), 100, 100);
  }
}