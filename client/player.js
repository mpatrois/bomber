
function Player(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.size = 20;
    this.color = "black";

    this.move = function(bricks,bombs){

    	if ( this.x + this.size + this.dx > canvas.width || this.x  + this.dx < 0){
            this.dx = 0;
        }
        if ( this.y + this.size + this.dy >= canvas.height || this.y + this.dy < 0){
            this.dy = 0;
        }

        this.x += this.dx;
        this.y += this.dy;

        
    }

    this.draw = function (ctx){
    	ctx.fillStyle = this.color;
    	ctx.fillRect(this.x, this.y, this.size, this.size);
    }


        
    // this.drawPlayer=function() 
    // {
    //     context.beginPath();
    //     context.rect(this.x,this.y, 15, 15);
    //     context.closePath();
    //     context.fillStyle = this.color;
    //     context.fill();
    //     context.font = "18px serif";
    //     context.fillText(this.name, this.x, this.y);
    // }
        
    this.movePlayer=function(){
        // console.log(this.dir);
        if(this.dir!="STOP")
        this.move(this.dir);
    }
        
    this.setDir=function(dir){
        
        if(dir=="UP"){
            this.dy =- 1;
			this.dx = 0;
        }
        else if(dir=="DOWN"){
            this.dy=1;
			this.dx = 0;
        }
        else if(dir=="LEFT"){
           this.dx =- 1;
			this.dy = 0;
        } 
        else if(dir=="RIGHT"){
            this.dx=1;
			this.dy = 0;
        }
    }

    this.dropBomb = function(bombs){
    	bombs.push(new Bombe(this.x,this.y,this.size,2));
    }

}


var Playerf = function (game, map) {
    
    var position  = null,
        direction = null,
        eaten     = null,
        due       = null, 
        lives     = null,
        score     = 5,
        keyMap    = {},
        color     = '#e91e63'
    
    keyMap[KEY.ARROW_LEFT]  = LEFT;
    keyMap[KEY.ARROW_UP]    = UP;
    keyMap[KEY.ARROW_RIGHT] = RIGHT;
    keyMap[KEY.ARROW_DOWN]  = DOWN;

    function addScore(nScore) { 
        score += nScore;
        if (score >= 10000 && score - nScore < 10000) { 
            lives += 1;
        }
    };

    function theScore() { 
        return score;
    };

    function loseLife() { 
        lives -= 1;
    };

    function getLives() {
        return lives;
    };

    function initUser() {
        score = 0;
        lives = 3;
        newLevel();
    }
    
    function newLevel() {
        resetPosition();
        eaten = 0;
    };
    
    function resetPosition() {
        position = {"x": 90, "y": 120};
        direction = LEFT;
        due = LEFT;
    };
    
    function reset() {
        initUser();
        resetPosition();
    };        
    
    function keyDown(e) {
        if (typeof keyMap[e.keyCode] !== "undefined") { 
            due = keyMap[e.keyCode];
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        return true;
	};

    function getNewCoord(dir, current) {   
        return {
            "x": current.x + (dir === LEFT && -2 || dir === RIGHT && 2 || 0),
            "y": current.y + (dir === DOWN && 2 || dir === UP    && -2 || 0)
        };
    };

    function onWholeSquare(x) {
        return x % 10 === 0;
    };

    function pointToCoord(x) {
        return Math.round(x/10);
    };
    
    function nextSquare(x, dir) {
        var rem = x % 10;
        if (rem === 0) { 
            return x; 
        } else if (dir === RIGHT || dir === DOWN) { 
            return x + (10 - rem);
        } else {
            return x - rem;
        }
    };

    function next(pos, dir) {
        return {
            "y" : pointToCoord(nextSquare(pos.y, dir)),
            "x" : pointToCoord(nextSquare(pos.x, dir)),
        };                               
    };

    function onGridSquare(pos) {
        return onWholeSquare(pos.y) && onWholeSquare(pos.x);
    };

    function isOnSamePlane(due, dir) { 
        return ((due === LEFT || due === RIGHT) && 
                (dir === LEFT || dir === RIGHT)) || 
            ((due === UP || due === DOWN) && 
             (dir === UP || dir === DOWN));
    };

    function move(ctx) {
        
        var npos        = null, 
            nextWhole   = null, 
            oldPosition = position,
            block       = null;
        
        if (due !== direction) {
            npos = getNewCoord(due, position);
            
            if (isOnSamePlane(due, direction) || 
                (onGridSquare(position) && 
                 map.isFloorSpace(next(npos, due)))) {
                direction = due;
            } else {
                npos = null;
            }
        }

        if (npos === null) {
            npos = getNewCoord(direction, position);
        }
        
        if (onGridSquare(position) && map.isWallSpace(next(npos, direction))) {
            direction = NONE;
        }

        if (direction === NONE) {
            return {"new" : position, "old" : position};
        }
        
        if (npos.y === 100 && npos.x >= 190 && direction === RIGHT) {
            npos = {"y": 100, "x": -10};
        }
        
        if (npos.y === 100 && npos.x <= -12 && direction === LEFT) {
            npos = {"y": 100, "x": 190};
        }
        
        position = npos;        
        nextWhole = next(position, direction);
        
        block = map.block(nextWhole);        
        
        if ((isMidSquare(position.y) || isMidSquare(position.x)) &&
            block === Pacman.BISCUIT || block === Pacman.PILL) {
            
            map.setBlock(nextWhole, Pacman.EMPTY);           
            addScore((block === Pacman.BISCUIT) ? 10 : 50);
            eaten += 1;
            
            if (eaten === 182) {
                game.completedLevel();
            }
            
            if (block === Pacman.PILL) { 
                game.eatenPill();
            }
        }   
                
        return {
            "new" : position,
            "old" : oldPosition
        };
    };

    function isMidSquare(x) { 
        var rem = x % 10;
        return rem > 3 || rem < 7;
    };

    function calcAngle(dir, pos) { 
        if (dir == RIGHT && (pos.x % 15 < 7)) {
            return {"start":0.25, "end":1.75, "direction": false};
        } else if (dir === DOWN && (pos.y % 15 < 7)) { 
            return {"start":0.75, "end":2.25, "direction": false};
        } else if (dir === UP && (pos.y % 15 < 7)) { 
            return {"start":1.25, "end":1.75, "direction": true};
        } else if (dir === LEFT && (pos.x % 15 < 7)) {             
            return {"start":0.75, "end":1.25, "direction": true};
        }
        return {"start":0, "end":2, "direction": false};
    };

    function drawDead(ctx, amount) { 

        var size = map.blockSize, 
            half = size / 2;

        if (amount >= 1) { 
            return;
        }

        ctx.fillStyle = color;
        ctx.beginPath();        
        ctx.moveTo(((position.x/10) * size) + half, 
                   ((position.y/10) * size) + half);
        
        ctx.arc(((position.x/10) * size) + half, 
                ((position.y/10) * size) + half,
                half, 0, Math.PI * 2 * amount, true); 

        //ctx.drawImage(image.getImage('craby'), 4, 323, 34, 28, ((position.x/10) * size) - 32/4 , ((position.y/10) * size), 32, 21);
        
        ctx.fill();    
    };

    function draw(ctx,image) { 

        var s     = map.blockSize, 
            angle = calcAngle(direction, position);

        ctx.fillStyle = color;

        var crabyRectAnim = {x:154,y:291,w:32,h:22}

        
        console.log(position.x);
        console.log((position.x/10) * s);

        if(angle.start==0.25)
            crabyRectAnim = {x:186,y:291,w:30,h:22}
        else if(angle.start == 0.75 || angle.start == 1.25 )
            crabyRectAnim = {x:216,y:291,w:32,h:22}


        // console.log(position.x);
        // console.log(position.x/10);
        // console.log((position.x/10)*s);


        // ctx.fillRect(((position.x/10) * s) - 32/4 , ((position.y/10) * s), 32, 21);
        // ctx.drawImage(image.getImage('craby'), crabyRectAnim.x, crabyRectAnim.y, crabyRectAnim.w, crabyRectAnim.h, ((position.x/10) * s) - 32/4 , ((position.y/10) * s), 32, 21);

        // console.log(angle);

        //ctx.beginPath();        

        ctx.moveTo(((position.x/10) * s) + s / 2,
                   ((position.y/10) * s) + s / 2);
        
        ctx.arc(((position.x/10) * s) + s / 2,
                ((position.y/10) * s) + s / 2,
                s / 2, 
                Math.PI * angle.start, 
                Math.PI * angle.end, 
                angle.direction); 
        
        



        ctx.fill();



    };


    
    initUser();

    return {
        "draw"          : draw,
        "drawDead"      : drawDead,
        "loseLife"      : loseLife,
        "getLives"      : getLives,
        "score"         : score,
        "addScore"      : addScore,
        "theScore"      : theScore,
        "keyDown"       : keyDown,
        "move"          : move,
        "newLevel"      : newLevel,
        "reset"         : reset,
        "resetPosition" : resetPosition
    };
};