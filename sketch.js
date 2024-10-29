// GLOW EFFECT:
// https://editor.p5js.org/jesse_harding/sketches/WpONQ8o6u


// GLOBAL VARIABLES (to change between scenes):
let scene = 0; // 
let sceneTimer = 0; // -----> timer to control transitions
let enemyHit = false;

// CLASSES CALLINGS
let ball;
let enemy1;


function setup(){

  createCanvas(800, 800);
  ball = new MainBall(width / 2, height / 2, 80, 80);     // -----> to initialice main character
  enemy1 = new Enemy(random(width), random(height));     // -----> enemie starts in random position in screen
  
} 


function draw(){

  background(255); 

  if (scene === 0) {
    ball.display();
    enemy1.move();
    enemy1.display();
    checkHit(enemy1, ball);  

  } else if (scene === 1) {
    hurtAnimation(ball.x, ball.y);  // -----> lines from ball's position

    if (millis() - sceneTimer > 300) {
      scene = 2;
      sceneTimer = millis();  // -----> reset timer
    }

  } else if (scene === 2) {
    ball.reduceGlow();
    ball.display();
  }

  if (ball.glow <= 0){
    enemy1.reset();
    scene = 0;
  }

}


class MainBall {  // -----> 'main character'

  constructor (x, y, size, glow){
    this.x = x;
    this.y = y;
    this.size = size;
    this.glow = glow;
  }

  display() {
    if (this.glow > 0){
      this.displayWithGlow();
    }else{
      this.displayWithoutGlow();
    }
  }

  displayWithGlow (){
    fill(0,0,255,10); 
    noStroke(); 
    for(let i = 0; i < this.glow; i++){  // -----> glow effect
      ellipse(this.x, this.y, i*2); 
    }
    stroke(255);   
    strokeWeight(2);
    ellipse(this.x, this.y, this.size);  // ----> stroke to define the ball
  }
  
  displayWithoutGlow(){
    fill(0,0,255);
    stroke(255);
    strokeWeight(2);
    ellipse(this.x, this.y, this.size);
  }

  reduceGlow (glowLevel){  // -----> to reduce glow after each hit (TO FIX)
    if (this.glow > 0){
      this.glow -= 80/3; // ------> to slowly reduce the glow
    }
  }

}


class Enemy {  // -----> red triangles that will attack the ball

  constructor(x, y){
    this.x = x;
    this.y = y;
    this.speed = 3;
  }

  move() {
    let dirX = (width/2 - this.x) * 0.01;
    let dirY = (height/2 - this.y) * 0.01;
    this.x += dirX * this.speed;
    this.y += dirY * this.speed;
  }

  display() {
    noStroke();
    fill (255, 0, 0);
    triangle(this.x-60, this.y+30, this.x-60, this.y-30, this.x, this.y);
  }

  reset() {
    this.x = random(width);
    this.y = random(height);
    enemyHit = false;

  }

}


function checkHit(enemy, ball) {

  let d = dist(enemy.x, enemy.y, ball.x, ball.y);

  if (d < ball.size/2 && !enemyHit) {
    scene = 1;  // -----> for switching to hurt animation
    sceneTimer = millis(); // -----> Start timer
    enemyHit = true;
  }

}


function hurtAnimation(centerX, centerY) { 

  background(0); 

  // ball representation
  noFill();
  stroke(100);    
  strokeWeight(2);
  ellipse(width/2, height/2, ball.size); 

  // hurt representation
  stroke(255, 0, 0, 150);
  strokeWeight(random(0.5, 2)); 

  for (let i = 0; i < 100; i++) {  // -----> random red lines
    let angle = random(TWO_PI); 
    let length = random(50, 800); 
    let x2 = centerX + cos(angle) * length;
    let y2 = centerY + sin(angle) * length;
    line(centerX, centerY, x2, y2); 
  }

}


  







