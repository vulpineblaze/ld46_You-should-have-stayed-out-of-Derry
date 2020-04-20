if(LD === undefined) {
  var LD = {};
}

LD.Scenes = {};


LD.Scenes.Intro = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Intro ()
    {
        Phaser.Scene.call(this, { key: 'intro' });
    },

    init: function (data)
    {
        // // console.log('init', data);

        this.imageID = data.id;
        this.imageFile = data.image;

        thisGame = this;
        LD.Globals.game = this;
        // LD.Globals.initKeys(this);
    },

    preload: function ()
    {
        this.load.image('black_center', 'img/bg.png');

        
        LD.Sounds.preload(this);


    },

    create: function ()
    {

        LD.Sounds.create(this);

    	var black_center = this.add.sprite(0,0, 'black_center');
	    black_center.setDisplayOrigin(0);

        LD.Messages.introText = this.add.text(160, 80, 
                                    LD.Messages.introTextMsg , 
                                    { fontFamily: 'Anton', fontSize: '48px', fill: '#fff' });
        LD.Messages.introText.setStroke('#000', 5); 
        LD.Messages.introText.setX( (LD.Globals.gameWidth - LD.Messages.introText.width)/2 ); 

        LD.Globals.cursors = this.input.keyboard.createCursorKeys();

        LD.Globals.myKeys = this.input.keyboard.addKeys(
            {
                W:Phaser.Input.Keyboard.KeyCodes.W,
                S:Phaser.Input.Keyboard.KeyCodes.S,
                A:Phaser.Input.Keyboard.KeyCodes.A,
                D:Phaser.Input.Keyboard.KeyCodes.D
            }
        );





    },

    update: function () {
        var cursors = LD.Globals.cursors;
        var myKeys = LD.Globals.myKeys;

        if(myKeys.W.isDown){
            LD.Sounds.myPlay('emptySound');
            LD.Messages.introText.setText("You pressed W to continue!");
            // console.log("keypress W detected!!");
        }
        if(cursors.up.isDown){
            LD.Sounds.myPlay('emptySound');
            LD.Messages.introText.setText("You pressed UP to continue!");
            // console.log("keypress UP detected!!");
        }

        if(LD.Sounds.emptySound.isPlaying){
            // console.log("intro audio loaded!");
            var deadlockTimer = this.time.delayedCall(LD.Globals.deadlockTimeDelay, 
                                                function(){this.scene.start('intro2')}, 
                                                [], this); 
        }
    }

});



LD.Scenes.Intro2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Intro2 ()
    {
        Phaser.Scene.call(this, { key: 'intro2' });
    },

    init: function (data)
    {
        // // console.log('init', data);

        // this.imageID = data.id;
        // this.imageFile = data.image;

        thisGame = this;
        LD.Globals.game = this;
        // LD.Globals.initKeys(this);
    },

    preload: function ()
    {
        this.load.image('level', 'img/level.png');
    },

    create: function ()
    {


        const max = LD.Levels.level.max;
        const brickSize = LD.Levels.brickSize;
        const bgScaler = LD.Levels.bgScaler;
        const brickRatio = 128 / brickSize;    

        var bg = this.add.sprite(0,0, 'level');

        var scale = {
            x: max.x / brickRatio * bgScaler,
            y: max.y / brickRatio * bgScaler
        };
        var bgPos = {
            x: max.x * brickSize * 0.5 ,
            y: max.y * brickSize * 0.5
        };
        bg.setRotation(1.57);
        bg.setPosition(400,230);
        // bg.setOrigin(bgPos.x,bgPos.y);
        bg.setScale(6.2);
        bg.setTint(0xDD66666);
        // console.log("bg intro2:", bg);

        LD.Messages.introText2 = this.add.text(160, 40, 
                                    LD.Messages.introTextMsg2 , 
                                    LD.Messages.ITConf);
        LD.Messages.introText2.setLineSpacing(15); 
        LD.Messages.introText2.setStroke('#000', 1); 
        LD.Messages.introText2.setX( (LD.Globals.gameWidth - LD.Messages.introText2.width)/2 ); 

        LD.Globals.cursors = this.input.keyboard.createCursorKeys();

        LD.Globals.myKeys = this.input.keyboard.addKeys(
            {
                W:Phaser.Input.Keyboard.KeyCodes.W,
                S:Phaser.Input.Keyboard.KeyCodes.S,
                A:Phaser.Input.Keyboard.KeyCodes.A,
                D:Phaser.Input.Keyboard.KeyCodes.D
            }
        );

    },

    update: function () {
        var cursors = LD.Globals.cursors;
        var myKeys = LD.Globals.myKeys;

        // // console.log("intro2 update keys", myKeys.W.isDown, cursors.up.isDown    );
        if(myKeys.W.isDown){
            LD.Sounds.myPlay('bgMusic');
            // LD.Messages.introText.setText("You pressed W to continue!");
            // console.log("intro2 keypress W detected!!");
        }
        if(cursors.up.isDown){
            LD.Sounds.myPlay('bgMusic');
            // LD.Messages.introText.setText("You pressed UP to continue!");
            // console.log("intro2 keypress UP detected!!");
        }

        if(LD.Sounds.bgMusic.isPlaying){
            // console.log("intro2 audio loaded!");
            var loser = LD.Globals.randomLoser();
            var deadlockTimer = this.time.delayedCall(LD.Globals.deadlockTimeDelay, 
                                                function(){this.scene.start('play', { 
                                                    id: 9, 
                                                    loser: loser}
                                                    )}, 
                                                [], this); 

        }
    }

});













LD.Scenes.WinLose = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function WinLose ()
    {
        Phaser.Scene.call(this, { key: 'winlose' });
    },

    init: function (data)
    {
        this.inText = data.text;
        this.inImg = data.img;
        this.cont = data.cont;
    },

    preload: function ()
    {
	    this.load.image('show_image', 'img/'+this.inImg+'.png');
    },

    create: function ()
    {
        this.startPlay = false;
    	var black_center = this.add.sprite(0,0, 'show_image').setInteractive();
	    black_center.setDisplayOrigin(0); 
        var specificMessage = this.inText;

        if(LD.Globals.checkWin()){
            LD.Sounds.myPlay('finalwin');
            var wonText = this.add.text(LD.Globals.horizontalOffset, 80, 
                LD.Messages.wonTextMsg, 
                { align: 'center', 
                    font: '48px Anton', 
                    fill: '#fff', 
                    wordWrap: {width: LD.Globals.gameWidth - (LD.Globals.horizontalOffset*2)} 
                });
            wonText.setStroke('#000', 5);        
            wonText.setX( (LD.Globals.gameWidth - wonText.width)/2 );

            var winloseText = this.add.text(LD.Globals.horizontalOffset, 120, 
                LD.Messages.winloseTextMsg + "\n" + specificMessage, 
                LD.Messages.bowersConf);
            winloseText.setStroke('#222', 5);        
            winloseText.setX( (LD.Globals.gameWidth - winloseText.width)/2 + 10 ); 

        }else{
            var conf = LD.Messages.ITConf;
            if(this.cont){conf = LD.Messages.bowersConf}
            var winloseText = this.add.text(LD.Globals.horizontalOffset, 80, 
                LD.Messages.winloseTextMsg + "\n" + specificMessage, 
                conf);
            winloseText.setStroke('#222', 5);        
            winloseText.setX( (LD.Globals.gameWidth - winloseText.width)/2 + 10 ); 

            var restartText = this.add.text(60, LD.Globals.vertOneThird*2.5, 
                LD.Messages.restartTextMsg, 
                { align: 'center', font: '48px Anton', fill: '#fff' });
            restartText.setStroke('#000', 5);
            restartText.setX( (LD.Globals.gameWidth - restartText.width)/2 ); 

            LD.Globals.cursors = this.input.keyboard.createCursorKeys();

            LD.Globals.myKeys = this.input.keyboard.addKeys(
                {
                    W:Phaser.Input.Keyboard.KeyCodes.W,
                    S:Phaser.Input.Keyboard.KeyCodes.S,
                    A:Phaser.Input.Keyboard.KeyCodes.A,
                    D:Phaser.Input.Keyboard.KeyCodes.D
                }
            );

            if(this.cont){
                var newUpg = LD.Globals.randomUpgrade();
                this.upgName = newUpg.name;
                upgText = this.add.text(60, LD.Globals.vertOneThird*1.5, 
                                    newUpg.grantMsg , 
                                    LD.Messages.ITConf);
                upgText.setLineSpacing(15); 
                upgText.setStroke('#000', 1); 
            }
        }   

    },

    update: function () {
        var cursors = LD.Globals.cursors;
        var myKeys = LD.Globals.myKeys;

        if(myKeys.W.isDown || cursors.up.isDown){
            LD.Sounds.myPlay('bgMusic');
            this.startPlay = true;
        }

        if(this.startPlay && LD.Sounds.bgMusic.isPlaying){
            // console.log("intro2 audio loaded!");

            var loser = LD.Globals.randomLoser();
            var deadlockTimer = this.time.delayedCall(LD.Globals.deadlockTimeDelay, 
                                                function(){this.scene.start('play', { 
                                                    id: 9, 
                                                    loser: loser,
                                                    upgName: this.upgName,
                                                    cont: this.cont}
                                                    )}, 
                                                [], this); 

        }
    }

});






LD.Scenes.Play = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Play ()
    {
        // // console.log("Play Scene Play()");
        Phaser.Scene.call(this, 'play');
    },

    init: function (data)
    {
        this.inLoser = data.loser;
        this.cont = data.cont;
        this.upgName = data.upgName;
    },

    preload: function ()
    {

 

        this.load.spritesheet('qmark', 'img/qmark2.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('tongue', 'img/tongue.png', { frameWidth: 59, frameHeight: 57 });

        this.load.image('level', 'img/level.png');
        this.load.image('brick', 'img/brick.png');
        // this.load.image('blade', 'img/blade.png');
        // this.load.image('rock', 'img/rock.png');
        this.load.image('thewell', 'img/thewell.png');

        this.load.spritesheet('bowers', 'img/bowers.png', { frameWidth: 94, frameHeight: 168 });



        LD.Losers.loserList.forEach(loser => {
            // // console.log("loaded loser:", loser);
            this.load.spritesheet(loser.name, 
                'img/'+loser.name+'.png', 
                { frameWidth: loser.frame.x, frameHeight: loser.frame.y });
        });

        LD.Player.upgradeList.forEach(upgrade => {
            // // console.log("loaded upgrade:", upgrade);
            if(upgrade.frame.x > 0){
                this.load.spritesheet(upgrade.name, 
                    'img/'+upgrade.name+'.png', 
                    { frameWidth: upgrade.frame.x, frameHeight: upgrade.frame.y });
            }else{
                this.load.image(upgrade.name, 'img/'+upgrade.name+'.png');
            }
            
        });

        

    },

    create: function ()
    {
        // console.log("Play Scene create()");
        thisGame = this;
        LD.Globals.game = this;

        LD.Globals.gameOver = false;
        // LD.Globals.initKeys(this);
        if(!LD.Sounds.bgMusic.isPlaying){LD.Sounds.myPlay('bgMusic');}

        LD.Globals.cursors = this.input.keyboard.createCursorKeys();

        LD.Globals.myKeys = this.input.keyboard.addKeys(
            {
                W:Phaser.Input.Keyboard.KeyCodes.W,
                S:Phaser.Input.Keyboard.KeyCodes.S,
                A:Phaser.Input.Keyboard.KeyCodes.A,
                D:Phaser.Input.Keyboard.KeyCodes.D
            }
        );
       

        

        var level = LD.Levels.create(this);

        

        this.physics.world.setBounds(
            -LD.Levels.brickSize , 
            -LD.Levels.brickSize , 
            level.bounds.x ,
            level.bounds.y , 
            true, true, true, true);
        // console.log("world obj:", LD.Levels.brickSize, level, this.physics.world);

        var player = LD.Player.createPlayer(this.cont, this.upgName);
        var blades = LD.Player.blades;

        var losers = LD.Losers.createLosers(this.inLoser);
        var rocks = LD.Losers.rocks;


        this.physics.add.collider(player, level.bricks);
        this.physics.add.collider(losers, level.bricks);
        this.physics.add.collider(blades, level.bricks);
        this.physics.add.collider(rocks, level.bricks);
        
        this.physics.add.collider(player, losers, this.hitPlayer, null, this);
        this.physics.add.collider(player, rocks, this.hitRock, null, this);

        this.physics.add.collider(blades, losers, this.hitBlade, null, this);

        // this.physics.add.overlap(level.bricks, blades, this.brickBlade, null, this);
        // this.physics.add.overlap(level.bricks, rocks, this.brickRock, null, this);



    },

    update: function (time, delta)
    {

        

        var player = LD.Player.updatePlayer(time, delta);
        var losers = LD.Losers.updateLosers();
        
        // var hpRatio =  LD.Messages.hpBarSize.width * (LD.Player.currentHP / LD.Player.totalHP);
        // LD.Messages.healthBarCurrentRect.setSize(hpRatio,20);

        if(LD.Player.currentHP <= 0){
            // LD.Losers.deadLosers = [];
            LD.Sounds.myPlay('die');

            thisGame.scene.start('winlose', { id: 2, 
                                            text:  LD.Messages.winloseTexts.zeroHP,
                                            loser: LD.Losers.activeLoserObj.name,
                                            cont: false,
                                            img: "bg"   });
        }

        

        losers.children.iterate(function (child) {
            if(child.active){
                if(child.health <= 0){
                    // LD.Losers.activateChild(100,100);
                    // LD.Monsters.activateChild();
                    // child.destroy();
                    LD.Losers.killLoser(child);
                    LD.Sounds.myPlay('loserdie');
                }
            }
        });
    },


   


    hitPlayer: function (player, loser)
    {
        if(player.hitTimer){return;}
        // // console.log("player got hit loser:", player, loser);

        player.setTint(0xff0000);
        LD.Player.currentHP -= 1;
        LD.Sounds.myPlay('collision');
        player.hitTimer = thisGame.time.delayedCall(
                LD.Player.activeStats.hitImmuneTime, 
                function(){
                    player.clearTint();
                    // player.tintTimer = 300;
                    // LD.Player.currentHP -= 1;
                    player.hitTimer.remove();
                    player.hitTimer = null;
                    // // console.log("player hit all clear:", player.hitTimer);

                }, 
                [], this); 
        
    },

    hitRock: function (player, rock)
    {
        LD.Losers.rocks.killAndHide(rock);
        if(player.hitTimer){return;}
        // // console.log("player got hit rock:", player, rock);

        player.setTint(0xff0000);
        LD.Player.currentHP -= 1;
        LD.Sounds.myPlay('rockhit');
        player.hitTimer = thisGame.time.delayedCall(
                LD.Player.activeStats.hitImmuneTime, 
                function(){
                    player.clearTint();
                    // player.tintTimer = 300;
                    // LD.Player.currentHP -= 1;
                    player.hitTimer.remove();
                    player.hitTimer = null;
                    // // console.log("player hit all clear:", player.hitTimer);
                }, 
                [], this); 
    },
    brickRock: function (brick, rock)
    {
        LD.Losers.rocks.killAndHide(rock);
    },
    brickBlade: function (brick, blade)
    {
        LD.Player.blades.killAndHide(blade);
    },

    hitBlade: function (blade, loser)
    {
        LD.Player.blades.killAndHide(blade);

        if(loser.hitTimer){return;}

        loser.setTint(0xDDFF00);
        loser.health -= LD.Player.attackDamage;
        LD.Sounds.myPlay('knifehit');
        loser.hitTimer = thisGame.time.delayedCall(
                LD.Player.activeStats.hitImmuneTime*LD.Losers.activeStats.immuneTimeMult, 
                function(){
                    loser.clearTint();
                    loser.hitTimer.remove();
                    loser.hitTimer = null;
                }, 
                [], this);
    }

   
    

});










