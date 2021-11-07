
var trex ,trex_running;
var score=0 
var gamestate = "play"  
//intendaion : giving tab spaces in the beginning of the line

//load animations, images and sound
function preload () {
  trexani = loadAnimation ("trex1.png", "trex3.png", "trex4.png")
  groundani = loadImage ("ground2.png")
  cloudImg = loadImage ("cloud.png")
  ob1 = loadImage ("obstacle1.png")
  ob2 = loadImage ("obstacle2.png")
  ob3 = loadImage ("obstacle3.png")
  ob4 = loadImage ("obstacle4.png")
  ob5 = loadImage ("obstacle5.png")
  ob6 = loadImage ("obstacle6.png")
  trexdead = loadAnimation("trex_collided.png")
  gameoverimg = loadImage ("gameOver.png")
  restartimg = loadImage ("restart.png")
  jump = loadSound ("jump.mp3")
  die = loadSound ("die.mp3")
  checkpoint = loadSound ("checkPoint.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  
  trex = createSprite (50,height-70, 20, 25)
  trex.addAnimation ("running", trexani) 
   trex.addAnimation("stop", trexdead)
  trex.scale = 0.5
  trex.debug = false
  trex.setCollider("rectangle", 0,0, 80,80)

  ground = createSprite (width/2, height-20, width, 20)
  ground.addImage (groundani)

  ground2 = createSprite (width/2, height-15, width, 20)
  ground2.visible = false 

  cloudg =  createGroup()
  obstacleg = createGroup()

  gameover=createSprite (width/2,height/2,10,10)
  restart=createSprite (width/2,height/2 + 100,10,10)
  gameover.addImage (gameoverimg)
  restart.addImage (restartimg)
  gameover.scale = 0.5
  restart.scale = 0.5
}

function draw(){
  background(180)
  //concatenation: joining 2 values using + sign
  text("Score = "+ score, width-100,50)

  if (gamestate==="play") {
    gameover.visible = false
    restart.visible = false 
    //getFrameRate - frames per second
  score = score + Math.round(getFrameRate()/60 )

  ground.velocityX = -4
  if (ground.x < 0 ) {
    ground.x = width
   }
//touches = [x,y] length is 2
  if ((keyDown ("space")|| touches.length>0 )&& trex.y>=width/3) {
  trex.velocityY = -6
  jump.play()
  touches = []
  }
  trex.velocityY = trex.velocityY + 0.2 
  clouds();
  
  obstacles()
  if (trex.isTouching(obstacleg)){ 
    gamestate = "end"
    die.play()
  }
if (score%100===0 && score>0)
 {
   checkpoint.play()
 }  
  } 

  if (gamestate==="end") {
    ground.velocityX = 0 
    obstacleg.setVelocityXEach(0)
    cloudg.setVelocityXEach(0)
    trex.velocityY = 0
    obstacleg.setLifetimeEach (-10)
    cloudg.setLifetimeEach(-10)
    trex.changeAnimation("stop", trexdead)
    gameover.visible = true
    restart.visible = true
    if (mousePressedOver(restart)  || keyDown("space")){ 
      gamestate = "play"
      obstacleg.destroyEach()
      cloudg.destroyEach()
      trex.changeAnimation ("running", trexani) 
      score = 0
    }
  }
  trex.collide (ground2)
  drawSprites ()
 
}

function clouds () {
  if (frameCount%100===0) {
  var cloud = createSprite (width, random(30,100), 20, 25)
  cloud.velocityX = -3 
  cloud.addImage (cloudImg)
  cloud.scale = 0.5
trex.depth = cloud.depth+1
cloud.lifetime = 900
cloudg.add(cloud)
  }
}


function obstacles () {
  if (frameCount%120===0) {
  var obstacle = createSprite (width, height-45, 20, 25)
  obstacle.velocityX = -3 
  obstacle.lifetime = 900
  var choice = Math.round(random(1,6))
  switch (choice){
    case 1 : obstacle.addImage(ob1)
    break 
    case 2 : obstacle.addImage(ob2)
    break 
    case 3 : obstacle.addImage(ob3)
    break 
    case 4 : obstacle.addImage(ob4)
    break 
    case 5 : obstacle.addImage(ob5)
    break 
    case 6 : obstacle.addImage(ob6)
    break  
  }
  obstacle.scale = 0.5 
  obstacleg.add(obstacle)
  }
}
