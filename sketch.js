var ironman;
var stone;
var diamond;
var spikes;
var restart;
var fireup;
var firedown;
var thanos;
var score = 0;
var gameState = "PLAY";

function preload() {
    ironman = loadImage("images/iron.png");
    backGround = loadImage("images/bg.jpg");
    stone = loadImage("images/stone.png");
    diamond = loadImage("images/diamond.png");
    spikes = loadImage("images/spikes.png");
  restart_image = loadImage("images/restart.png");
    fireup = loadImage("images/fireball upward.png");
    firedown = loadImage("images/fireball downward.png");
    thanos = loadImage("images/thanos.png");
}

function setup() {
    createCanvas(600, 600);
    bg = createSprite(300, 300, 100, 800);
    bg.addImage(backGround);
    bg.scale = 2
    ironMan = createSprite(300, 200, 0, 0);
    ironMan.addImage(ironman);
    ironMan.scale = 0.2;
  restart = createSprite(300,300,200,80);
  restart.addImage(restart_image);
  restart.visible = false;
    platformUp = createSprite(300, -20, 650, 50);
    platformUp.visible = false;
    platformDown = createSprite(300, 620, 650, 50);
    platformDown.visible = false;
    platformLeft = createSprite(-20, 300, 50, 650);
    platformLeft.visible = false;
    platformRight = createSprite(620, 300, 50, 650);
    platformRight.visible = false;
    stoneGroup = new Group();
    pointGroup = new Group();
    pointGroup2 = new Group();
    fireUp = new Group();
}

function draw() {
    background(220);
    if (gameState === "PLAY") {
        bg.velocityY = -4;
        if (bg.y < 10) {
            bg.y = 500;
        }

        if (keyDown("up")) {
            ironMan.y -= 10;
        }

        if (keyDown("down")) {
            ironMan.y += 5;
        }

        if (keyDown("right")) {
            ironMan.x += 5;
        }

        if (keyDown("left")) {
            ironMan.x -= 5;
        }

        ironMan.velocityY = 6;

        ironMan.collide(platformUp);
        ironMan.collide(platformLeft);
        ironMan.collide(platformRight);

        // ironMan.setCollider("rectangle", 10, 0);
        createStone();
        createpoints();
      
      if(frameCount%30 === 0){
      if(keyDown("space")){
        ironpower();
        
       }}
      

        for (var i = 0; i < stoneGroup.length; i++) {
            temp = stoneGroup.get(i);
            ironMan.collide(temp);
        }
      
        for (var i = 0; i < fireUp.length; i++){
          x = fireUp.get(i);
          if(x.isTouching(platformUp)){
            x.destroy();
          }
        }

        if (ironMan.collide(platformDown) || score <= -10) {
            textSize(50);
            text("you lose", 300, 300);
            gameState = "END";
        }


        for (var b = 0; b < pointGroup.length; b++) {
            temp2 = pointGroup.get(b);
            if (ironMan.isTouching(temp2)) {
                temp2.destroy();
                score++;
            }
        }

        for (var c = 0; c < pointGroup2.length; c++) {
            temp3 = pointGroup2.get(c);
            if (ironMan.isTouching(temp3)) {
                temp3.destroy();
                score = score - 5;
            }
        }
    } else if (gameState === "END") {
        bg.velocityY = 0;
        ironMan.visible = false;
        stoneGroup.setVelocityYEach(0);
        stoneGroup.setLifetimeEach(-1);
        pointGroup.setVelocityYEach(0);
        pointGroup.setLifetimeEach(-1);
        pointGroup2.setVelocityYEach(0);
        pointGroup2.setLifetimeEach(-1);   
      restart.visible = true;
      if(mousePressedOver(restart)){
    restartGame();
  }
    }
  
  

    drawSprites();

    textSize(40);
    text("SCORE : " + score, 30, 40)

    function createStone() {
        if (frameCount % 80 === 0) {
            Stone = createSprite(100, -50, 125, 0);
            Stone.addImage(stone);
            Stone.scale = 0.5;
            Stone.x = random(100, 500);
            Stone.velocityY = 6;
            Stone.lifeTime = 200;
            stoneGroup.add(Stone);
        }
    }

    function createpoints() {
        if (frameCount % 120 === 0) {
            var rand = Math.round(random(1, 2));
            switch (rand) {
                case 1:
                    points = createSprite(100, -50, 40, 40);
                    points.velocityY = 2;
                    points.scale = 0.5;
                    points.x = random(100, 500);
                    points.lifetime = 300;
                    points.addImage(diamond);
                    pointGroup.add(points);

                    break;
                case 2:
                    points2 = createSprite(100, -50, 40, 40);
                    points2.addImage(spikes);
                    points2.velocityY = 2;
                    points2.scale = 0.5;
                    points2.x = random(100, 500);
                    points2.lifetime = 300;
                    pointGroup2.add(points2);

                    break
                default:
                    break;
            }
        }
    }
  
  function ironpower(){
    var fireball;
    fireball = createSprite(700,700,20,20);
    fireball.x = ironMan.x;
    fireball.y = ironMan.y;
    fireball.addImage(fireup);
    fireball.scale = 0.08;
    fireball.velocityY = -8;
    fireball.lifetime = 300;
    if(fireball.isTouching(platformUp)){
      fireball.destroy();
    }
  
    fireUp.add(fireball);
  }
  
  function restartGame(){
    gameState = "PLAY";
    if(gameState === "PLAY"){
      stoneGroup.destroyEach();
      pointGroup.destroyEach();
      pointGroup2.destroyEach();
      score = 0;
      ironMan.x = 300;
      ironMan.y = 200;
      ironMan.visible = true;
      bg.velocityY = -4;
      restart.visible = false;
    }
  }
}
