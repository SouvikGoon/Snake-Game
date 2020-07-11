const canvas = document.getElementById("game-grid");
const ctx = canvas.getContext("2d");
var snake = new Snake();
var food = new Food();
var score = 0;

//######################## Snake constructor function ###########################

function Snake(){
    this.x = 0;
    this.y = 0;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];

    this.draw = function(){
        ctx.fillStyle = "#fff1cf";
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
                if(this.ySpeed !== 1){
                    this.xSpeed = 0;
                    this.ySpeed = -1;
                }
                break;
            case "ArrowDown":
                if(this.ySpeed !== -1){
                    this.xSpeed = 0;
                    this.ySpeed = 1;
                }
                break;
            case "ArrowLeft":
                if(this.xSpeed !== 1){
                    this.xSpeed = -1;
                    this.ySpeed = 0;
                }
                break;
            case "ArrowRight":
                if(this.xSpeed !== -1){
                    this.xSpeed = 1;
                    this.ySpeed = 0;
                }
                break;
            default:
                console.log(key);
                break;
        }
    }

    this.hasEaten = function(food){
        if(this.x === food.x && this.y === food.y){
            this.total++;
            score += 10;
            return true;
        }
        return false;
    }

    this.isAlive = function(){
        for(let i = 0; i < this.tail.length; i++){
            if(this.x === this.tail[i].x && this.y === this.tail[i].y){
                return false;
            }
        }
        return true;
    }

}

//######################## Food constructor function ###########################

function Food(){
    this.x;
    this.y;

    this.draw = function(){
        ctx.fillStyle = "#ffd369";
        ctx.fillRect(this.x, this.y, 10, 10);
    }
    
    this.pickLocation = function(){
        this.x = Math.floor(Math.random() * 40) * 10;
        this.y = Math.floor(Math.random() * 40) * 10; 
    }
}

//##############################################################################

function startGame(){
    food.pickLocation();

    function stopGame(){
        //console.log("frame generation stopped");
        
        clearInterval(startInterval);
        let finalScore = document.querySelector(".score");
        finalScore.setAttribute("style", "z-index:1");
        finalScore.innerHTML = "Score : " + score;
        let restartButton = document.querySelector(".restart");
        restartButton.setAttribute("style", "z-index:1");
        canvas.setAttribute("style", "opacity:0.2");
    }

    var startInterval = setInterval(function(){
        //console.log("frame generated");
        
        if(snake.isAlive()){
            if(snake.hasEaten(food)){
                food.pickLocation();
            }
            if(snake.x + 10 > 400 || snake.x < 0 || snake.y + 10 > 400 || snake.y < 0){
                stopGame();
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            snake.update();
            food.draw();
            snake.draw();
        } else {
            stopGame();
        }
    },100);

    document.addEventListener("keydown", function(event){
        snake.changeDirection(event.key);
        buttonAnimation(event.key);
    })

    var controlButtons = document.querySelectorAll(".move-btn");
    for(let i=0; i<controlButtons.length; i++){
        controlButtons[i].addEventListener("click", function(event){
            const butttonDirection = event.path[0].attributes.class.ownerElement.classList[1];
            snake.changeDirection(butttonDirection);
            buttonAnimation(butttonDirection);
        })
    }

    function buttonAnimation(currentButton){
        let selectedButton = document.querySelector("."+currentButton);
        selectedButton.classList.add("pressed");
        setTimeout(() => selectedButton.classList.remove("pressed"), 100);
    }
}

window.onload = startGame;


