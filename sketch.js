var PLAY = 1;
var END  = 0;

var gameState = PLAY;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup


function preload() {

  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 500);
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);

 obstacleGroup=new Group(); 
FoodGroup=new Group();
}


function draw() {
  background(255);
  
  
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.x);

  monkey.collide(ground);
  if (keyDown("space")&&monkey.y>200) {
    monkey.velocityY = -12;
  }
  console.log(monkey.y);
  monkey.velocityY = monkey.velocityY + 0.8;

  var survivalTime = 0;
stroke("black");
textSize(20);
fill("black")
survivalTime=Math.ceil(frameCount/frameRate());
text("Survival Time: "+survivalTime,100,50);

  if(monkey.isTouching(obstacleGroup)){
        
    ground.velocityX = 0;
    monkey.velocityX = 0;
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    monkey.velocityY= 0;

    
  }
  Food();
spawnObstacles();
drawSprites();

}
function spawnObstacles(){
  if(frameCount%300===0){
     obstacle = createSprite(670,330,10,40);
    obstacle.addImage("rocks",obstacleImage)
     obstacleGroup.add(obstacle);
    obstacle.velocityX = -4;
    obstacle.scale=0.125;
obstacleGroup.lifetime = 120;
  }
}
function Food(){
   if(frameCount%80===0){
     banana= createSprite(670,325,5,5);
     FoodGroup.add(banana);
     banana.y = random(120,200);
     banana.addImage("fruit",bananaImage)
     banana.velocityX = -4;
     banana.scale = 0.125;
     FoodGroup.lifetime = 80;
   monkey.depth = banana.depth
     monkey.depth =monkey.depth+1;
   }
}
