var backgroundImg,background;
var bird;
var ground;
var FoodGroup, chilliImage;
var cloudGroup, cloud_img;

var gameOver;
var score=0;


function preload(){
  backgroundImg=loadImage("background.png");
  bird=loadImage("bird.png")
  

  chilliImage = loadImage("chilli.png");
  cloud_img = loadImage("cloud.png"); 
  
}

function setup() {
  createCanvas(1000,800);
  
  background=createSprite(0,0,1000,800);
  background.addImage(backgroundImg);
  background.scale=1.5;
  background.x=background.width/2;
  background.velocityX=-4;
  
  bird = createSprite(250,250,10,10);
  bird.addImage(bird);
  bird.scale = 0.1;
  
  
  FoodGroup = new Group();
  cloudGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(backgroundImg);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(background.x<100){
    background.x=background.width/2;
  }
  
    if(FoodGroup.isTouching(bird)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: bird.scale=0.12;
                break;
        case 20: bird.scale=0.14;
                break;
        case 30: bird.scale=0.16;
                break;
        case 40: bird.scale=0.18;
                break;
        default: break;
    }
  
    if(keyDown("space") ) {
      bird.velocityY = -12;
    }
    bird.velocityY = bird.velocityY + 0.8;
  
    bird.collide(ground);
    spawnFood();
    spawncloud();
 
    if(cloudGroup.isTouching(bird)){ 
        bird.scale=0.08;
     // score=score-2;
    }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var chilli = createSprite(475,250,10,10);
    chilli.y = random(120,200);    
    chilli.addImage(chilliImage);
    chilli.scale = 0.05;
   chilli.velocityX = -5;
     //assign lifetime to the variable
    chilli.lifetime = 300;
    bird.depth = chilli.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(chilli);
  }
}

function spawncloud() {
  if(frameCount % 300 === 0) {
    var cloud = createSprite(800,350,10,40);
    cloud.velocityX = -6;
    cloud.addImage(cloud_img);
    
    //assign scale and lifetime to the obstacle     
    cloud.scale = 0.2;
    cloud.lifetime = 300;
    
    //add each obstacle to the group
    cloudGroup.add(cloud);
  }
}
