// GLOW EFFECT:
// https://editor.p5js.org/jesse_harding/sketches/WpONQ8o6u

let scene = 0; // (scene0: ball scene, scene1: animation, scene2: back to ball)
let sceneTimer = 0; // -----> timer to control transitions

let ball;
let enemy1;

function setup(){

  createCanvas(800, 800);
  ball = new MainBall(width / 2, height / 2, 80, 80);     // -----> to initialice main character
  enemy1 = new Enemy(random(width), random(height));     // -----> enemie starts in random position in screen
  
} 

function draw(){

  if (scene === 0) {
    background(255); 
    enemy1.move();
    enemy1.display();
    ball.display();

    checkHit(enemy1, ball);
  } else if (scene === 1) {
    hurtAnimation(ball.x, ball.y); // -----> lines from ball's position

    if (millis() - sceneTimer > 1000) {
      scene = 2;
      sceneTimer = millis(); // -----> reset timer
    }

  } else if (scene === 2) {
    background(255);
    ball.reduceGlow();
    ball.display();
  }

}

class MainBall {     // -----> 'main character'

  constructor (x, y, size, glow){
    this.x = x;
    this.y = y;
    this.size = size;
    this.glow = glow;
  }

  display() {
    fill(0,0,255,10);  
    for(let i = 0; i < this.glow; i++){    // -----> glow effect
      ellipse(this.x, this.y, i*2); 
    }
    stroke(255);    // ----> stroke and background color must be the same 
    strokeWeight(2);
    ellipse(this.x, this.y, this.size); // ----> stroke to define the ball
  }

  reduceGlow (){   // -----> to reduce glow after each hit (TO FIX)
    this.glow = max(40, this.glow - 0.1);
  }

}

class Enemy {     // -----> red triangles that will attack the ball

  constructor(x, y){
    this.x = x;
    this.y = y;
    this.speed = random (0.5, 1);
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
    triangle(this.x-40, this.y+20, this.x-40, this.y-20, this.x, this.y);
  }

}

function checkHit(enemy, ball) {

  let d = dist(enemy.x, enemy.y, ball.x, ball.y);

  if (d < ball.size/2) {
    hit = true;
    scene = 1; // -----> for switching to hurt animation
    sceneTimer = millis(); // -----> Start timer
  }

}

function hurtAnimation(centerX, centerY) { 

  background(0); 
  stroke(255, 0, 0, 150);
  strokeWeight(random(0.5, 2)); 

  for (let i = 0; i < 100; i++) {     // -----> random red lines
    let angle = random(TWO_PI); 
    let length = random(50, 800); 
    let x2 = centerX + cos(angle) * length;
    let y2 = centerY + sin(angle) * length;
    line(centerX, centerY, x2, y2); 
  }

}


  







