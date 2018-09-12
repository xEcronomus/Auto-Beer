/*int32  class  # 0 = Warrior, 1 = Lancer, 2 = Slayer, 3 = Berserker, 4 = Sorcerer, 5 = Archer,
              # 6 = Priest, 7 = Mystic, 8 = Reaper, 9 = Gunner, 10 = Brawler, 11 = Ninja,
              # 12 = Valkyrie*/
			  

const Command = require('command');

module.exports = function auto_beer(dispatch) {
	{
	var bUSE_BROOCH	= false; // SET THIS TO false IF YOU DONT WANT AUTO BROOCH
	var bUSE_BEER	= false; // SET THIS TO false IF YOU DONT WANT AUTO BEER 
	var bENABLED	= false;
	var bDebug		= false;
	}
	{
	const command = Command(dispatch);
	const ROOT_BEER = 80081;
	const BLACKLIST = [19701,19704,19735]; // 1-2Not useable brooches,Clensing brooch, 
	let MyGameId = null;
	let lastLocation = null;
	var myClass = null;	
	var current_Brooch = null;
	}
	{
	///////////////////////////////////////////////////////////
	const DEADLY_GAMBLE = 67309064;//WARRIOR
	const UNLEASH 		= 67438964;//ZERK
	const MANA_BOOST 	= 67449064;//SORC
	const RAGNAROK 	 	= 67228964;//VALK
	const ARUSH 		= 00000000;//LANCER
	const ICB			= 00000000;//SLAYER
	const MBREEZE		= 00000000;//ARCHER
	const SREAPING		= 00000000;//REAPER
	const BEAM_PANEL	= 00000000;//GUNNER
	const ENLIGHTENMENT	= 00000000;//NINJA
	///////////////////////////////////////////////////////////
	}
	dispatch.hook('S_LOGIN', 9, event => { 
		MyGameId = event.gameId;
		myClass = event.templateId;
	});
	dispatch.hook('C_PLAYER_LOCATION', 3, event => { lastLocation = event })
	dispatch.hook('S_INVEN', 14, event => {
		for(let item of event.items) {    
			if(item.slot === 20) {
				current_Brooch = item.id;
				break;
			}
		}
	});
	dispatch.hook('S_ACTION_STAGE', 3, (event) => {	
		if(event.gameId.equals(MyGameId)){
			if(bDebug){command.message(event.skill.toString());}
			switch(myClass.toString().slice(-2)) {
				case '13'://VALK
					if(event.skill.equals(RAGNAROK))
					{
						//command.message("ragnarok used");
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}
					}
					break;
				case '04'://ZERK
					if(event.skill.equals(UNLEASH))
					{
						//command.message("unlesh used");
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}
					}
					break;
				case '01'://WARRIOR
					if(event.skill.equals(DEADLY_GAMBLE))
					{
					//	command.message("Deadly Gamble used");
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}
					}
					break;
				case '05'://SORC
					if(event.skill.equals(MANA_BOOST))
					{
						//command.message("mana boost used");
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}
					}
					break;
				case '02'://LANCER
					if(event.skill.equals(ARUSH))
					{
						//command.message("ARUSH used");
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}
					}
					break;
				case '03'://SLAYER
					if(event.skill.equals(ICB))
					{
						//command.message("ICB used");
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}
					}
					break;
				case '06'://ARCHER
					if(event.skill.equals(MBREEZE))
					{
						//command.message("Melodic Breeze used");
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}
					}
					break;
				case '09'://Reaper
					if(event.skill.equals(SREAPING))
					{
						//command.message("Shadow reaping used");
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}
					}
					break;
				case '10'://Gunner
					if(event.skill.equals(BEAM_PANEL))
					{
						//command.message("Beam Panel used");
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}
					}
					break;
				case '12'://Ninja
					if(event.skill.equals(ENLIGHTENMENT))
					{
						//command.message("ENLIGHTENMENT used");
						if(bENABLED){if(bUSE_BROOCH){useBrooch();}if(bUSE_BEER){useBeer();}}
					}
					break;
				
				default:
					command.message("No class found S_ACTION_STAGE HOOK");
					break;				
			}	
		}
	
	});//S_ACTION_STAGE END 
	///////////////////////////////////////////////////////////	
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
		command.message('Only brooch ');
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
	command.add('abdebug', () => {
		bDebug = !bDebug;
		command.message('Debug mode');
		command.message(String(bDebug));
	});
	/////////////////////////////////////////////////////////
	function useBeer(){
		dispatch.toServer('C_USE_ITEM', 3, {
				gameId: MyGameId,
				id: ROOT_BEER,
				amount: 1,
				loc: lastLocation.loc,
				w: lastLocation.w,
				unk4: true
		});
	}
	function useBrooch(){
		if(!BLACKLIST.includes[current_Brooch]){
			dispatch.toServer('C_USE_ITEM', 3, {
				gameId: MyGameId,
				id: current_Brooch,
				amount: 1,
				loc: lastLocation.loc,
				w: lastLocation.w,
				unk4: true
			});
		}
	}
}