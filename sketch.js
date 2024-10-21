// GLOW EFECT: 
// https://editor.p5js.org/jesse_harding/sketches/WpONQ8o6u -----> Fill for balls, glow effect
// maybe check drawingContext in p5.js reference 

// VARIABLES IN SKETCH
// define: ball color and ball "light"
// background color

function setup(){

  createCanvas(800, 800);
  

}

function draw(){
 
  background(255);
  ball (100,100);
  ball (200, 200);
  mainBall();

}

function mainBall(){

  
  fill(255,0,0,10);  // ----> alpha channel to "dim" the light of the ball (transform into a variable)
  for(i = 0; i < 50; i++){
  ellipse(mouseX, mouseY, i*2); 
  }
  stroke(255);    // ----> stroke and background color must be the same to create the effect
  strokeWeight(2);
  ellipse(mouseX, mouseY, 50, 50); // ----> stroke to define the ball

}

function ball(x, y){   // copy of main ball changing x and ypos and color to draw different balls around
  
  fill(0,255,0,10);  
  for(i = 0; i < 50; i++){
  ellipse(x, y, i*2); 
  }
  ellipse(x, y, 50, 50); 

}