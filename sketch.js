//Fishing Game



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

let theHandArray = [];

let theHand = {
  x: 200,
  y: 300,
  dy: 3,
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
let timer = 0; // going to do it in millis
let tickRate = 50;
let barCounter = 0;

let fishingLineCount;
let frameBufferTime;
let startButton;
let ofishuaryBook;

let hitCounter = 0;

theHandArray.push(theHand);

function preload() {
  // When the rod is neutral
  rodImageNormal = loadImage("Rod.png");
  handNormal = loadImage("Hand.png");
  handHitting = loadImage("HitHand.png");
  bobFishImage = loadImage("Bob.png");
  jeremyImage = loadImage("Jeremy.png");
  bobHatmanImage = loadImage("BobHatman.png");
  BroligiImage = loadImage("Broligi.jpg");
}

function createFish() {
  let bobFishy = new Fish("Bob", bobFishImage, "goober", "Common", 0, 0);
  easyFish.push(bobFishy);
  let jeremeyFish = new Fish("Jeremy", jeremyImage, "goober", "");
  easyFish.push(jeremeyFish);
  let bobHatmanFish = new Fish("BobHatman", bobHatmanImage, "goober", "", 0, 250);
  mediumFish.push(bobHatmanFish);
  let legendary = new Fish("Broligi", BroligiImage, "goober", "", 250, 0);
  hardFish.push(legendary);
  for (let fish of easyFish) {
    fishArray.push[fish];
  }
  for (let fish of mediumFish) {
    fishArray.push[fish];
  }
  for (let fish of hardFish) {
    fishArray.push[fish];
  }
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
    click = true;
    if (click === true){
      hitHand();
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
      timer = frameCount;
      text(timer, 800, 100);
    }
  }
  if (gameState === "ofishuary") {
    cursor();
    background(220);
    let x = slider.value() * -50;
    translate(x, 50);
    fill("brown");
    rect(0, 200, 6000, 500);
    for (let fish of easyFish) {
      fish.displayinBook();
    } 
    for (let fish of mediumFish) {
      fish.displayinBook();
    } 
    for (let fish of hardFish) {
      fish.displayinBook();
    } 
  }
}

function pickRandomFish() {
  let fishPicker = round(random(0, 100));
  if (fishPicker <= 5) {
    return hardFish[round(random(0, hardFish.length - 1))];
  }
  else if(fishPicker <= 40) {
    return mediumFish[round(random(0, mediumFish.length - 1))];
  }
  else {
    return easyFish[round(random(0, easyFish.length - 1))];
  }

  // return fishArray[round(random(0, fishArray.length - 1))];
  
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
    gameState = "world";
    fishingState = "neutral";
    fishVariable.fishFound = true;
    fishVariable = "none";
  }
}

function worldOne() {
  background(220);
  fill(75, 175, 250);
  rect(0, waterHeight, width, height);
}

function catchingFish() {
  background(220);
}

function mousePressed() {
  if (mouseX >= 1100 && mouseX <= 1200 && mouseY >= 0 && mouseY <= 25 && gameState === "menu"){
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
  if (mouseIsPressed) {
    hitCounter++;
    image(handHitting, pmx, pmy, 100, 100);
  }
  else {
    image(handNormal, pmx, pmy, 100, 100);
  }
}

function fishPunch() {
  // for (let someHand of theHandArray) {
  //   someHand.y += someHand.dy;
  //   if (someHand.y > height || someHand.y < 0){
  //     someHand.dy *= -1;
  //   }
  //   image(handHitting, 100, someHand.y);
  // }
}

function autoMoveEnemy() {
  // This is the losing screen
  // if the tickRate = 0, it goes as fast as it orignially does
  if (playerSquare.x === enemySquare.x && playerSquare.y === enemySquare.y + 1){
    gridOne[enemySquare.y][enemySquare.x] = OPEN_TILE;
    enemySquare.y = 0;
    enemySquare.x = round(random(0, 9));
    barCounter++;
    if (barCounter >= 5 && hitCounter >= 50) {
      fishingState = "caught";
      checkRodState();
      barCounter = 0;
      hitCounter = 0;
    }
  }
  // else if(enemySquare.y >= 4) {
  //   fishingState = "lost";
  // }
  if (fishingState !== "caught") {
    if (frameCount % tickRate === 0){
      if (enemySquare.y >= 4){
        // gridOne[enemySquare.y][enemySquare.x] = OPEN_TILE;
        // enemySquare.y = 0;
        // enemySquare.x = round(random(0, 9));
        // enemyMove(enemySquare.x, enemySquare.y);
        fishingState = "lost";
        checkRodState();
        gridOne[enemySquare.y][enemySquare.x] = OPEN_TILE;
        enemySquare.y = 0;
        enemySquare.x = round(random(0, 9));
      }
      else if (enemySquare.y <= 3){
        enemyMove(enemySquare.x, enemySquare.y + 1);
      }
    }
    if (tickRate === 0) {
      if (enemySquare.y >= 4){
        // gridOne[enemySquare.y][enemySquare.x] = OPEN_TILE;
        // enemySquare.y = 0;
        // enemySquare.x = round(random(0, 9));
        // enemyMove(enemySquare.x, enemySquare.y);
        fishingState = "lost";
        checkRodState();
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