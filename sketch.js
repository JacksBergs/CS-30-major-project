//Fishing Game

let cast;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  casting();
}

function casting(){
  line(width/2, height/2, mouseX, mouseY);
}