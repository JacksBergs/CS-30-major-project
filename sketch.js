//Fishing Game
// Maybe make a new canvas
// https://p5js.org/reference/p5/textFont/
// Have to click in between a certain area
// Rectangle changes colour when you hover over it
// If hide cursor equals true, put cursor at the top right
// p5.touchgui
// mouseButton

// Make a screen
//Code is lagging for some unknown reason
// make a state machine with a state variable
// create a second screen(canvas) but for "hotbar"

let waterHeight;
const BAR_SQUARE_CHARGE = 5;

let barCharge = 5;

let gui;

let barPower = 0;
let squareShow = 0;

let castHold = false;

let cast;
let rodImageNormal;
let rodImageFishing;
let rodImageHooked;
let rodImageCaught;
let rodImageLost;

let gameState = "menu";
let fishingState = "neutral";

let bar = 0;
let inSweetSpot = false;

let bobberX;
let bobberY = 200;
let bobDX;
let bobDY;

let pmx;
let pmy;

function preload() {
  // When the rod is neutral
  rodImageNormal = loadImage("Rod.png");
}

function setup() {
  worldLevel = createCanvas(1000, 800);
  gui = createGui();
  startButton = createButton("Start the game", width/2 - 250, height/2 - 105, 400, 200);

  waterHeight = height/1.5;
}

function draw() {
  background(220);
  checkGameState();
  pmx = pmouseX + 46;
  pmy = pmouseY - 38;
  console.log(squareShow);
}

function checkGameState() {
  if (gameState === "menu") {
    drawGui();
  }
  if (gameState === "world") {
    worldOne();
    showRod();
    checkRodState();
  }
}

function checkRodState() {
  if (fishingState === "charging") {
    fishingBar();
  }
  if (fishingState === "casting") { 
    updateGravity();
    line(pmx, pmy, bobberX, bobberY);
  }
  if (fishingState === "fishing"){
    bobberY = waterHeight;
    line(pmx, pmy, bobberX, bobberY);
  }
}

function worldOne() {
  background(220);
  fill(75, 175, 250);
  rect(0, waterHeight, width, height);
  console.log(fishingState);
}

function mousePressed() {
  if (mouseX > width/2 - 250 && mouseX < width/2 + 150 && gameState === "menu"){
    gameState = "world";
  }
  if (mouseY >= 284 && mouseY <= 290 && gameState === "menu"){
    gameState = "world";
  }
  if (fishingState === "neutral"){
    squareShow = 0;
    barPower = 0;
    fishingState = "charging";
  }
}

function mouseReleased() {
  if (fishingState === "charging") {
    fishingState = "casting";
    bobberX = pmx;
    bobberY = pmy;
    bobDX = barPower / 5;
    bobDY = -5;
  }
}

function keyPressed() {
  if (key === "x") {
    fishingState = "neutral";
  }
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
  else{
    barPower = 0;
    squareShow = 0;
  }
}

function updateGravity() {
  if (mouseReleased) {
    //Do a ig gamestate === "world", and if not it can't do it, or it cant if it hovering over something
    bobberX += bobDX;
    bobberY += bobDY;
    if (bobberY < waterHeight) {
      bobDY += 0.1;
    }
    else {
      fishingState = "fishing";
    }
    if (bobDX > 0) {
      bobDX -= 0.1;
    }
    else if(bobberX > width){
      fishingState = "neutral";
    }
    else { 
      bobDX = 0;
    }
    if (bobDX === 0 && bobDY === waterHeight) {
      fishingState = "fishing";
    }
  }
}


// Maybe make a line that goes from one side to the other by every frame
function barSquareCharge() {
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
    barPower = 0;
  }
}

function fishingWorldOne() {
  if (fishingState === "fishing") {

  }
}

function showRod(){
  noCursor();
  if (pmy < height/ 1.6){
    imageMode(CENTER);
    image(rodImageNormal, pmx, pmy, 100, 100);
    fill("black");
    // make horizontal bar
    rect(pmx - 40, pmy + 40, 50, 10);
  }
  
  else {
    // Rests the rod on the water 
    image(rodImageNormal, pmx, pmy-(pmy - 500), 100, 100);
  }
}