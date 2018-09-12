const Command = require('command');

module.exports = function auto_beer(dispatch) {
	var bUSE_BROOCH = true; // SET THIS TO false IF YOU DONT WANT AUTO BROOCH
	var bUSE_BEER = false; // SET THIS TO false IF YOU DONT WANT AUTO BEER 
	var bENABLED = true;
	
	
	
	
	
	const command = Command(dispatch);
	const ROOT_BEER = 80081;
	const BLACKLIST = [19701,19704,19735]; // 1-2Not useable brooches,Clensing brooch, 
	const BUFF = [268635656,67438964,67228964,67449064,67309164];//BUFF skill Deadly_Gamble, Unleash, Ragnarok, Manaboost, In Cold Blood
	let MyGameId = null;
	let lastLocation = null;
	var myClass = null;
	var msg = '';
	
	var current_Brooch = null;
	///////////////////////////////////////////////////////////
	const DEADLY_GAMBLE = 268635656;
	const UNLEASH 		= 67438964;
	const MANA_BOOST 	= 67449064;
	const RAGNAROK 	 	= 67228964;
	///////////////////////////////////////////////////////////
	const VALK_ID 	 = 10813;
	const ZERK_ID 	 = 10804;
	const WARRIOR_ID = 10801;
	const SORC_ID	 = 10805;
	///////////////////////////////////////////////////////////
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
		
		/*if(event.gameId.equals(MyGameId)){
			switch(myClass.toString().slice(-2)) {
				case 13://VALK_ID
				if(event.skill.equals(RAGNAROK))
				{
					//USE
				}
					break;
				case 04://ZERK_ID
				
						break;
				case 01://WARRIOR_ID
				
					break;
				case 05://SORC_ID
				
					break;
				default:
			
			}	
		}*/

		if(event.gameId.equals(MyGameId)){
			if(BUFF.includes(event.skill)){
				if(bENABLED){
					if(myClass.toString()!='10806'){
						if(bUSE_BROOCH){useBrooch();}
						if(bUSE_BEER){useBeer();}
					}
				}
			}
		}
		
	});
	///////////////////////////////////////////////////////////
	command.add('ab', () => {
		bENABLED = !bENABLED;
		if(bENABLED){msg = 'Autobeer enabled';}else{msg = 'Autobeer disabled';}
		command.message(msg);
	});
	command.add('abbeer', () => {
		bUSE_BEER = !bUSE_BEER;
		if(bUSE_BEER){msg = 'Beer enabled';}else{msg = 'Beer disabled';}
		command.message(msg);
	});
	
	command.add('abbrooch', () => {
		bUSE_BROOCH = !bUSE_BROOCH;	
		if(bUSE_BROOCH){msg = 'Brooch enabled';}else{msg = 'Brooch disabled';}
		command.message(msg);
	});
	command.add('abinfo', () => {
		msg = myClass.toString();
		command.message(msg);
	///////////////////////////////////////////////////////////
	});
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