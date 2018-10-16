const Command = require('command');

module.exports = function auto_beer(dispatch) {
	var bUSE_BROOCH	= false; 
	var bUSE_BEER	= true;
	var bENABLED	= true;

	const command = Command(dispatch);
	const ROOT_BEER = 80081;
	const BLACKLIST = [19701,19704,19735]; // 1-2Not useable brooches,Clensing brooch, 
	let gameId = null;
	let lastLocation = null;
	var currentClass = null;	
	var currentBrooch = null;

	const DEADLY_GAMBLE 	= 268635656;//WARRIOR
	const UNLEASH 		= 268765556;//ZERK
	const MANA_BOOST 	= 268775656;//SORC
	const RAGNAROK 	 	= 268555556;//VALK
	const RAGNAROK2	 	= 268685556;//VALK
	const ARUSH 		= 268605656;//LANCER
	const ICB		= 268635756;//SLAYER
	const SREAPING		= 268595556;//REAPER
	const MBREEZE		= 268785556;//ARCHER
	const BEAM_PANEL	= 268845557;//GUNNER
	const ENLIGHTENMENT	= 268665556;//NINJA
	
	dispatch.hook('S_LOGIN', 9, event => { 
		gameId = event.gameId;
		currentClass = event.templateId;
	});
	dispatch.hook('C_PLAYER_LOCATION', 3, event => { lastLocation = event })
	dispatch.hook('S_INVEN', 14, event => {
		for(let item of event.items) {    
			if(item.slot === 20) {
				currentBrooch = item.id;
				break;
			}
		}
	});
	dispatch.hook('S_ACTION_STAGE', 3, (event) => {	
		if(event.gameId.equals(gameId)){
			switch(currentClass.toString().slice(-2)) {
				case '13'://VALK
					if(event.skill==RAGNAROK){
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}}
					if(event.skill==RAGNAROK2){
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}}	
					break;
				case '04'://ZERK
					if(event.skill==UNLEASH){
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}}
					break;
				case '01'://WARRIOR
					if(event.skill==DEADLY_GAMBLE){

						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}}
					break;
				case '05'://SORC
					if(event.skill==MANA_BOOST){
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}}
					break;
				case '02'://LANCER
					if(event.skill==ARUSH){
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}}
					break;
				case '03'://SLAYER
					if(event.skill==ICB){
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}}
					break;
				case '06'://ARCHER
					if(event.skill==MBREEZE){
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}}
					break;
				case '09'://Reaper
					if(event.skill==SREAPING){
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}}
					break;
				case '10'://Gunner
					if(event.skill==BEAM_PANEL){
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}}
					break;
				case '12'://Ninja
					if(event.skill==ENLIGHTENMENT){
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}}
					break;
				default:
					break;				
			}	
		}
	});
	command.add('ab0', () => {
		bENABLED 	= false;
		bUSE_BEER 	= false;
		bUSE_BROOCH = false;
		command.message('Auto beer disabled');
	});
	command.add('ab1', () => {
		bENABLED 	= true;
		bUSE_BEER 	= false;
		bUSE_BROOCH = true;
		command.message('Only brooch enabled');
	});
	command.add('ab2', () => {
		bENABLED 	= true;
		bUSE_BEER 	= true;
		bUSE_BROOCH = false;
		command.message('Only Beer enabled');
	});
	command.add('ab3', () => {
		bENABLED 	= true;
		bUSE_BEER 	= true;
		bUSE_BROOCH = true;
		command.message('Brooch+Beer enabled');
	});
	function useBeer(){
		dispatch.toServer('C_USE_ITEM', 3, {
				gameId: gameId,
				id: ROOT_BEER,
				amount: 1,
				loc: lastLocation.loc,
				w: lastLocation.w,
				unk4: true
		});
	}
	function useBrooch(){
		if(!BLACKLIST.includes[currentBrooch]){
			dispatch.toServer('C_USE_ITEM', 3, {
				gameId: gameId,
				id: currentBrooch,
				amount: 1,
				loc: lastLocation.loc,
				w: lastLocation.w,
				unk4: true
				});
		}
	}
}
