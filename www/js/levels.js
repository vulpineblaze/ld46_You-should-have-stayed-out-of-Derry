if(LD === undefined) { 
  var LD = {};
}

LD.Levels = {

    level: {
        max: {x:20, y:15},
        addl: {x:70,y:20}
    },
    brickSize: 30,
    maxNumberBricks: 400,
    bgScaler: 0.96, 


	preload: function (thisGame){

	},

	create: function (thisGame){

        const max = {
            x: LD.Levels.level.max.x + LD.Globals.randomNumber(0,LD.Levels.level.addl.x),
            y: LD.Levels.level.max.y + LD.Globals.randomNumber(0,LD.Levels.level.addl.y)
        };


        const brickSize = LD.Levels.brickSize;
        const bgScaler = LD.Levels.bgScaler;
        const brickRatio = 128 / brickSize;    

        LD.Levels.level.bg = thisGame.physics.add.sprite(0, 0, 'level');
        var bg = LD.Levels.level.bg;
        // LD.Player.player.setScale(0.5,0.5);

        var scale = {
            x: (max.x * brickSize * bgScaler) / 128,
            y: (max.y * brickSize * bgScaler) / 128
        };
        // var scale = {
        //     x: max.x / brickRatio * bgScaler,
        //     y: max.y / brickRatio * bgScaler
        // };
        var bgPos = {
            x: max.x * brickSize * 0.5 ,
            y: max.y * brickSize * 0.5
        };
        // bg.setPosition(bgPos.x,bgPos.y);
        bg.setPosition(-brickSize * 0.5,-brickSize * 0.5);
        bg.setOrigin(0,0);
        bg.setScale(scale.x,scale.y);
        // bg.setZ(-5);

		LD.Levels.level.bounds = {
            x: max.x * LD.Levels.brickSize ,
            y: max.y * LD.Levels.brickSize
        };

        LD.Levels.level.thewell = thisGame.physics.add.sprite(bgPos.x, bgPos.y, 'thewell');
        var thewell = LD.Levels.level.thewell;
        thewell
            .setActive(false)
            .setVisible(false)
            .setImmovable();


        LD.Levels.level.bricks = thisGame.physics.add.group({
            key: 'brick',
            repeat: LD.Levels.maxNumberBricks
            // setXY: { x: 10, y: 5, stepX: 70 }
        });

        var x = 0;
        var y = 0;
        var brickState = "top";
        LD.Levels.level.bricks.children.iterate(function (child) {
            var pos = {x:0,y:0};
            if(brickState == "top"){
                pos.x = x * brickSize;
                if(x == max.x){brickState = "right" }
                else{x += 1;}    
            }else if(brickState == "right"){
                pos.x = x * brickSize;
                pos.y = y * brickSize;
                if(y == max.y){brickState = "down" }
                else{y += 1;} 
            }else if(brickState == "down"){
                pos.x = x * brickSize;
                pos.y = y * brickSize;
                if(x == 0){brickState = "left" }
                else{x -= 1;} 
            }else if(brickState == "left"){
                pos.x = x * brickSize;
                pos.y = y * brickSize;
                if(y == 0){brickState = "done" }
                else{y -= 1;} 
            }      

            if(brickState == "done"){
                child.setActive(false).setVisible(false).setImmovable();
            }else{
                // // console.log("made brick:", pos);
                child.setPosition(pos.x,pos.y);
                child.setName("brick");
                child.setImmovable();
                // child.setZ(-5);
                child.setCollideWorldBounds(true);
                child.setBounce(true);
                child.body.enable = true;

            }

        });


        return LD.Levels.level;    
	}
};


