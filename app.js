const canvas = document.getElementById("game-grid");
const ctx = canvas.getContext("2d");
var snake = new Snake();
var food = new Food();

//######################## Snake constructor function ###########################

function Snake(){
    this.x = 0;
    this.y = 0;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];

    this.draw = function(){
        ctx.fillStyle = "#ffbd69";
        for (let i = 0; i < this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x, this.tail[i].y, 10, 10);  
        }
        ctx.fillRect(this.x, this.y, 10, 10);
    }

    this.update = function(){
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i+1]; 
        }
        this.tail[this.total-1] = {
            x: this.x,
            y: this.y
        };
        this.x += this.xSpeed * 10;
        this.y += this.ySpeed * 10;
    }

    this.changeDirection = function(key){
        switch (key) {
            case "ArrowUp":
                this.xSpeed = 0;
                this.ySpeed = -1;
                break;
            case "ArrowDown":
                this.xSpeed = 0;
                this.ySpeed = 1;
                break;
            case "ArrowLeft":
                this.xSpeed = -1;
                this.ySpeed = 0;
                break;
            case "ArrowRight":
                this.xSpeed = 1;
                this.ySpeed = 0;
                break;
            default:
                console.log(key);
                break;
        }
    }

    this.hasEaten = function(food){
        if(this.x === food.x && this.y === food.y){
            this.total++;
            return true;
        }
        return false;
    }

}

//######################## Food constructor function ###########################

function Food(){
    this.x;
    this.y;

    this.draw = function(){
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(this.x, this.y, 10, 10);
    }
    
    this.pickLocation = function(){
        this.x = Math.floor(Math.random() * 40) * 10;
        this.y = Math.floor(Math.random() * 40) * 10; 
    }
}

//##############################################################################

food.pickLocation();

function stopGame(){
    clearInterval(startInterval);
    alert("Refresh page to restart!")
}

var startInterval = setInterval(function(){
        if(snake.hasEaten(food)){
            food.pickLocation();
        }
        if(snake.x > 400 || snake.x < 0 || snake.y > 400 || snake.y < 0){
            stopGame();
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake.update();
        food.draw();
        snake.draw();

    },100);

document.addEventListener("keydown", function(event){
    snake.changeDirection(event.key);
})

var controlButtons = document.querySelectorAll(".move-btn");
for(let i=0; i<controlButtons.length; i++){
    controlButtons[i].addEventListener("click", function(event){
        const butttonDirection = event.path[0].attributes.class.ownerElement.classList[1];
        snake.changeDirection(butttonDirection);
        
    })
}
