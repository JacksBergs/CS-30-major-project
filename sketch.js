//Fishing Game
// Maybe make a new canvas
// https://p5js.org/reference/p5/textFont/
// Have to click in between a certain area
// Rectangle changes colour when you hover over it
// If hide cursor equals true, put cursor at the top right
// p5.touchgui
// mouseButton
// make a state machine with a state variable
// create a second screen(canvas) but for "hotbar"
// Make a pElement, create a label and such anywhere on the screen
// Once you catch the fish you add it to a list, then that list will be used for the book and if its blurred
// Make a class to show fish in ofishuary
// Create a class of fish, basically the whole class will include a characters rarity, its name, its image type, whether or not they are found
// a constructor defines all the features of my fish, race religion other fish stuff
// If you do somehting like Bob.display it do the parameter that you have for display
 //newFish = new Fish("bob", "Bob.png", "silly guy", hardFish)
 //console.log(`This is ${this.name} ${this.imageFile} ${this.description} ${this.rarity}`)


class Fish {
  constructor(name, imageFile, description, rarity, imageX, imageY) {
    this.name = name;
    this.imageFile = imageFile;
    this.description = description;
    this.rarity = rarity;
    this.imageX = imageX;
    this.imageY = imageY + 200;
    this.imageLength = 250;
    this.imageWidth = 250;
    this.fishFound = false;
  }

  displayinBook() {
    if (this.fishFound) {
      imageMode(CORNER);
      image(this.imageFile, this.imageX, this.imageY, this.imageWidth, this.imageLength);
    }
    // else {
      
    // }
  }

  displayInCatching() {
    image(this.imageFile, this.imageWidth, this.imageLength);
  }

}

// let bobFish = new Fish("Bob", "png", "He is weird", "Common");
// fishFound = true;
// bobFish.displayinBook();

let gridOne =[[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const GRID_SIZE = 10;
const OPEN_TILE = 0;
const PLAYER_TILE = 2;
const ENEMY_TILE = 3;

let playerSquare = {
  x: 5,
  y: 4,
};

let enemySquare = {
  x: 0,
  y: 0,
};

let cellSize;

let waterHeight;
const BAR_SQUARE_CHARGE = 5;

let barCharge = 5;

let barPower = 0;
let squareShow = 0;

let castHold = false;

let cast;
let rodImageNormal;
let rodImageFishing;
let rodImageHooked;
let rodImageCaught;
let rodImageLost;

// These are for the hands
let hand;
let handHit;
let hitW;
let hitH;
let hitDY;

// randomizing the fish
let easyFish = [];
let mediumFish = [];
let hardFish = [];
let fishArray = [];
let fishVariable = "none";
let pickNewFish = "none";


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
let xTranslate;
let yTranslate;
let slider;

let theTest;

let click = false;
let timer = 500; // going to do it in millis
let tickRate = 50;
let barCounter = 0;

let fishingLineCount;
let frameBufferTime;
let startButton;
let ofishuaryBook;

function preload() {
  // When the rod is neutral
  rodImageNormal = loadImage("Rod.png");
  handNormal = loadImage("Hand.png");
  handHitting = loadImage("HitHand.png");
  easyFish = loadImage("Bob.png");
  // easyFish = loadImage("Jeremy.png");
  mediumFish = loadImage("BobHatman.png");
  hardFish = loadImage("Broligi.jpg");
}

function createFish() {
  let bobFishy = new Fish("Bob", easyFish, "goober", "", 0, 0);
  fishArray.push(bobFishy);
  // let jeremeyFish = new Fish("Jeremy", "Jeremy.png", "goober", "");
  // fishArray.push(jeremeyFish);
  let bobHatmanFish = new Fish("BobHatman", mediumFish, "goober", "", 0, 250);
  fishArray.push(bobHatmanFish);
  let legendary = new Fish("Broligi", hardFish, "goober", "", 250, 0);
  fishArray.push(legendary);
}

function setup() { 
  createFish();
  worldLevel = createCanvas(1000, 800);

  if (windowWidth < windowHeight){
    createCanvas(windowWidth, windowWidth);
  }
  else{
    createCanvas(windowHeight, windowHeight);
  }

  startButton = createButton("Start the game");
  startButton.position(1100, 0);

  ofishuaryBook = createButton("Check your fish here");
  ofishuaryBook.position(1100, 500);

  slider = createSlider();
  // startButton.position(width/2 - 250, height/2 - 105);
  //width/2 - 250, height/2 - 105, 400, 200)

  waterHeight = height/1.5;
  // theTest = createP("this is a test");
  // theTest.parent("thing");
  cellSize = height/GRID_SIZE;
}

function draw() {
  slider.position(width + 100, 600);
  background(220);
  checkGameState();
  pmx = pmouseX + 46;
  pmy = pmouseY - 38;
}

function checkGameState() {
  if (gameState === "menu") {
    click = false;
  }

  if (gameState === "world") {
    worldOne();
    showRod();
    fishVariable = "none";
    checkRodState();
    click = false;
  }
  if (gameState === "gameCatching") {
    if (fishVariable === "none") {
      // fishVariable = hardFish[0];
      fishVariable = pickRandomFish();
    }
    else {
      fishVariable.displayInCatching();
    }
    // image(hardFish[0], 100, 100, 500, 500); 
    click = true;
    if (click === true){
      image(handNormal, 100, 100);
      // Spawns in the player
      gridOne[playerSquare.y][playerSquare.x] = PLAYER_TILE;
      gridOne[enemySquare.y][enemySquare.x] = ENEMY_TILE;
      // Displays the grid
      gridChangeOne = true;
      displayGridOne();
      // moves the enemy
      autoMoveEnemy();
      // Shows the frames counting up text
      fill("black");
      textSize(30);
      text(frameCount, 800, 100);
    }
  }
  if (gameState === "ofishuary") {
    cursor();
    background(220);
    let x = slider.value() * -50;
    translate(x, 50);
    fill("brown");
    rect(0, 200, 6000, 500);
    for (let fishy of fishArray) {
      fishy.displayinBook();
    } 
  }
}

function pickRandomFish() {
  // let fishPicker = round(random(0, 100));
  // if (fishPicker <= 5) {
    // return hardFish[round(random(0, hardFish.length - 1))];
  // }
  // else if(fishPicker <= 40) {
    // return mediumFish[round(random(0, mediumFish.length - 1))];
  // }
  // else {
    // return easyFish[round(random(0, easyFish.length - 1))];
  // }

  return fishArray[round(random(0, fishArray.length - 1))];
  
}

// array inside of an array???

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
    if (!fishingLineCount) {
      fishingLineCount = frameCount;
      frameBufferTime = (random(100, 300));
    }
    if (fishingLineCount + frameBufferTime <= frameCount) {
      gameState = "gameCatching";
      fishingLineCount = 0;
    }
  }
  if (fishingState === "caught"){
    gameState = "world";
    fishingState = "neutral";
    fishVariable.fishFound = true;
    fishVariable = "none";
  }
  if (fishingState === "lost") {

  }
}

function easyCatch() {
  
}

function mediumCatch() {

}

function hardCatch() {

}

function worldOne() {
  background(220);
  fill(75, 175, 250);
  rect(0, waterHeight, width, height);
}

function fishSeen() {

}

function catchingFish() {
  background(220);
}

function mousePressed() {
  if (mouseX >= 1100 && mouseX <= 1200 && mouseY >= 0 && mouseY <= 25 && gameState === "menu"){
    // gameState = "world";
    gameState = "world";
  }
  if (fishingState === "neutral"){
    squareShow = 0;
    barPower = 0;
    fishingState = "charging";
  }
  if (gameState === "world") {
    if (mouseX >= 1100 && mouseX <= 1200 && mouseY >= 500 && mouseY <= 525){
      gameState = "ofishuary";
    }
  }
}

function doubleClicked() {
  if (mouseX >= 1100 && mouseX <= 1200 && mouseY >= 500 && mouseY <= 525){
    gameState = "world";
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
  if (click === true){
    // Moves right
    if (key === "a"){
      movePlayer(playerSquare.x - 1, playerSquare.y);
    }
    // Moves left
    if (key === "d"){
      movePlayer(playerSquare.x + 1, playerSquare.y);
    }
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

function hitHand() {
  // hitW = 300;
  // hitH = 200;
  // hitDY = 1; 
  // image(handHitting, hitW, hitH);
  // someHit -= hitDY;
  // if (hitH >= 100) {
  //   hitDY *= 1;
  // }
  // else if(hitH <= 200){
  //   hitDY *= -1;
  // }
}

function autoMoveEnemy() {
  // This is the losing screen
  // if the tickRate = 0, it goes as fast as it orignially does
  if (playerSquare.x === enemySquare.x && playerSquare.y === enemySquare.y + 1){
    hitHand();
    gridOne[enemySquare.y][enemySquare.x] = OPEN_TILE;
    enemySquare.y = 0;
    enemySquare.x = round(random(0, 9));
    barCounter++;
    if (barCounter === 5) {
      fishingState = "caught";
      checkRodState();
      barCounter = 0;
    }
  }
  if (fishingState !== "caught") {
    if (frameCount % tickRate === 0){
      if (enemySquare.y >= 4){
        tickRate -= 5;
        gridOne[enemySquare.y][enemySquare.x] = OPEN_TILE;
        enemySquare.y = 0;
        enemySquare.x = round(random(0, 9));
        enemyMove(enemySquare.x, enemySquare.y);
      }
      else if (enemySquare.y <= 3){
        enemyMove(enemySquare.x, enemySquare.y + 1);
      }
    }
    if (tickRate === 0) {
      if (enemySquare.y >= 4){
        gridOne[enemySquare.y][enemySquare.x] = OPEN_TILE;
        enemySquare.y = 0;
        enemySquare.x = round(random(0, 9));
        enemyMove(enemySquare.x, enemySquare.y);
      }
      else if (enemySquare.y <= 3){
        enemyMove(enemySquare.x, enemySquare.y + 1);
      }
    }
  }
}

function enemyMove(x, y){
  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE && gridOne[y][x] === OPEN_TILE){
    gridOne[enemySquare.y][enemySquare.x] = OPEN_TILE;

    // keep track of enemy location
    enemySquare.x = x;
    enemySquare.y = y;

    // put enemy in the grid
    gridOne[enemySquare.y][enemySquare.x] = ENEMY_TILE;
    gridOne[playerSquare.y][playerSquare.x] = PLAYER_TILE;
  }
}

function displayGridOne(){
  if (gridChangeOne === true){
    //Objects/Players
    for (let y = 0; y < GRID_SIZE; y++){
      for (let x = 0; x < GRID_SIZE; x++){
        if(gridOne[y][x] === OPEN_TILE){
          fill("white");
          square(x * cellSize, y * cellSize + height/2, cellSize);
        }
        else if(gridOne[y][x] === PLAYER_TILE){
          fill("red");
          square(x * cellSize, y * cellSize + height/2, cellSize);
        }
        else if(gridOne[y][x] === ENEMY_TILE){
          fill("blue");
          square(x * cellSize, y * cellSize + height/2, cellSize);
        }
        else if(grid[y][x] === HIT_TILE){
          fill("yellow");
          square(x * cellSize, y * cellSize + height/2, cellSize);
        }
      }
    }
  }
}

function movePlayer(x, y){
  if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE && gridOne[y][x] === OPEN_TILE){
    //when moving reset to an open spot
    gridOne[playerSquare.y][playerSquare.x] = OPEN_TILE;

    // keep track of player location
    playerSquare.x = x;
    playerSquare.y = y;

    // put player in the grid
    gridOne[playerSquare.y][playerSquare.x] = PLAYER_TILE;
  }
}