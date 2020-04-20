if(LD === undefined) {
  var LD = {};
}

LD.Messages = {
    woodText:  "",
    woodTextPrefix:   "Need Wood: ",
    woodTextSuffix:   "/9",

    movesText:  "",
    movesTextPrefix:   "Moves: ",

    levelText:  "",
    levelTextPrefix :   "Level: ",

    ticksText:  "",
    ticksTextPrefix :   "Distance: ",

    debugText:  "",
    debugTextPrefix :   "debug: ",

    timeText:  "",
    timeTextPrefix :   "Time: ",
    savedTime: 0,

    // introTextMsg:   "Don't you think It's time we got "
    //                 +"\n\t started?   "
    //                 +"\n\t...Isn't time you WAKE UP!",
    introTextMsg:   "Press W or UP to Begin...",
    introTextMsg2:   "down h e r e .  ."
                    +"\n\n\t\t\t\tyou wanna pay them . . back . . "
                    +"\nwe need you to go back to derry . . "
                    +"\nyou can get them . . no matter what they believe . ."
                    +"\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t"
                    +"one . . by . . one . . . henry . . "
                    +"\nlead the way . . henry . . .",
    
    selectTextMsg:   "Select your Runner!",
    winloseTextMsg:   "",
    restartTextMsg:   "Press W or UP to start again...",
    wonTextMsg:   "You killed all the Losers!",

    bowersConf: { align: 'center', 
                    font: '40px Anton', 
                    fill: LD.Globals.colors.jeangrey, 
                    wordWrap: {width: LD.Globals.gameWidth - (LD.Globals.horizontalOffset*2)} 
                },
    ITConf: { fontFamily: 'Anton', fontSize: '36px', fill: LD.Globals.colors.bloodlite },


    // gotSwordText: "There's a note it reads: \n\t\t\tHey kid I left you my old sword",

    winloseTexts: {
        zeroHP: "How am I going to get anything done \n\t if you're dead",
        nothingMaxed: "Thanks I'll take it from here",
        levelCleared: "Ah... The fire is nice \n\t and let's take a nap"
      },

    textDepth: 200,

    hpBarSize: {width:100,height:20},


    savedTimeFormatted: function(){
        return LD.Messages.msToTime(LD.Messages.savedTime);
    },

    msToTime: function(s) {

  // Pad to 2 or 3 digits, default is 2
      function pad(n, z) {
        z = z || 2;
        return ('00' + n).slice(-z);
      }

      var ms = s % 1000;
      s = (s - ms) / 1000;
      var secs = s % 60;
      s = (s - secs) / 60;
      var mins = s % 60;
      var hrs = (s - mins) / 60;

      // return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
      return pad(mins) + ':' + pad(secs) + '.' + pad(ms);
    }
};

