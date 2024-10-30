// GLOW EFFECT:
// https://editor.p5js.org/jesse_harding/sketches/WpONQ8o6u


// GLOBAL VARIABLES (to change between scenes):
let scene = 0; 
let stopped = false;  // -----> boolean to stop the animations

// Classes and Variables (for big loop);
let ball;
let enemies = [];  // -----> array of enemies to have multiple attacking at the same time
let shakeAmount = 0;
let hurtActive = false;  // boolean for activating and desactivating the hurt animation
let hurtTimer = 0;  


function setup(){

  createCanvas(800, 800);
  ball = new MainBall(width / 2, height / 2, 120, 120);     // -----> to initialice main character
  spawnEnemies();   

} 


function draw() {

  if (stopped) {
    background(255); 
    ball.display();
    return;
  }

  if (scene === 1 || hurtActive){
    background(0);
  } else {
    background (255);
  }

  if (shakeAmount > 0){
    translate (random(-shakeAmount, shakeAmount), random(-shakeAmount, shakeAmount));
    shakeAmount -= 0.1;
  }

  if (scene === 0) {
    ball.lossGlow();
    ball.display();
    updateEnemies();
    checkHits(); 
  }   

  // to stop everything when the glow it's almost gone
  if (ball.glow <= 70){
    stopped = true;
  }

  if (random(1) < 0.010){
    triggerShake(10);
    startHurtAnimation(30);
  
  } else if (scene === 1) {
    hurtAnimation(ball.x, ball.y, 300);  // -----> line lenght from ball's position
    if (millis() - sceneTimer > 400) {  // -----> time for hurt animation
      scene = 2; 
      ball.shakeCount = 40;  // -----> time for ball shaking
    }

  } else if (scene === 2) {
    if (ball.shakeCount > 0){
      ball.shake(2);  // -----> shake intensity 
      ball.shakeCount--;
    } else {
      ball.display();
    }  
  }  

  if (hurtActive){
    hurtAnimation(ball.x, ball.y, 300);
    hurtTimer --;
    if (hurtTimer <= 0) {
      hurtActive = false;
    }
  }
} 


class MainBall {  // -----> 'main character'

  constructor (x, y, size, glow){
    this.x = x;
    this.y = y;
    this.size = size;
    this.glow = glow;
    this.shakeCount = 0;
  }

  display() {
    fill(0,0,255,10); 
    noStroke(); 
    for(let i = 0; i < this.glow; i++){  // -----> glow effect
      ellipse(this.x, this.y, i*2); 
    }
    stroke(255);   
    strokeWeight(2);
    fill (0, 0, 255);
    ellipse(this.x, this.y, this.size);  // ----> stroke to define the ball
  }
  
  shake(amount){  // -----> to control how strong does the ball shake
      this.x += random(-amount, amount);
      this.y += random(-amount, amount);
  }

  lossGlow() {  
    if (this.glow > 70){
      this.glow -= 0.1; // ------> to slowly reduce the glow
    }
  }

  recoverGlow() {  
    if (this.glow < 70){
      this.glow += 0.1; // ------> to slowly reduce the glow
    }
  }  
}


class Enemy {  // -----> red triangles that will attack the ball

  constructor(x, y, speed){  // -----> speed to change each time the class is called
    this.x = x;
    this.y = y;
    this.speed = speed;
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

}

function spawnEnemies(){
  enemies = [];
  for (let i = 0; i < 3; i++){
    let angle = random(TWO_PI);
    let x = width/2 + cos(angle)*400;
    let y = height/2 + sin(angle)*400;
    enemies.push(new Enemy(x, y, random(2,5)));
  }
}

function updateEnemies(){
  for (let i = enemies.length - 1; i >= 0; i--){
    let enemy = enemies [i];
    enemy.move();
    enemy.display();

    if (dist(enemy.x, enemy.y, ball.x, ball.y) < ball.size/2){
      enemies.splice(i, 1);  // to eliminate enemies when reaching the middle
      if (enemies.length === 0){
        spawnEnemies();
      }
    }
  }
}


function checkHits() {
  for (let enemy of enemies){
    let d = dist(enemy.x, enemy.y, ball.x, ball.y);
    if (d < ball.size/2) {
      scene = 1;  // -----> for switching to hurt animation
      sceneTimer = millis(); 
    }  
  }
}


function triggerShake (amount) {
  shakeAmount = amount;
}


function startHurtAnimation(duration){
  hurtActive = true;
  hurtTimer = duration;
}


function hurtAnimation(centerX, centerY, intensity) {  // -----> to easily change the impact of the lines in each hit

  // hurt representation
  stroke(255, 0, 0, 150);
  strokeWeight(random(0.5, 2)); 

  for (let i = 0; i < 100; i++) {  // -----> random red lines
    let angle = random(TWO_PI); 
    let length = random(50, intensity); 
    let x2 = centerX + cos(angle) * length;
    let y2 = centerY + sin(angle) * length;
    line(centerX, centerY, x2, y2); 
  }
}




