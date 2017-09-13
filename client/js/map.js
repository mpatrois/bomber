function Map(size) {    
    
    var height    = null, 
        width     = null, 
        blockSize = Pacman.BLOCK_SIZE,
        map       = MAP_ORIGINAL.slice(0);

    // this.map = map;
    
    function withinBounds(y, x) {
        return y >= 0 && y < height && x >= 0 && x < width;
    }
    
    function isWallSpace(pos) {
        return withinBounds(pos.y, pos.x) && ( map[pos.y][pos.x] === Pacman.WALL || map[pos.y][pos.x] === Pacman.BRICK ) ;
    }

    function isWall(x,y) {
        return withinBounds(y, x) && ( map[y][x] === Pacman.WALL ) ;
    }
    
    function isFloorSpace(pos) {
        if (!withinBounds(pos.y, pos.x)) {
            return false;
        }
        var peice = map[pos.y][pos.x];
        return peice === Pacman.EMPTY; 
            
    }
    
    function reset() {
        map = MAP_ORIGINAL.slice(0);    
        height = map.length;
        width  = map[0].length;        
    };

    function block(pos) {
        return map[pos.y][pos.x];
    };
    
    function setBlock(pos, type) {
        map[pos.y][pos.x] = type;
    };

    
    function draw(ctx) {
        
        var i, j;
        
        for (i = 0; i < height; i += 1) {
		    for (j = 0; j < width; j += 1) {
			    drawBlock(i, j, ctx);
		    }
	    }
    };
    
    function drawBlock(y, x, ctx) {

        var layout = map[y][x];

        if (layout === Pacman.PILL) {
            return;
        }

        ctx.beginPath();
        
        if (layout === Pacman.EMPTY) {
            ctx.fillStyle = "white";
        } else if (layout === Pacman.WALL) {
            ctx.fillStyle = "black";
        } else if (layout === Pacman.BRICK) {
            ctx.fillStyle = "brown";
        }

         ctx.fillRect((x * blockSize), (y * blockSize),  blockSize, blockSize); 
    };

    reset();
    
    return {
        "draw"         : draw,
        "drawBlock"    : drawBlock,
        "block"        : block,
        "setBlock"     : setBlock,
        "reset"        : reset,
        "isWallSpace"  : isWallSpace,
        "isWall"       : isWall,
        "isFloorSpace" : isFloorSpace,
        "height"       : height,
        "width"        : width,
        "height"       : height,
        "blockSize"    : blockSize,
        "map"    : map,
        "withinBounds" : withinBounds
    };
};