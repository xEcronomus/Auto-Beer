module.exports = function auto_beer(mod) {
	var bUSE_BROOCH	= false; 
	var bUSE_BEER	= true;
	var bENABLED	= true;


	const ROOT_BEER = 80081;
	const BLACKLIST = [19701,19704,19735]; // 1-2Not useable brooches,Clensing brooch, 
	const SORCBLACKLIST = [268505556,268745566,268695556,268616056,268635956]; 
	
	let gameId = null;
	let lastLocation = null;
	var myClass = null;	
	var current_Brooch = null;

	const DEADLY_GAMBLE = 200200;//WARRIOR
	const UNLEASH 		= 330100;//ZERK   268765556
	const MANA_BOOST 	= 340200;//SORC
	const RAGNAROK 	 	= 120100;//VALK
	const RAGNAROK2	 	= 250100;//VALK
	const ARUSH 		= 170200;//LANCER
	const ICB			= 200300;//SLAYER
	const SREAPING		= 230100;//REAPER

	const MBREEZE		= 350100;//ARCHER
	const BEAM_PANEL	= 410101;//GUNNER
	const ENLIGHTENMENT	= 230100;//NINJA
	
	mod.hook('S_LOGIN', 12, event => { 
		gameId = event.gameId;
		myClass = event.templateId;
	});
	mod.hook('C_PLAYER_LOCATION', 5, event => { lastLocation = event })
	mod.hook('S_INVEN', 16, event => {
		for(let item of event.items) {    
			if(item.slot === 20) {
				current_Brooch = item.id;
				break;
			}
		}

	});
	
	mod.hook('S_ACTION_STAGE', 9,{order: -50}, (event) => {	
		if(event.gameId==gameId){
			//mod.command.message(event.skill.id);
			switch(myClass.toString().slice(-2)) {
				case '13'://VALK
					if(event.skill.id==RAGNAROK){
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}}
					if(event.skill.id==RAGNAROK2){
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}}
					break;
				case '04'://ZERK
					if(event.skill.id==UNLEASH){
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}}
					break;
				case '01'://WARRIOR
					if(event.skill.id==DEADLY_GAMBLE){
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}}
					break;
				case '05'://SORC	
					if(event.skill.id==MANA_BOOST){
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}}
					break;
				case '02'://LANCER
					if(event.skill.id==ARUSH){
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}}
					break;
				case '03'://SLAYER
					if(event.skill.id==ICB){
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}}
					break;
				case '06'://ARCHER
					if(event.skill.id==MBREEZE){
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}}
					break;
				case '09'://Reaper
					if(event.skill.id==SREAPING){
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}}
					break;
				case '10'://Gunner
					if(event.skill.id==BEAM_PANEL){
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}}
					break;
				case '12'://Ninja
					if(event.skill.id==ENLIGHTENMENT){
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}}
					break;
				default:
					break;				
			}	
		}
	});
	mod.command.add('ab0', () => {
		bENABLED 	= false;
		bUSE_BEER 	= false;
		bUSE_BROOCH = false;
		mod.command.message('Auto beer disabled');
	});
	
	mod.command.add('ab1', () => {
		bENABLED 	= true;
		bUSE_BEER 	= false;
		bUSE_BROOCH = true;
		mod.command.message('Only brooch enabled');
	});
	mod.command.add('ab2', () => {
		bENABLED 	= true;
		bUSE_BEER 	= true;
		bUSE_BROOCH = false;
		mod.command.message('Only Beer enabled');
	});
	mod.command.add('ab3', () => {
		bENABLED 	= true;
		bUSE_BEER 	= true;
		bUSE_BROOCH = true;
		mod.command.message('Brooch+Beer enabled');
	});
	mod.command.add('usebeer', () => {
		useBeer();
	});
	mod.command.add('usebrooch', () => {
		useBrooch();
	});
	function useBeer(){
		mod.send('C_USE_ITEM', 3, {
				gameId: gameId,
				id: ROOT_BEER,
				amount: 1,
				loc: lastLocation.loc,
				w: lastLocation.w,
				unk4: true
		});
	}
	function useBrooch(){
		if(!BLACKLIST.includes[current_Brooch]){
			mod.send('C_USE_ITEM', 3, {
				gameId: gameId,
				id: current_Brooch,
				amount: 1,
				loc: lastLocation.loc,
				w: lastLocation.w,
				unk4: true
				});
		}
	}
}
