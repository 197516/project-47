var PLAY = 1;
var END = 0;
var gameState = PLAY;

var man,man1;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;


function preload(){
  man1 = loadImage("man-removebg-preview.png")
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("fire-removebg-preview.png");
  obstacle2 = loadImage("tree-removebg-preview.png");
  obstacle3 = loadImage("dog-removebg-preview.png");
  obstacle4 = loadImage("hurdle-removebg-preview.png");
 
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600,400);
 
  man = createSprite(50,360,20,50);
  man.addImage("man",man1);
  man.scale = 0.3;
  
  ground = createSprite(200,360,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  
  
  invisibleGround = createSprite(200,380,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    //change the trex animation
    
    
    if(keyDown("space") && man.y >= 190) {
      man.velocityY = -12;
    }
  
    man.velocityY = man.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    man.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(man)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    man.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = man.depth;
    man.depth = man.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  score = 0;
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,340,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.21;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

