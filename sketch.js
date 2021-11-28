const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var rope,stone,ground;
var stone_con;
var skelly,broken_skelly;
var button;
var rock; 


function preload()
{

  rock = loadImage("rock.png");
  skelly = loadImage("skelly.PNG");
  
  broken_skelly = loadImage("broken_skelly.jpg");
}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg("cut_btn.jpg");
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  skelly = createSprite(50,620,100,100);
 skelly.scale = 0.2;

 skelly.addImage("broken_skel",broken_skelly)
  
  rope = new Rope(7,{x:245,y:50});
  ground = new Ground(200,690,600,60);
  
stone = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,stone);

 stone_con = new Link(rope,stone);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);

  if(stone != null){
    image(rock,stone.position.x,stone.position.y,70,70);
  }

 rope.show();
 ground.show();
 
 if(collide(stone, skelly) == true){
skelly.changeImage("broken_skel");
 }

 Engine.update(engine);

 drawSprites();
}

function drop()
{
  rope.break();
  stone_con.detach();
stone_con = null; 
}

function collide(body, sprite){

if(body != null){
var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);

if(d <= 80){
World.remove(world, stone);
stone = null;
return true;
}

else{
return false;
}
}

}

