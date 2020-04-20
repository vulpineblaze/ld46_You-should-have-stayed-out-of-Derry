if(LD === undefined) {
  var LD = {};
}

LD.Losers = {

	// unchangle properties go here

    lineDelay: 500,

    attackThreshold: 100,
    attackDamage: 0.2,
    losersMaxTotal: 10,

    loserList: [
            {name:"ben", frame:{x:98,y:153},desc:"",
                kill:"now imma cut my name in him",
                killedBy:"",
                stat: {rockDelay:900, rockVel: 300}
            },
            {name:"bev", frame:{x:95,y:147},desc:"",
                kill:"that was easy",
                killedBy:"",
                stat: {rockVel: 600}
            },
            {name:"bill", frame:{x:94,y:151},desc:"",
                kill:"f-f-f-fgot him",
                killedBy:"",
                stat: {doubles: true, rockDelay: 1800}
            },
            {name:"eddie", frame:{x:92,y:160},desc:"",
                kill:"i broke more than his arm this time",
                killedBy:"",
                stat: {losersMax: 9}
            },
            {name:"mike", frame:{x:80,y:168},desc:"",
                kill:"maybe now you can see your parents",
                killedBy:"",
                stat: {HP: 10}
            },
            {name:"richie", frame:{x:88,y:140},desc:"",
                kill:"finally shut him up",
                killedBy:"",
                stat: {maxVel: 220}
            },
            {name:"stan", frame:{x:92,y:151},desc:"",
                kill:"needs more snow",
                killedBy:"",
                stat: {immuneTimeMult: 2.0}
            }
        ],

    activeLoser: "",
    activeLoserObj: {},
    activeStats: {},
    baseStats: {
        HP: 5,
        rockVel: 380,
        rockDelay: 1200,
        maxVel: 120,
        losersMax: 2,
        immuneTimeMult: 1.2,
        doubles: false
    },
    flashDelay: 200,
    deadLosers: [],



	refresh: function (){
		// refresh every game propeties goes here
        LD.Losers.losersSpawned = 0;
        // LD.Losers.activeStats = {};
        //  = ;
        Object.assign(LD.Losers.activeStats, LD.Losers.baseStats);
	},

	createLosers: function(name="bev"){
		thisGame = LD.Globals.game;
		LD.Losers.refresh();

        var losers = LD.Losers.buildLoser(name);

        

        LD.Losers.timedEvent = thisGame.time.addEvent({ delay: LD.Losers.lineDelay, 
                                                callback: LD.Losers.timerEventBaddieMove, 
                                                callbackScope: thisGame, 
                                                loop: true });

        LD.Losers.timedRockEvent = thisGame.time.addEvent({ delay: LD.Losers.activeStats.rockDelay, 
                                                callback: LD.Losers.timerEventRock, 
                                                callbackScope: thisGame, 
                                                loop: true });

        LD.Losers.rocks = thisGame.physics.add.group({
            defaultKey: 'rock',
            maxSize: LD.Losers.rockMaxTotal,
            name: "rock",
            createCallback: function (child) {
                // child.setName('void');
                // child.sprite = thisGame.physics.add.sprite(0, 0, 'void');
                child.setCollideWorldBounds(true);
                child.body.onWorldBounds = true;

                child.body.world.on('worldbounds', function(body) {
                  // Check if the body's game object is the sprite you are listening for
                  if (body.gameObject === this) {
                    // Stop physics and render updates for this object
                    this.setActive(false);
                    this.setVisible(false);
                    // console.log("collide world bounds", child.name);
                  }
                }, child);
                // child.publicName = LD.Bullets.publicName;
                // // console.log('Created', void.name);
            },
            removeCallback: function (child) {
                // // console.log('Removed', void.name);
            }
        });
        LD.Losers.rocks.createMultiple({
            visible: false,
            active: false,
            key: LD.Losers.rocks.defaultKey,
            repeat: LD.Losers.rocks.maxSize - 1
        });



        var spawn = LD.Globals.randomSpawn(300,200);
        LD.Losers.activateChild(spawn.x,spawn.y);
        // console.log("losers spawn val:", spawn);
		return losers;
	},

    buildLoser: function(name='eddie'){
        var groupName = name+"s";
        LD.Losers.activeLoser = name;
        var loserObj = LD.Losers.loserList.filter(l => {
          return l.name === name;
        })[0];
        LD.Losers.activeLoserObj = loserObj;
        var lSize = {x:loserObj.frame.x*0.8,y:loserObj.frame.y*0.8};
        var lOffset = {x:lSize.x*0.3,y:lSize.y*0.3};

        if(loserObj.stat.HP){LD.Losers.activeStats.HP = loserObj.stat.HP;}
        if(loserObj.stat.rockVel){LD.Losers.activeStats.rockVel = loserObj.stat.rockVel;}
        if(loserObj.stat.rockDelay){LD.Losers.activeStats.rockDelay = loserObj.stat.rockDelay;}
        if(loserObj.stat.maxVel){LD.Losers.activeStats.maxVel = loserObj.stat.maxVel;}
        if(loserObj.stat.losersMax){LD.Losers.activeStats.losersMax = loserObj.stat.losersMax;}
        if(loserObj.stat.immuneTimeMult){LD.Losers.activeStats.immuneTimeMult = loserObj.stat.immuneTimeMult;}
        if(loserObj.stat.doubles){LD.Losers.activeStats.doubles = loserObj.stat.doubles;}
        if(loserObj.stat.HP){LD.Losers.activeStats.HP = loserObj.stat.HP;}

        // console.log("found 'this' loser?", name, loserObj);

        LD.Losers[groupName] = thisGame.physics.add.group({
            defaultKey: name,
            maxSize: LD.Losers.activeStats.losersMax,
            name: name,
            createCallback: function (child) {
                child = thisGame.physics.add.sprite(0, 0, name);

                child.setCollideWorldBounds(true);
                child.setBounce(true);
                child.health = LD.Losers.activeStats.HP;
                child.setName(name);

                child.setActive(false);
                child.setVisible(false);
                child.setSize(lSize.x,lSize.y).setOffset(lOffset.x,lOffset.y);

                child.killMsg = loserObj.kill;

                child.body.world.on('worldbounds', function(body) {
                  // Check if the body's game object is the sprite you are listening for
                  if (body.gameObject === this) {
                    // Stop physics and render updates for this object
                    this.setActive(false);
                    this.setVisible(false);
                    // console.log("collide world bounds", child.name);
                  }
                }, child);
            },
            removeCallback: function (child) {
                // // console.log('Removed', void.name);
            }
        });
        LD.Losers[groupName].createMultiple({
            visible: false,
            active: false,
            key: LD.Losers[groupName].defaultKey,
            repeat: LD.Losers[groupName].maxSize - 1
        });


        LD.Losers.buildAnims(name);

        return LD.Losers[groupName];
    },



    timerEventBaddieMove: function(){
        var loser = LD.Losers.activeLoser;
        var groupName = loser+"s";
        LD.Losers[groupName].children.iterate(function (child) {
            if(child.active){
                child.moveVert = LD.Globals.randomNumber(0,2); // 0, U, D
                child.moveHorz = LD.Globals.randomNumber(0,2); // 0, L, R
                // // console.log("where loser?", child);
            }
        });
    }, 

    timerEventRock: function(){
        var loser = LD.Losers.activeLoser;
        var groupName = loser+"s";
        LD.Losers[groupName].children.iterate(function (child) {
            if(child.active){
                LD.Losers.activateBullet(child);
            }
        });
    }, 

	updateLosers: function(time, delta){

        var loser = LD.Losers.activeLoser;
        var groupName = loser+"s";
        var losers = LD.Losers[groupName];
        var player = LD.Player.player;


        losers.children.iterate(function (child) {
            if(child.active){
                child.setVelocity(0);

                if (child.moveHorz == 1)
                {
                    child.setVelocityX(-LD.Losers.activeStats.maxVel);
                    LD.Losers.setAnimOfBoth(child, 'left');
                }
                else if (child.moveHorz == 2)
                {
                    child.setVelocityX(LD.Losers.activeStats.maxVel);
                }

                if (child.moveVert == 1)
                {
                    child.setVelocityY(-LD.Losers.activeStats.maxVel);
                }
                else if (child.moveVert == 2) 
                {
                    child.setVelocityY(LD.Losers.activeStats.maxVel);
                } 


                var diffX = player.x - child.x;
                var diffY = player.y - child.y;
                var trueDistance = Math.sqrt( Math.pow(diffX,2), Math.pow(diffY,2) );
                var absDist = Math.abs(trueDistance);

                if(LD.Losers.attackThreshold > absDist){
                    thisGame.physics.moveToObject(child, LD.Player.player, LD.Losers.activeStats.mavVel);
                }

                LD.Globals.outOfBoundsFixer(child);

            }
        });

        LD.Losers.rocks.children.iterate(function (child) {
            if(child.active){
                child.angle += 1;
            }
        });

  


		return losers;
	},



    buildAnims: function (item, index) {
        thisGame.anims.create({
            key: item+'left',
            frames: thisGame.anims.generateFrameNumbers(item, { start: 3, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        thisGame.anims.create({
            key: item+'down',
            frames: thisGame.anims.generateFrameNumbers(item, {  start: 3, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        thisGame.anims.create({
            key: item+'right',
            frames: thisGame.anims.generateFrameNumbers(item, { start: 3, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        thisGame.anims.create({
            key: item+'up',
            frames: thisGame.anims.generateFrameNumbers(item, {
                start: 3, end: 0}),
            frameRate: 10,
            repeat: -1
        });

        thisGame.anims.create({
            key: item+'stopped',
            frames: [ { key: item, frame: 0 } ],
            frameRate: 1
        });
        // // console.log("losers buildAnims:", item, thisGame.anims);

    },


    setAnimOfBoth: function (child, anim){
        // // console.log("losers set anim:", child, anim);
        child.anims.play(child.name+anim, true);
    },

    activateChild: function (x=0,y=0, name="eddie", hp=0) {
        name = LD.Losers.activeLoser;
        var groupName = name+"s";
        var child = LD.Losers[groupName].get(LD.Globals.horzCenter, LD.Globals.vertOneThird);

        if (!child) return; // None free

        LD.Losers.losersSpawned += 1;

        child
        .setActive(true)
        .setVisible(true)
        // .setTint(Phaser.Display.Color.RGBToString(LD.Globals.randomNumber(50,255), 255 , 255 ))
        // .setTint(Phaser.Display.Color.RandomRGB().color)
        .setScale(0.7)
        .clearTint();

        child.name = name;
        if(hp == 0){
            child.health = LD.Losers.activeStats.HP;
        }else{
            child.health = hp;
        }
        
        child.setCollideWorldBounds(true);
        child.setBounce(true);
        child.body.enable = true;


        var player = LD.Player.player;
        var vel =  LD.Player.vel; 
        child.setPosition(x,y);

        LD.Sounds.myPlay('loserspawn');

        
    },

    activateBullet: function (source) {

        var child = LD.Losers.rocks.get(LD.Globals.horzCenter, LD.Globals.vertOneThird);

        if (!child) return; // None free


        child
        .setActive(true)
        .setVisible(true)
        .setPosition(source.x,source.y)
        .setScale(0.8)
        .clearTint();
        // .play('rock_shoot');

        child.name = "rock";
        // child.aliveTime = time + LD.Losers.rockTTL;


        var player = LD.Player.player;


        thisGame.physics.moveToObject(child, player, LD.Losers.activeStats.rockVel);

        child.deadTimer = thisGame.time.addEvent({ 
            delay: LD.Losers.activeStats.rockDelay*2, 
            callback: function(){
                LD.Losers.rocks.killAndHide(child);
                child.deadTimer.remove();
            }, 
            callbackScope: thisGame, 
            loop: false });

        LD.Sounds.myPlay('rockthrow');
    },

    killLoser: function(child){
        child.setActive(false).setVisible(false);
        child.body.enable = false;
        if(LD.Losers.losersSpawned < LD.Losers.activeStats.losersMax){
            var spawn = LD.Globals.randomSpawn();
            LD.Losers.activateChild(spawn.x,spawn.y);
            if(LD.Losers.activeStats.doubles){
                var dub = LD.Globals.randomSpawn();
                LD.Losers.activateChild(dub.x,dub.y);
            }
        }else{
            LD.Losers.deadLosers.push(child.name);
            LD.Sounds.myPlay('lvlwin');
            thisGame.scene.start('winlose', { id: 2, 
                                            text:  LD.Losers.activeLoserObj.kill ,
                                            loser: child.name,
                                            cont: true,
                                            img: "bg"   });
        }
        
    }

	

	

};