//Fishing Game
// Maybe make a new canvas
// https://p5js.org/reference/p5/textFont/
// Have to click in between a certain area

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
  background(220);
  textAlign(CENTER);
  fill("black");
  text("This is the start of the game", width/2 - 50, height/2);
}

function mousePressed() {
  if (mouseX >= 0 && mouseX <= 10000){
    startClick = true;
  }
}



// function castingState() {
//   // Casting state will be able to look at a certain distance from left to right 
//   // translate() shifting what the origin is meaning I can shift where my character goes
// }

function showRod(){
  imageMode(CENTER);
  image(rodStateNormal, mouseX + 45, mouseY - 35, 100, 100);
}