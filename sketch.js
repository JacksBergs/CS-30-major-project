//Fishing Game

let cast;
let rodStateNormal;
let rodStateFishing;
let rodStateHooked;
let rodStateCaught;
let rodStateLost;

function preload() {
  rodStateNormal = loadImage("Rod.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  casting();
}

function castingState() {
  // Casting state will be able to look at a certain distance from left to right 
  // translate() shifting what the origin is
}

function casting(){
  imageMode(CENTER);
  image(rodStateOne, mouseX, mouseY, 100, 100);
}