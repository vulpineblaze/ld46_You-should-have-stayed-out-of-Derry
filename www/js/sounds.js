if(LD === undefined) { 
  var LD = {};
}

LD.Sounds = {

	allSounds: [
		{
			name: 'bgMusic',
			volume: 0.7,
			loop: true
			
		},
		{
			name: 'wrong',
			volume: 0.7,
			loop: false
			
		},
		{
			name: 'die',
			volume: 0.7,
			loop: false
			
		},
		{
			name: 'footsteps',
			volume: 0.7,
			loop: false
			
		},
		{
			name: 'knifehit',
			volume: 0.7,
			loop: false
			
		},
		{
			name: 'loserdie',
			volume: 0.7,
			loop: false
			
		},
		{
			name: 'rockhit',
			volume: 0.7,
			loop: false
			
		},
		{
			name: 'collision',
			volume: 0.7,
			loop: false
			
		},
		{
			name: 'finalwin',
			volume: 0.7,
			loop: false
			
		},
		{
			name: 'loserspawn',
			volume: 0.7,
			loop: false
			
		},
		{
			name: 'lvlwin',
			volume: 0.7,
			loop: false
			
		},
		{
			name: 'rockthrow',
			volume: 0.7,
			loop: false
			
		},
		{
			name: 'emptySound',
			volume: 0.01,
			loop: false
			
		}
	],

	myPlay: function (name, vol=1){
		// console.log("sounds", name, LD.Sounds);
		var tune = LD.Sounds.findTuneByName(name);
		LD.Sounds[tune.name].play({volume: tune.volume * vol, loop: tune.loop});
	},

	myStop: function (name, vol=1){
		console.log("sounds", name, LD.Sounds);
		var tune = LD.Sounds.findTuneByName(name);
		LD.Sounds[tune.name].stop();
	},

	findTuneByName: function (name){
		var i;
		for(i=0;i<LD.Sounds.allSounds.length;++i){
			var tune = LD.Sounds.allSounds[i];
			if(tune.name == name){
				return tune;
			}
		}
	},

	preload: function (thisGame){
		var i;
		for(i=0;i<LD.Sounds.allSounds.length;++i){
			var tune = LD.Sounds.allSounds[i];
			thisGame.load.audio(tune.name, ['audio/'+tune.name+'.mp3','audio/'+tune.name+'.ogg']);
		}
	},

	create: function (thisGame){
		var i;
		for(i=0;i<LD.Sounds.allSounds.length;++i){
			var tune = LD.Sounds.allSounds[i];
			LD.Sounds[tune.name] = thisGame.sound.add(tune.name, {volume: tune.volume, loop: tune.loop});
		}
		console.log("create sounds", LD.Sounds);
	}
};


