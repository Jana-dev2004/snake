const gameboard=document.getElementById('gameboard');
const score=document.getElementById('score');
const context=gameboard.getContext('2d');
const WIDTH=gameboard.width;
const HEIGHT=gameboard.height;
const UNIT=25;
let foodx;
let foody;
let xvel=25;
let yvel=0;
let scr=0;
let active=true;
let started=false;
let snake=[{x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
     {x:0,y:0}];
     window.addEventListener('keydown',keypress);
startgame();
function startgame()
{
    context.fillStyle='#212121';
    //fillrect(xstart,ystart,width,height)
    context.fillRect(0,0,WIDTH,HEIGHT);
    createfood();
    displayfoood();
   // drawsnack();
    //movesnake();
    //nexttick();
    drawsnack();
}
function clearboard()
{
    context.fillStyle='black';
    context.fillRect(0,0,WIDTH,HEIGHT);
}
function createfood()
{
 foodx=Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
 foody=Math.floor(Math.random()*HEIGHT/UNIT)*UNIT;
}
function displayfoood()
{
    context.fillStyle='red';
    context.fillRect(foodx,foody,UNIT,UNIT);
}
function drawsnack()
{
    context.fillStyle='aqua';
    snake.forEach((snakepart)=>{
        context.fillRect(snakepart.x,snakepart.y,UNIT,UNIT);
        context.strokeRect(snakepart.x,snakepart.y,UNIT,UNIT);
    })
}
function movesnake()
{
   const head={x:snake[0].x+xvel,y:snake[0].y+yvel}
   snake.unshift(head);
   if(snake[0].x==foodx && snake[0].y==foody)
   {
    scr+=1;
    score.textContent=scr;
    createfood();
   }
   else{
   snake.pop();
   }
}
function nexttick()
{
    if(active){
    setTimeout(()=>{
        clearboard();
        displayfoood();
        movesnake();
        drawsnack();
        checkgameover();
        nexttick();
    },300);
}
else{
    clearboard();
    context.font="bold 50px serif";
    context.fillStyle="white";
    context.textAlign="center";
    context.fillText("GAME OVER!",WIDTH/2,HEIGHT/2);
}
}
function keypress(event)
{
if(!started)
{
    started=true;
    nexttick();
}
const left=37;
const up=38;
const right=39;
const down=40;
switch(true)
{
    case(event.keyCode==left && xvel!=UNIT):
    xvel= -UNIT;
    yvel=0;
    break;
    case(event.keyCode==right && xvel!=-UNIT):
     xvel=UNIT;
     yvel=0;
     break;
     case(event.keyCode==up && yvel!=UNIT):
     xvel=0;
     yvel=-UNIT;
     break;
     case(event.keyCode==down && yvel!=-UNIT):
     xvel=0;
     yvel=UNIT;
     break;
}
}
function checkgameover()
{
    switch(true)
    {
        case(snake[0].x<0):
        case(snake[0].x>=WIDTH):
        case(snake[0].y<0):
        case(snake[0].y>=HEIGHT):
        active=false;
        break;

    }
}
