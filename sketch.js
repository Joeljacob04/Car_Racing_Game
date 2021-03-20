var PLAY = 1;
var END = 0;
var gameState = PLAY;

var road, roadImage, Line1, Line2, Line3, zebraCrossing, zebraCrossingImage, invisibleLine1, invisibleLine2;
var car, carImage;
var coin1,coin2;
var house1,house2,house3,house4,house5,house6,plant1,plant2,plant3,plant4,plant5,plant6,pool,umbrella;
var car1,car2,car3,car4,bike1,bike2,bus1,bus2;
var coinGroup, LinesGroup, object1Group, object2Group, cars1Group, cars2Group;
var leftArrow, leftArrowImg, rightArrow, rightArrowImg;
var score=0;
var life = 3;
var points = 0;

var gameOver, restart, gameOverImg, restartImg, startOver, startOverImg;
var play, playImg;

function preload(){
  roadImage = loadImage("Road.png");
  Line1 = loadImage("Line1.jpg");
  Line2 = loadImage("Line2.jpg");
  Line3 = loadImage("Line3.jpg");
  zebraCrossingImage = loadImage("zebra-crossing.png");
  carImage = loadImage("Car.png");
  coinAnimation = loadAnimation("Coin1.png","Coin2.png","Coin3.png","Coin4.png","Coin5.png","Coin6.png")
  house1 = loadImage("house1.png");
  house2 = loadImage("house2.png");
  house3 = loadImage("house3.png");
  house4 = loadImage("house4.png");
  house5 = loadImage("house5.png");
  house6 = loadImage("house6.png");
  plant1 = loadImage("plant1.png");
  plant2 = loadImage("plant2.png");
  plant3 = loadImage("plant3.png");
  plant4 = loadImage("plant4.png");
  plant5 = loadImage("plant5.png");
  plant6 = loadImage("plant6.png");
  pool = loadImage("pool.png");
  umbrella = loadImage("umbrella.png");
  car1 = loadImage("car1.png");
  car2 = loadImage("car2.png");
  car3 = loadImage("car3.png");
  car4 = loadImage("car4.png");
  bike1 = loadImage("bike1.png");
  bike2 = loadImage("bike2.png");
  bus1 = loadImage("bus1.png");
  bus2 = loadImage("bus2.png");
  leftArrowImg = loadImage("LeftArrow.png");
  rightArrowImg = loadImage("RightArrow.png");
  gameOverImg = loadImage("GameOver.png");
  restartImg = loadImage("Reset.png");
  playImg = loadImage("Start.png");
  startOverImg = loadImage("StartOver.png");
}

function setup() {
  createCanvas(1000,600);
  
  road = createSprite(width/2,height/2,2,height);
  road.addImage("road",roadImage);
  road.y = height/2
  road.velocityY = (8+3*score/100);
  road.scale = 1.8;
  
  invisibleLine1 = createSprite(281,height/2,30,height);
  invisibleLine1.shapeColor = "white";
  invisibleLine1.visible = false;
  
  invisibleLine2 = createSprite(721,height/2,30,height);
  invisibleLine2.shapeColor = "white";
  invisibleLine2.visible = false;
  
  zebraCrossing = createSprite(500,100,50,50);
  zebraCrossing.addImage("Zebra_Crossing",zebraCrossingImage);
  zebraCrossing.velocityY = 8;
  zebraCrossing.scale = 0.9;
  
  car = createSprite(500,400,50,50);
  car.addImage("car", carImage);
  car.scale = 0.7;
  
  coinGroup = new Group();
  LinesGroup = new Group();
  object1Group = new Group();
  object2Group = new Group();
  cars1Group = new Group();
  cars2Group = new Group();

  score = 0;
  
  leftArrow = createSprite(810,520,50,50);
  leftArrow.addImage("Left", leftArrowImg);
  leftArrow.scale = 0.34;
  
  rightArrow = createSprite(925,520,50,50);
  rightArrow.addImage("right", rightArrowImg);
  rightArrow.scale = 0.34;
  
  //car.setCollider("rectangle",0,0,150,290);
  //car.debug = true
  
  gameOver = createSprite(500,200,50,50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(500,400,50,50);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.6;
  restart.scale = 0.6;

  gameOver.visible = false;
  restart.visible = false;
  
  startOver = createSprite(500,400,50,50);
  startOver.addImage(startOverImg);
  startOver.scale = 0.5;
  startOver.visible = false;
}

function draw() {
  background(220);
  background("lightgreen");
    
  if(gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);
    road.velocityY = (8+3*score/200);
    
    if(touches.leftArrow || mousePressedOver(leftArrow)) {
      car.x = car.x-8;
      touches = [];
    }
  
  if(touches.rightArrow || mousePressedOver(rightArrow)) {
      car.x = car.x+8;
    touches = [];
    }
  
  car.collide(invisibleLine1);
  car.collide(invisibleLine2);
    
    if (road.y > 700){
      road.y = road.width/2;
    }
    
    if(coinGroup.isTouching(car)){
      points+=1;
      coinGroup[0].destroy();
    }
    
    
   if(cars1Group.isTouching(car)){
       life-=1;
        gameState = END;
    } 
    
    if(cars2Group.isTouching(car)){
       life-=1;
        gameState = END;
    } 
    
    if(life===0){
      gameOver.visible = true;
      startOver.visible = true;
      restart.visible = false;
      life = 3;
    }
    
  spawnCoin();
  spawnLines();
  spawnObjects1();
  spawnObjects2();
  spawnCars1();
  spawnCars2();
  }
  
  else if (gameState === END ) {
    
    road.velocityY = 0;
    car.velocityX = 0;
    cars1Group.setVelocityYEach(0);
    cars2Group.setVelocityYEach(0);
    object1Group.setVelocityYEach(0);
    object2Group.setVelocityYEach(0);
    coinGroup.setVelocityYEach(0);
    LinesGroup.setVelocityYEach(0);
    
    cars1Group.setLifetimeEach(-1);
    cars2Group.setLifetimeEach(-1);
    object1Group.setLifetimeEach(-1);
    object2Group.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1);
    LinesGroup.setLifetimeEach(-1);
    
    restart.visible = true;
    
    if(touches.restart || mousePressedOver(restart)) {
      reset();
      touches = [];
    }
  
    if(touches.startOver || mousePressedOver(startOver)) {
      reset();
      car.x = 500;
      touches = [];
    }
  }
  drawSprites();
  
  textSize(40);
  fill("yellow")
  stroke("red");
  strokeWeight(5);
  textFont("forte");
  text("Score: "+ score,780,50);
  
  textSize(40);
  fill("lightblue")
  stroke("blue");
  strokeWeight(7);
  textFont("Cooper Black");
  text("Life: "+ life , 450,50);
  
  textSize(40);
  fill("white")
  stroke("black");
  strokeWeight(5);
  textFont("Old English Text MT");
  text("Points: "+ points , 780,100);
}

function spawnCoin() {
  if (frameCount % 35 === 0) {
    var coin = createSprite(1000,10,40,10);
    coin.x = Math.round(random(350,650));
    coin.addAnimation("coin",coinAnimation);
    coin.scale = 0.3;
    coin.velocityY = 8;
    
    coin.lifetime = 1000;
    
    coin.depth = gameOver.depth;
    gameOver.depth = gameOver.depth+1;
    
    coin.depth = restart.depth;
    restart.depth = restart.depth+1;
    
    coin.depth = startOver.depth;
    startOver.depth = startOver.depth+1;
    
    coin.depth = car.depth;
    car.depth = car.depth + 1;
    
    coinGroup.add(coin);
  }
}

function spawnLines() {
  if(frameCount % 35 === 0) {
    var Line = createSprite(500,-100,10,40);    
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: Line.addImage(Line1);
              break;
      case 2: Line.addImage(Line2);
              break;
      case 3: Line.addImage(Line3);
              break;
              default:break;
    }
        
    Line.velocityY = (8+3*score/200);        
    Line.scale = 1.2;
    Line.lifetime = 300;
    LinesGroup.add(Line);
    
    Line.depth = spawnCoin.depth;
    spawnCoin.depth = spawnCoin.depth + 1;
    
    Line.depth = gameOver.depth;
    gameOver.depth = gameOver.depth+1;
    
    Line.depth = restart.depth;
    restart.depth = restart.depth+1;
    
    Line.depth = startOver.depth;
    startOver.depth = startOver.depth+1;
    
    Line.depth = car.depth;
    car.depth = car.depth + 1;
  }
}

function spawnObjects1() {
  if(frameCount % 35 === 0) {
    var object1 = createSprite(120,-100,10,40);    
    var rand = Math.round(random(1,14));
    switch(rand) {
      case 1: object1.addImage(house1);
              break;
      case 2: object1.addImage(house2);
              break;
      case 3: object1.addImage(house3);
              break;
      case 4: object1.addImage(house4);
              break;
      case 5: object1.addImage(house5);
              break;
      case 6: object1.addImage(house6);
              break;
      case 7: object1.addImage(plant1);
              break;
      case 8: object1.addImage(plant2);
              break;
      case 9: object1.addImage(plant3);
              break;
      case 10: object1.addImage(plant4);
              break;
      case 11: object1.addImage(plant5);
              break;
      case 12: object1.addImage(plant6);
              break;
      case 13: object1.addImage(pool);
              break;
      case 14: object1.addImage(umbrella);
              break;
              default:break;
    }
        
    object1.velocityY = 8;         
    object1.scale = 0.5;
    object1.lifetime = 300;
    object1Group.add(object1);
  }
}

function spawnObjects2() {
  if(frameCount % 35 === 0) {
    var object2 = createSprite(880,-100,10,40);    
    var rand = Math.round(random(1,14));
    switch(rand) {
      case 1: object2.addImage(house1);
              break;
      case 2: object2.addImage(house2);
              break;
      case 3: object2.addImage(house3);
              break;
      case 4: object2.addImage(house4);
              break;
      case 5: object2.addImage(house5);
              break;
      case 6: object2.addImage(house6);
              break;
      case 7: object2.addImage(plant1);
              break;
      case 8: object2.addImage(plant2);
              break;
      case 9: object2.addImage(plant3);
              break;
      case 10: object2.addImage(plant4);
              break;
      case 11: object2.addImage(plant5);
              break;
      case 12: object2.addImage(plant6);
              break;
      case 13: object2.addImage(pool);
              break;
      case 14: object2.addImage(umbrella);
              break;
              default:break;
    }
        
    object2.velocityY = 8;         
    object2.scale = 0.5;
    object2.lifetime = 300;
    object2Group.add(object2);
    
    object2.depth = rightArrow.depth;
    rightArrow.depth = rightArrow.depth + 1;
    
    object2.depth = leftArrow.depth;
    leftArrow.depth = leftArrow.depth + 1;
  }
}

function spawnCars1() {
  if(frameCount % 250 === 0) {
    var cars1 = createSprite(380,-100,10,40);    
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: cars1.addImage(car1);
              break;
      case 2: cars1.addImage(car2);
              break;
      case 3: cars1.addImage(bike1);
              break;
      case 4: cars1.addImage(bus1);
              break;
              default:break;
    }
        
    cars1.velocityY = (2+3*score/600);         
    cars1.scale = 0.3;
    cars1.lifetime = 1000;
    cars1Group.add(cars1);
    
    cars1.depth = gameOver.depth;
    gameOver.depth = gameOver.depth+1;
    
    cars1.depth = restart.depth;
    restart.depth = restart.depth+1;
    
    cars1.depth = startOver.depth;
    startOver.depth = startOver.depth+1;
  }
}

function spawnCars2() {
  if(frameCount % 300 === 0) {
    var cars2 = createSprite(620,-1000,10,40);    
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: cars2.addImage(car3);
              break;
      case 2: cars2.addImage(car4);
              break;
      case 3: cars2.addImage(bike2);
              break;
      case 4: cars2.addImage(bus2);
              break;
              default:break;
    }
        
    cars2.velocityY = (5+3*score/600);         
    cars2.scale = 0.3;
    cars2.lifetime = 1000;
    cars2Group.add(cars2);
    
    cars2.depth = gameOver.depth;
    gameOver.depth = gameOver.depth+1;
    
    cars2.depth = restart.depth;
    restart.depth = restart.depth+1;
    
    cars2.depth = startOver.depth;
    startOver.depth = startOver.depth+1;
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  startOver.visible = false;
  
  cars1Group.destroyEach();
  cars2Group.destroyEach();
  object1Group.destroyEach();
  object2Group.destroyEach();
  coinGroup.destroyEach();
  LinesGroup.destroyEach();
  
  score = 0;
  points = 0;
  
}
