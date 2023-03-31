var space;
var rocket,beam;
var invisible1,invisible2,invisilble3;
var stars;
var astreoid;
var gameState="end";
var gameState="play";
var game;
var score;
var beamG,astreoidG,starsG;
var rocketImg;


function preload(){
spaceImg=loadImage("space-with-stars-background-galaxy-and-vector-11544983 (1)-1.jpg");
  
rocketImg=loadImage("flying.png");
  
beamImg=loadImage("preview (1).png");
  
asImd=loadImage("11.png");
  
M=loadSound("mixkit-meteor-whoosh-3024.mp3");
  
over=loadImage("glitch-game-background_23-2148099184-removebg-preview-1.png");
  
sImg=loadImage("Stars.png");


}

function setup() {
space=createSprite(400,400);
space.addImage(spaceImg);
space.velocityY=3;

rocket=createSprite(200,350,10,20);
rocket.addImage(rocketImg);
rocket.scale=0.3;
rocket.setCollider("rectangle",0,0,200,370)
//rocket.debug=true;

game=createSprite(200,200);
game.visible=false;

  
  
invisible1=createSprite(2,2,10,800);
invisible1.visible=false;
//invisible1.debug=true;

invisible2=createSprite(399,2,10,800);
invisible2.visible=false;
  
astreoidG = new Group();
beamG = new Group();
starsG = new Group();

  score=0;
}

function draw() {
 createCanvas(400,400);
background("red");
  
  
if(space.y>400){
  space.y=height/2;
}
 if(gameState==="play"){
if(keyDown("space")){
Sbeam();  
}
  
if(keyDown("left")){
  rocket.x=rocket.x-4;
}
  
if (keyDown("right")){
  rocket.x=rocket.x+4;
}

if(starsG.isTouching(rocket)){
  score=score+2;
  starsG.destroyEach();
}


if(astreoidG.isTouching(beamG)){
  beamG.destroyEach();
  astreoidG.destroyEach();
  M.play();
}
   Sa();
StarsS();
 }  
if(astreoidG.isTouching(rocket)){
  gameState="end";
 // text("PRESS R TO RESET",100,300);
  //rocket.destroy();
  astreoidG.destroyEach();
  beamG.destroyEach();
  game.addImage(over);
  game.visible=true;
  space.velocityY=0;
  score=0;
  astreoidG.velocityY=0;
  starsG.destroyEach();
  starsG.velocityY=0;  
}  

 
 if(keyDown("r")){
   RESET();
 }

createEdgeSprites();
rocket.bounceOff(invisible1);
rocket.bounceOff(invisible2);
  


  drawSprites();
textSize(20);
   fill(255);
   text("STARS:"+score,10,30);
     //score = score + Math.round(getFrameRate()/100);
if(gameState==="end"){
 text("PRESS R TO RESET",100,300); 
}    


}

function Sbeam(){
beam = createSprite(195,330);
beam.addImage(beamImg);
beam.scale=0.3;
beam.depth=rocket.depth;
beam.depth-=1;
beam.x=rocket.x;
beam.velocityY=-5;
beamG.add(beam);
}

function Sa(){
  if(frameCount%100===0){
astreoid=createSprite(Math.round(random(120,400))-50);
astreoid.addImage(asImd);
astreoid.scale=0.5;
astreoid.velocityY=(4+2*score/4);
    
astreoidG.add(astreoid);

}
}

function StarsS(){
if(frameCount%90===0){
  stars=createSprite(Math.round(random(130,400))-50);
  stars.addImage(sImg);
  stars.velocityY=(4+2*score/4);
  stars.scale=0.2;
  starsG.add(stars);
} 
  
}

function RESET(){
  gameState="play";
  game.visible=false;
  score=0;
  space.velocityY=3;
  //rocket.addImage(rocketImg);
 rocket.changeImage("label",rocketImg);
  rocketImg.visible=true;
}
