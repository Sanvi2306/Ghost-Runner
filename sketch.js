var back,backImg,PLAY,END,gameState,ghost,ghostImg,edges,windo,windImg,climb,climbImg,climbG,invisG,invis,doorsG,spooky;

PLAY=1;
END=0;
gameState=PLAY;







function preload(){
  backImg=loadImage("tower.png");
  ghostImg=loadImage("ghoststand.png");
  climbImg=loadImage("climber.png");
  windImg=loadImage("door.png");
  spooky=loadSound("spooky.wav");
  
  
  
}


function setup(){
 createCanvas(500,500); 
  
  back=createSprite(250,250,500,500);
  back.addImage("backy",backImg);
  back.scale=0.9;
  back.velocityY=3;
  
  
ghost=createSprite(250,250,20,20);
  ghost.addImage("ghos",ghostImg);
  ghost.scale=0.4;
  
  edges=createEdgeSprites();
  
  climbG=new Group();
  invisG=new Group();
  doorsG=new Group();
  
  //ghost.debug=true;
  ghost.setCollider("circle",0,0,90)
  
  spooky.loop();
}



function draw(){
  background("white");
  
  if(gameState===PLAY){
    
   if(back.y>=480) {
    back.y=250; 
     
   }
    ghost.velocityY=ghost.velocityY+0.5;
    if(keyDown("space")){
      
      ghost.velocityY=-1;
      
    }
    
    if(keyDown("right")){
      
     ghost.velocityX=3; 
    }
    
    if(keyDown("left")){
      
      ghost.velocityX=-3;
    }
    
 spawnWindows();
 
  if(ghost.isTouching(invisG)||ghost.isTouching(edges[3]))  {
    gameState=END;
    
  }
    
    if(ghost.isTouching(climbG)){
      
      ghost.velocityY=0;
    }
    
    
  }
  
  else if(gameState===END){
   invisG.destroyEach();
   doorsG.destroyEach();
    climbG.destroyEach();
    back.destroy();
    ghost.destroy();
    
    textSize(50);
     text("Game Over",100,250)
    
  }
  
  
  
  
 drawSprites(); 
}

function spawnWindows(){
 if(frameCount%100==0){
   var x=Math.round(random(75,425));
   windo=createSprite(x,0,20,20);
   windo.velocityY=3;
   windo.addImage("wind",windImg);
   climb=createSprite(x,50,20,20);
   climb.velocityY=3;
   climb.addImage("cli",climbImg);
   climb.scale=0.9;
   windo.lifetime=200;
   climb.lifetime=200;
   
   invis=createSprite(x,70,70,10);
   invis.velocityY=3;
   invis.lifetime=200;
   invis.visible=false;
   
   invisG.add(invis);
   climbG.add(climb);
   doorsG.add(windo);
   
   windo.depth=ghost.depth;
   ghost.depth=ghost.depth+1;
   
 } 
  
  
  
  
}




