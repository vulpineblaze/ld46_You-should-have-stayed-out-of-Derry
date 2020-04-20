if(LD === undefined) { 
  var LD = {};
}

LD.Globals = {
	game: 0,

	gameWidth: 800,
	gameHeight: 600,

	deadlockTimeDelay: 900,

	colors: {
		jeangrey: "#abbcb4",
		blood: "#8a0303",
		bloodlite: "#CA2323"
	},

	randomNumber: function (min, max) {  
	    var min = Math.ceil(min); 
	    var max = Math.floor(max); 
	    return Math.floor(Math.random() * (max - min + 1)) + min; 
	}, 

	randomFloat: function (min, max) {
        return Math.random() * (max - min) + min;
	},

    randomSpawn: function(x=0, y=0){
        var spawn = {x:0,y:0};
        spawn.x = LD.Globals.randomNumber(x,LD.Levels.level.bounds.x*0.9);
        spawn.y = LD.Globals.randomNumber(y,LD.Levels.level.bounds.y*0.9);
        return spawn;
    },

    randomLoser: function(){
    	var list = LD.Losers.loserList;
    	var dead = LD.Losers.deadLosers;
    	
    	// var myLoser = "";
    	while (true) {
			var index = LD.Globals.randomNumber(0,list.length-1);
			var testLoser = list[index];
			// console.log("random loser:",testLoser,index,list.length,dead.length);
			if(!dead.includes(testLoser.name)){
				return testLoser.name;
			}
		}
    },

    randomUpgrade: function(){
        var list = LD.Player.upgradeList;
        var index = LD.Globals.randomNumber(0,list.length-1);
        var upg = LD.Player.upgradeList[index];

        // console.log("random upgrade:",list.length, LD.Player.activeUpgrades.length, upg);

        if(list.length == LD.Player.activeUpgrades.length){return upg;}
        LD.Player.activeUpgrades.forEach(u => {
            if(upg.name == u.name){
                return LD.Globals.randomUpgrade();
            }
        });
        // console.log("delivering random upgrade:", upg);
        return upg;
    },

    checkWin: function(){
    	if(LD.Losers.deadLosers.length == LD.Losers.loserList.length){
    		return true;
    	}else{
    		return false;
    	}
    },

    outOfBoundsFixer: function(sprite){
        var bounds = LD.Levels.level.bounds;
        var brickSize = LD.Levels.brickSize;

    	if(sprite.x < brickSize){
            sprite.setX(brickSize);
        }
        if(sprite.y < brickSize){
            sprite.setY(brickSize);
        }
        
        if(sprite.x > bounds.x-brickSize){
            sprite.setX(bounds.x-brickSize);
        }
        if(sprite.y > bounds.y-brickSize){
            sprite.setY(bounds.y-brickSize);
        }
    }



    


};




LD.Globals.squarePxHalf = LD.Globals.squarePx/2;

LD.Globals.horizontalOffset = LD.Globals.squarePxHalf 
				+ (LD.Globals.gameWidth - (LD.Globals.squarePx * LD.Globals.squareWidth))/2;

// finds the number of px on each side of play area, sans alloted openspace at top
LD.Globals.verticalOffset = LD.Globals.squarePxHalf 
				+ ((LD.Globals.gameHeight - LD.Globals.verticalOpenSpace) 
				- (LD.Globals.squarePx * LD.Globals.squareHeight))/2;

LD.Globals.verticalOffsetTop = LD.Globals.verticalOpenSpace + LD.Globals.verticalOffset;

LD.Globals.vertOneThird = LD.Globals.gameHeight / 3;	
LD.Globals.horzCenter = LD.Globals.gameWidth / 2;	



