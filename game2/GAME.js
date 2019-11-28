var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var bricks = [];
var paddle1Width, paddle1Height, bricksNumX, bricksNumY;
var paddle2Width, paddle2Height, paddle3Width, paddle3Height;
var paddle4Width, paddle4Height;
var brickWidth, brickHeight, brickMargin, paddle1X, paddle1Y;
var paddle2X, paddle2Y, paddle3X, paddle3Y;
var paddle4X, paddle4Y;
var ballX, ballY, ballVx, ballVy, ballDirx, ballDiry;
var restart = true;

function setValues() {
  paddle1Width = 80;
  paddle1Height = 12;
  paddle3Width = 80;
  paddle3Height = 12;
  bricksNumX = 7;
  bricksNumY = 5;
  brickWidth = 30;
  brickHeight = 30;
  brickMargin = 4;
  ballVx = 1;
  ballVy = 1;
}
function init() {
  restart = false;
  paddle1X = canvas.width/2;
  paddle3X = canvas.width/2;
  ballX = 40;
  ballY = 150;
  ballDirx = 1;
  ballDiry = 1;

}
function newgame(){
	if(ballY<=0){restart=true}
		else if(ballY>=canvas.height){restart=true}
}
var invisibles=[]//danh sach gach da bi dap trung
function drawBrick(brickx,bricky){
if(ballX==brickx+brickWidth && ballY>=bricky && ballY<=bricky+brickHeight){
	if(invisibles.indexOf(brickx +"_"+ bricky)<0){//kiem tra vien gach co nam trong danh sach da bi dap trung hay chua
			invisibles.push(brickx +"_"+ bricky)//cho vao danh sach da bi dap trung 
			console.log(invisibles)
			ballDirx=-ballDirx
		}
	 }
else if(ballX==brickx && ballY>=bricky && ballY<=bricky+brickHeight){
	if(invisibles.indexOf(brickx +"_"+ bricky)<0){//kiem tra vien gach co nam trong danh sach da bi dap trung hay chua
			invisibles.push(brickx +"_"+ bricky)//cho vao danh sach da bi dap trung 
			console.log(invisibles)
			ballDirx=-ballDirx
		}
	}
else if(ballY==bricky && ballX<=brickx+brickWidth && ballX>=brickx){
	if(invisibles.indexOf(brickx +"_"+ bricky)<0){//kiem tra vien gach co nam trong danh sach da bi dap trung hay chua
			invisibles.push(brickx +"_"+ bricky)//cho vao danh sach da bi dap trung 
			console.log(invisibles)
			ballDiry=-ballDiry
		}
	 }
else if(ballX>=brickx && ballX<=brickx+brickWidth && ballY==bricky+brickHeight){//kt vien gach bi dap trung 
		// context.clearRect(brickx,bricky,brickWidth,brickHeight)
		if(invisibles.indexOf(brickx +"_"+ bricky)<0){//kiem tra vien gach co nam trong danh sach da bi dap trung hay chua
			invisibles.push(brickx +"_"+ bricky)//cho vao danh sach da bi dap trung 
			console.log(invisibles)
			ballDiry=-ballDiry
		}
		

	}

if(invisibles.indexOf(brickx +"_"+ bricky)<0){//kiem tra lan hai neu k co danh sach thi ve
		context.fillRect(brickx,bricky,brickWidth,brickHeight)
}
}
function circle(x, y) {
  context.beginPath();
  context.arc(x, y, 10, 0, 2*Math.PI);
  context.fill();
}
function clear() {
  context.clearRect(0, 0, canvas.width, canvas.height);  
}
 function drawPaddle() {
  var x = paddle1X - paddle1Width/2;
  var y = canvas.height - paddle1Height;
  context.fillRect(x, y, paddle1Width, paddle1Height);
    x = paddle3X - paddle3Width/2;
	y = 0;
	context.fillRect(x, y, paddle3Width, paddle3Height);
  }
function mouseMove(event) {
  paddle1X = event.layerX;
  paddle3X = event.layerX;
}

function hitPaddle(){
	if(ballX>=paddle1X-paddle1Width/2 && ballY>=canvas.height-paddle1Height && ballY<=canvas.height && ballX<=paddle1X+paddle1Width/2){
		console.log(123)
		ballDiry=-ballDiry
	}
	else if(ballX>=paddle3X-paddle3Width/2 && ballY<=paddle3Height && ballX<=paddle3X+paddle3Width/2){
		ballDiry=-ballDiry
	}
}
function hitSideway(){
	if(ballX>=canvas.width){ballDirx=-ballDirx}
	else if(ballX<=0){ballDirx=-ballDirx}
}
function drawdown(){
	for(i=130;i<550;i+=30){
		drawBrick(100,i)
	}
	for(i=130;i<300;i+=30){
		drawBrick(220,i)
	}
	for(i=340;i<500;i+=30){
		drawBrick(310,i)
	}
}
function drawnhor(){
	for(i=130;i<450;i+=30){
		drawBrick(i,520)
	}
	for(i=250;i<400;i+=30){
		drawBrick(i,130)
	}
	for(i=250;i<400;i+=30){
		drawBrick(i,280)
	}
	for(i=220;i<430;i+=30){
		drawBrick(i,340)
	}
}

function tick() {

if (restart) {
    init();
    invisibles=[]
}
if(ballY<=0){restart=true}
		else if(ballY>=canvas.height){restart=true}
	hitPaddle()
	hitSideway()
	
clear()
		setValues()
		drawdown()
		drawnhor()

	drawPaddle()
	

	ballX += ballVx*ballDirx;
	ballY += ballVy*ballDiry;
	circle(ballX,ballY)
	
}


canvas.onmousemove = mouseMove;
window.setInterval(tick,1);
