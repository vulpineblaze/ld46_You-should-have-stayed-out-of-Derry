if(LD === undefined) {
  var LD = {};
}

LD.Player = {

	// unchangle properties go here
	maxHP: 9,
    followerOffset: {x:-42,y:-38},

    attackDamage: 1,      // good for prod

    bladeMaxTotal: 20,

    bladeTTL: 500,   //   good for prod

    lastFired: 0,

    bladeRotation: {L:3.14, R:0, D:1.57, U:4.71 },

    tonguePos: {x:70,y:50},
    tongues: [{mt:""}],
    currentTongues: 0,

    activeUpgrades: [],
    upgradeList: [
        {name:"qmark", frame:{x:23,y:32},
            offset: {x:-42,y:-38},
            scale: 1,
            animEnd:2,desc:"",
            type:"follower", 
            grantMsg: " . . thi nk  . . les s  . .  stab  . . mo ar . .",
            stat: {bladeJitter:30}
        },
        {name:"donaldhat", frame:{x:97,y:185},
            offset: {x:-5,y:10},
            scale: 1,
            animEnd:3,desc:"",
            type:"hat", 
            grantMsg: " . . ke ep y ou s af e . . ",
            stat: {hitImmuneTime:700, scale:0.9}
        },
        {name:"faceblood", frame:{x:97,y:185},
            offset: {x:-5,y:-5},
            scale: 1,
            animEnd:3,desc:"",
            type:"hat", 
            grantMsg: " . .  k i l l  e m . . f a s t er . . ."
                +"\n\t\t\t\t . .  k i l l  e m . . f a s t er . . ."
                +"\n\t\t\t\t \t\t\t\t \t\t\t\t  . .  k i l l  e m . . f a s t er . . .",
            stat: {bladeMaxVel:800, fireDelay: 400}
        },
        {name:"papersailboat", frame:{x:97,y:185},
            offset: {x:-5,y:5},
            scale: 1,
            animEnd:3,desc:"",
            type:"hat", 
            grantMsg: "c - c - c - c - came from one of the losers \n\n\t\t\t\t\t\t\t you'll have farther range . . ",
            stat: {bladeTTL:900}
        },
        {name:"balloon", frame:{x:32,y:64},
            offset: {x:-62,y:-30},
            scale: 1,
            animEnd:3,desc:"",
            type:"follower", 
            grantMsg: " . . w ee . . a ll . . . fLO A T . . ",
            stat: {scale: 1.2}
        },
        {name:"spider", frame:{x:136,y:204},
            offset: {x:-62,y:20},
            scale: 0.5,
            animEnd:3,desc:"",
            type:"follower", 
            grantMsg: " . . . iv sent you a guide \n\t\t\t . . you'll be faster . . . \n \t\t\t\t\t\t\t\t header to h  i t",
            stat: {maxVel:220, scale: 0.7}
        },
        {name:"blade", frame:{x:0,y:0},
            offset: {x:-0,y:0},
            scale: 1,
            animEnd:0,desc:"",
            type:"weapon", 
            grantMsg: " . . .he re s  y our f ath er s ... \n\t\t\t . . bl a de . . .",
            stat: {weapon: "blade"}
        },
        {name:"bible", frame:{x:0,y:0},
            offset: {x:0,y:0},
            scale: 1,
            animEnd:0,desc:"",
            type:"weapon", 
            grantMsg: " . .  . .   . .     .    . ",
            stat: {weapon: "bible", fireDelay: 600}
        },
        {name:"rock", frame:{x:0,y:0},
            offset: {x:0,y:0},
            scale: 0.8,
            animEnd:0,desc:"",
            type:"weapon", 
            grantMsg: " . . . tas te  of   th ei r  own  . . .   med i cin e",
            stat: {weapon: "rock", bladeMaxVel: 500}
        }
    ],
    activeStats: {},
    baseStats: {
        bladeJitter: 50,
        bladeTTL: 500,
        bladeMaxVel: 600,
        hitImmuneTime: 500,
        maxVel: 180,
        fireDelay: 500,
        scale: 0.8,
        weapon: "blade"
    },


    refresh: function (cont=false){
        // refresh every game propeties goes here
        LD.Player.score = 0;
        LD.Player.vel = {x:0,y:0};
        LD.Player.tongues = [{mt:""}];
        LD.Player.currentTongues = 0;
        if(!cont){
           LD.Player.refreshNotCont(); 
        }
    },
    refreshNotCont: function (){
        // refresh every game propeties goes here
        // // console.log("refreshNotCont");
        LD.Player.currentHP = LD.Player.maxHP;
        LD.Player.activeStats = LD.Player.baseStats;
        LD.Player.activeUpgrades = [];
    },

	createPlayer: function(cont=false, upgName=0){
		thisGame = LD.Globals.game;
		LD.Player.refresh(cont);

        LD.Player.player = thisGame.physics.add.sprite(94, 168, 'bowers');
        
        LD.Player.upgradeList.forEach(upgrade => {
            // // console.log("loaded upgrade:", upgrade);
            if(upgrade.frame.x > 0){
                LD.Player[upgrade.name] = thisGame.physics.add.sprite(
                    upgrade.frame.x, 
                    upgrade.frame.y, 
                    upgrade.name);
                thisGame.anims.create({
                    key: upgrade.name+'_anim',
                    frames: thisGame.anims.generateFrameNumbers(upgrade.name, {  start: upgrade.animEnd, end: 0 }),
                    frameRate: 15,
                    yoyo: true,
                    repeat: -1
                });
            }
            
            
            var active = LD.Player.activeUpgrades.filter(l => {
              return l.name === upgrade.name;
            })[0];

            if(upgrade.type == "weapon"){

            }else{
                if(active && active.name){
                    LD.Player[upgrade.name].setActive(true).setVisible(true).setScale(upgrade.scale);
                    if(upgrade.name.x > 0 && LD.Player[upgrade.name].anims){
                        LD.Player[upgrade.name].anims.play(upgrade.name+'_anim', true);
                    }
                }else{
                    // // console.log("doesnt own:", upgrade.name, active, LD.Player.activeUpgrades);
                    LD.Player[upgrade.name].setActive(false).setVisible(false).setScale(upgrade.scale);
                    if(upgrade.name.x > 0 && LD.Player[upgrade.name].anims){
                        LD.Player[upgrade.name].anims.stop();
                    }
                }
            }
            
        });
        LD.Player.refreshStats();

      
        LD.Player.player.setCollideWorldBounds(true);
        LD.Player.player.setSize(70,130).setOffset(10,15);
        LD.Player.player.setScale(0.8);

        const start = LD.Levels.level.brickSize;    
        const bounds = LD.Levels.level.bounds;    

        thisGame.cameras.main.setBounds(-start, -start,
                            bounds.x, 
                            bounds.y);
        thisGame.cameras.main.startFollow(LD.Player.player);

        var animKeys = ["bowers"];
        animKeys.forEach(LD.Player.buildAnims);


        thisGame.anims.create({
            key: 'tongue_anim',
            frames: thisGame.anims.generateFrameNumbers('tongue', {  start: 2, end: 0 }),
            frameRate: 15,
            yoyo: true,
            repeat: -1
        });

        var i=1;
        var tPos = LD.Player.tonguePos;
        for(i=1;i<=LD.Player.maxHP;i++){
            var tongue = thisGame.physics.add.sprite(tPos.x*i, tPos.y, 'tongue');
            tongue.anims.play('tongue_anim', true);
            tongue.setScrollFactor(0);
            tongue.setImmovable();
            tongue.setZ(5);
            LD.Player.tongues.push(tongue);

        }


        LD.Player.createBlades();

        if(upgName){
            LD.Player.addUpgrade(upgName);
        }else if(!cont){
            var upg = LD.Globals.randomUpgrade();
            LD.Player.addUpgrade(upg.name);
        }else{
            // // console.log(" not cont create player upgradeslist:", LD.Player.activeUpgrades );
        }
        

		return LD.Player.player;
	},

    createBlades: function(){
        LD.Player.blades = thisGame.physics.add.group({
            defaultKey: LD.Player.activeStats.weapon,
            maxSize: LD.Player.bladeMaxTotal,
            name: LD.Player.activeStats.weapon,
            createCallback: function (child) {

            },
            removeCallback: function (child) {
                // // console.log('Removed', void.name);
            }
        });
        LD.Player.blades.createMultiple({
            visible: false,
            active: false,
            key: LD.Player.blades.defaultKey,
            repeat: LD.Player.blades.maxSize - 1
        });
    },


	updatePlayer: function(time, delta){

        var cursors = LD.Globals.cursors;
        var myKeys = LD.Globals.myKeys;
        var player = LD.Player.player;
        // var qmark = LD.Player.qmark;
        var blades = LD.Player.blades;
        var tongues = LD.Player.tongues;
        var level = LD.Levels.level;
        var brickSize = LD.Levels.brickSize;


        if (LD.Globals.gameOver)
        {
            return;
        }

        player.setVelocity(0);
        LD.Player.vel.x = 0;
        LD.Player.vel.y = 0;
        player.resetFlip();
        // // console.log(player.anims.currentAnim);
        if(player.anims.currentAnim
            || (LD.Player.vel.x == 0 && LD.Player.vel.y == 0)
            ){
            LD.Player.setAnimOfBoth('stopped', true);
        }

        


        //   MOVE
        if (myKeys.A.isDown)
        {
            LD.Player.vel.x = -LD.Player.activeStats.maxVel;
            player.setVelocityX(-LD.Player.activeStats.maxVel);
            player.setFlip(true);
            LD.Player.setAnimOfBoth('left');
        }
        else if (myKeys.D.isDown)
        {
            LD.Player.vel.x = LD.Player.activeStats.maxVel;
            player.setVelocityX(LD.Player.activeStats.maxVel);

            LD.Player.setAnimOfBoth('right');

        }
        if (myKeys.W.isDown)
        {
            LD.Player.vel.y = -LD.Player.activeStats.maxVel;
            player.setVelocityY(-LD.Player.activeStats.maxVel);
            LD.Player.setAnimOfBoth('up');
        }
        else if (myKeys.S.isDown) 
        {
            LD.Player.vel.y = LD.Player.activeStats.maxVel;
            player.setVelocityY(LD.Player.activeStats.maxVel);
            LD.Player.setAnimOfBoth('down');
        } 


        //  SHOOT
        //  rads //  L:3.14 R:0 U:1.57 D:4.71 
        var bMaxVel = LD.Player.activeStats.bladeMaxVel;    
        var bJitter = LD.Globals.randomNumber(-LD.Player.activeStats.bladeJitter,LD.Player.activeStats.bladeJitter);
        var rotation = LD.Player.bladeRotation;    
        if (cursors.left.isDown )
        {
            LD.Player.activateBullet({x:-bMaxVel,y:bJitter},rotation.L,time, delta);
        }
        else if (cursors.right.isDown)
        {
            LD.Player.activateBullet({x:bMaxVel,y:bJitter},rotation.R,time, delta);
        }
        if (cursors.up.isDown)
        {
            LD.Player.activateBullet({x:bJitter,y:-bMaxVel},rotation.U,time, delta);
        }
        else if (cursors.down.isDown) 
        {
            LD.Player.activateBullet({x:bJitter,y:bMaxVel},rotation.D,time, delta);
        } 
      
        

        // sword.setPosition(player.x + swordLR,
        //                     player.y + LD.Player.swordOffset.yR);

        blades.children.iterate(function (child) {
            if(child.active){
                if(child.aliveTime < time){
                    blades.killAndHide(child);
                }
            }
        });

        // // console.log("player update", player);
        LD.Globals.outOfBoundsFixer(player);

        if(LD.Player.currentTongues != LD.Player.currentHP){
            // // console.log("change in life!:",LD.Player.currentTongues, LD.Player.currentHP);
            LD.Player.currentTongues = LD.Player.currentHP;
            var i=1;
            for(i=1;i<LD.Player.maxHP+1;i++){
                if(i<=LD.Player.currentHP){
                    LD.Player.toggleTongue(i,"on");
                }else{
                    LD.Player.toggleTongue(i,"off");
                }
            }
        }

        LD.Player.activeUpgrades.forEach(upgrade => {
            var upg = LD.Player[upgrade.name];
            var offset = upgrade.offset;
            if(upgrade.frame.x > 0){
                upg.setPosition(player.x + offset.x,
                            player.y + offset.y);
            }
            

        });

		return player;
	},



    buildAnims: function (item, index) {
        thisGame.anims.create({
            key: item+'left',
            frames: thisGame.anims.generateFrameNumbers(item, { start: 3, end: 0 }),
            frameRate: 10
            // repeat: -1
        });
        thisGame.anims.create({
            key: item+'down',
            frames: thisGame.anims.generateFrameNumbers(item, {  start: 3, end: 0 }),
            frameRate: 10
            // repeat: -1
        });
        thisGame.anims.create({
            key: item+'right',
            frames: thisGame.anims.generateFrameNumbers(item, { start: 3, end: 0 }),
            frameRate: 10
            // repeat: -1
        });
        thisGame.anims.create({
            key: item+'up',
            frames: thisGame.anims.generateFrameNumbers("bowers", {
                start: 7, end: 4}),
            frameRate: 10
            // repeat: -1
        });

        // thisGame.anims.create({
        //     key: item+'stopped',
        //     frames: [ { key: item, frame: 0 } ],
        //     frameRate: 1
        // });
    },


    setAnimOfBoth: function (anim, doStop=false){
        if(doStop){
            // // console.log("stop anim bowers    ");
            LD.Player.player.anims.stopOnRepeat();
        }else{
            LD.Player.player.anims.play('bowers'+anim, true);
        }
    },

    toggleTongue: function(index, setTo=""){
        var tongue = LD.Player.tongues[index];
        if(tongue){
            // // console.log("tongue toggle:", tongue, index);
            if(setTo == "on"){
                tongue
                .setActive(true)
                .setVisible(true);
                if(tongue.anims){tongue.anims.play('tongue_anim', true);}
            }else if(setTo == "off"){
                tongue
                .setActive(false)
                .setVisible(false);
                if(tongue.anims){tongue.anims.stop();}
            }else{

            }
        }
        
    },

    addUpgrade: function(name){
        var upgObj = LD.Player.upgradeList.filter(l => {
          return l.name === name;
        })[0];

        var notWep = true;
        if(upgObj.type == "weapon"){notWep = false;}

        var toss = {};
        LD.Player.activeUpgrades.forEach(upgrade => {
            // var upg = LD.Player[upgrade.name];
            if(!toss.name && upgrade.type == upgObj.type){
                toss = upgrade;
            }
            if(upgrade.name == upgObj.name){
                return;
            }
        });

        // // console.log("addUpgrade:", name, notWep, upgObj, toss);
        if(notWep){
            if(toss && toss.name){
                LD.Player[toss.name]
                .setActive(false)
                .setVisible(false);
                if(LD.Player[toss.name].anims){LD.Player[toss.name].anims.stop();}
                var filtered = LD.Player.activeUpgrades.filter(function(el) { return el.name != toss.name; }); 
                LD.Player.activeUpgrades = filtered;
            }
            LD.Player[upgObj.name]
            .setActive(true)
            .setVisible(true);
            if(LD.Player[upgObj.name].anims){
                LD.Player[upgObj.name].anims.play(upgObj.name+'_anim', true);
            }
        }
        
        LD.Player.activeUpgrades.push(upgObj);
        LD.Player.refreshStats();

    },

    refreshStats: function(){
        var base = LD.Player.baseStats;
        var stats = LD.Player.activeStats;
        stats = base;
        var hasWep = false;
        LD.Player.activeUpgrades.forEach(upgrade => {
            if(upgrade.stat.bladeJitter){stats.bladeJitter = upgrade.stat.bladeJitter;}
            if(upgrade.stat.bladeTTL){stats.bladeTTL = upgrade.stat.bladeTTL;}
            if(upgrade.stat.bladeMaxVel){stats.bladeMaxVel = upgrade.stat.bladeMaxVel;}
            if(upgrade.stat.hitImmuneTime){stats.hitImmuneTime = upgrade.stat.hitImmuneTime;}
            if(upgrade.stat.maxVel){stats.maxVel = upgrade.stat.maxVel;}
            if(upgrade.stat.fireDelay){stats.fireDelay = upgrade.stat.fireDelay;}
            if(upgrade.stat.scale){stats.scale = upgrade.stat.scale;}
            if(upgrade.stat.weapon){
                stats.weapon = upgrade.stat.weapon;
                hasWep = true;
            }
        });
        LD.Player.activeStats = stats;
        // console.log("refreshed stats!:", stats);
        if(hasWep){
            LD.Player.createBlades();
        }
    },

    activateBullet: function (vel, rotation, time, delta) {



        var child = LD.Player.blades.get(LD.Globals.horzCenter, LD.Globals.vertOneThird);

        if (!child || LD.Player.lastFired > time) return; // None free

        LD.Player.lastFired = time + LD.Player.activeStats.fireDelay;

        child
        .setActive(true)
        .setVisible(true)
        // .setTint(Phaser.Display.Color.RGBToString(LD.Globals.randomNumber(50,255), 255 , 255 ))
        // .setTint(Phaser.Display.Color.RandomRGB().color)
        .setScale(0.8)
        .setImmovable()
        .clearTint();
        // .play('blade_shoot');

        child.name = LD.Player.activeStats.weapon;
        child.aliveTime = time + LD.Player.activeStats.bladeTTL;


        var player = LD.Player.player;
        var pVel =  LD.Player.vel; 
        // // console.log("blade vel check:", pVel, vel, player);
        // var mult =  LD.Player.voidMultFactor; 
        // var mult =  1; 

        child.setPosition(player.x, player.y);
        child.setVelocity(pVel.x+vel.x,pVel.y+vel.y);
        child.setRotation(rotation);

        LD.Sounds.myPlay('wrong');
    }

	

	

};