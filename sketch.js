var ball;
var database;
var position;       

function setup(){
    createCanvas(500,500);

    //create a database inside the database variable -> firebase.database()
    database = firebase.database();

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //to refer the 'position' in the database inside the variable ballPositionRef -> database.ref()
    var ballPositionRef = database.ref('ball/position');

    //listen to the changes happeneing in the {databse -> .on("value",function1,function2,...)
    ballPositionRef.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
database.ref('ball/position').update({
    'x':position.x + x,
    'y':position.y + y
})

}

function readPosition(data){
//store the listened values inside the position variable -> data.val()
position = data.val();

ball.x = position.x;
ball.y = position.y;
}

function showError(){
console.log("There is an error")
}