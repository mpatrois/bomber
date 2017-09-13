function Player (map) {
    
    var rx = Math.floor(Math.random() * 10);
    var ry = Math.floor(Math.random() * 10);

    var position  = {"x": rx * Pacman.BLOCK_SIZE, "y": ry * Pacman.BLOCK_SIZE},
        direction = NONE,
        due       = NONE, 
        color     = '#e91e63',
        velocity  = Pacman.BLOCK_SIZE/6;


    function setCase(x,y) {
        position = {"x": x * Pacman.BLOCK_SIZE, "y": y * Pacman.BLOCK_SIZE};
    };

    function setDue(newDue){
    	due = newDue;
    }
        
    function getNewCoord(dir, current) {   
        return {
            "x": current.x + (dir === LEFT && -velocity || dir === RIGHT &&  velocity || 0),
            "y": current.y + (dir === DOWN &&  velocity || dir === UP    && -velocity || 0)
        };
    };

    function onWholeSquare(x) {
        return x % Pacman.BLOCK_SIZE === 0;
    };

    function pointToCoord(x) {
        return Math.round(x/Pacman.BLOCK_SIZE);
    };
    
    function nextSquare(x, dir) {
        var rem = x % Pacman.BLOCK_SIZE;

        if (rem === 0) { 
            return x;
        } else if (dir === RIGHT || dir === DOWN) { 
            return x + (Pacman.BLOCK_SIZE - rem);
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

    //HORIZONTAL ou VERTICAL
    function isOnSamePlane(due, dir) { 
        
        return      ((due === LEFT || due === RIGHT) && (dir === LEFT || dir === RIGHT)) 
      			|| 
            		((due === UP || due === DOWN) && (dir === UP || dir === DOWN));

      
    };

    function move() {
        
        var npos 		= null, 
        	oldPosition = position;
        
        if (due !== direction) {
            npos = getNewCoord(due, position);
            
            if ( isOnSamePlane(due, direction) || ( onGridSquare(position) && map.isFloorSpace(next(npos, due)) ) ) {
                direction = due;
            } else {
                npos = null;
            }
        }

        //restabilise si il n'est pas dans la tranchée
        if (npos === null) {
            npos = getNewCoord(direction, position);
        }
        
        if (onGridSquare(position) && map.isWallSpace(next(npos, direction))) {
            direction = NONE;
        }

        if (direction === NONE) {
            return {"new" : position, "old" : position};
        }
        
        position = npos;
        
                
        return {
            "new" : position,
            "old" : oldPosition
        };
    };

    function draw(ctx,image) { 
        var s = map.blockSize;
        ctx.fillStyle = color;
        ctx.fillRect( (position.x/s) * s,(position.y/s) * s,s,s);
    };


    
    // initUser();

    return {
        "draw"          : draw,
        // "score"         : score,
        "move"          : move,
        "setDue"      : setDue,
        "setCase"      : setCase,
        // "newLevel"      : newLevel,
        // "reset"         : reset,
        // "resetPosition" : resetPosition
    };
};