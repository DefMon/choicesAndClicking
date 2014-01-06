/*

	getNewRandomVillager => a new Villager of any nationality/gender
	getNewRandomNativeVillager => a new Native villager of any gender
	getNewRandomShipVillager => a new Ship villager of any gender
	getNewRandomVillagers => an array of new Villagers of any nationality/gender
	getNewRandomNativeVillagers => an array of new Native Villagers of any gender
	getNewRandomShipVillagers => an array of new Ship villagers of any gender

	getRandomVillager => a random villager from this.collection of any nationality/gender
	getRandomNativeVillager => a random native villager from this.collection of any gender
	getRandomShipVillager => a random ship villager from this.collection of any gender 
	getRandomVillagers => an array of random villagers from this.collection of any nationality/gender
	getRandomNativeVillagers => an array of random native villagers from this.collection of any gender
	getRandomShipVillagers => an array of random ship villagers from this.collection of any gender

	getVillagers(
		requirements: object listing required villager types
		any: int, number of any nationality or gender
		native: int, number of native any gender or Object
			any: int, number of native any gender,
			female: int, number of native females
			male: int, number of native males,
		ship: int, number of ship any gender or Object
			any: int, number of ship any gender
			female: int, number of ship females
			male: int, number of ship males
		female: int, number of females any nationality,
		male: int, number of males any nationality
	) => an array of Villagers from this.collection in unspecified order. Returns false if there are not enough to fulfil the request

	createNewVillager(
		nationality: 0 or 1, where 0 is native and 1 is ship
		gender: 0 or 1, where 0 is female and 1 is male,
		specifiedName: If you want the villager to have a specific name, give it in full here
	) => a new Villager object

	createNewVillagers(
		requirements: object listing required villager types
		any: int, number of any nationality or gender
		native: int, number of native any gender or Object
			any: int, number of native any gender,
			female: int, number of native females
			male: int, number of native males,
		ship: int, number of ship any gender or Object
			any: int, number of ship any gender
			female: int, number of ship females
			male: int, number of ship males
		female: int, number of females any nationality,
		male: int, number of males any nationality
	) => an array of new Villagers, in unspecified order

*/

define(['Global', 'Utils', 'Villager', 'VillagersCollection', 'Names'],
function(G, Utils, Villager, VillagersCollection, Names){
	return Backbone.View.extend({
		initialize: function(defaultVillagers){
			this.collection = Utils.storage.loadOrCreateBackboneCollection(VillagersCollection, defaultVillagers);
			Utils.debug.log('Villagers initialized');
		},
		getVillagers: function(requirements) {
			var VillagerController = this,
				returnedVillagers = [],
				villagers = _.clone(this.collection),
				villagersPicked = false,
				genderValue = 0,
				nationalityValue = 0;
			function gatherVillagersWithNationality(nationalityRequirements, isNative) {
				var firstFilteredVillagers = _.where(villagers, {isNative: isNative});
				function gatherVillagersWithNationalityAndGender(numberRequired, isMale){
					var secondFilteredVillagers = _.where(firstFilteredVillagers, {isMale: isMale});
					if(secondFilteredVillagers.length >= numberRequired) {
						for(var i = numberRequired; i --;) {
							returnedVillagers.push(Utils.maths.randomSplice(secondFilteredVillagers));
						}
					} else {
						Utils.debug.log('Not enough villagers where isNative:'+isNative+' and isMale:'+isMale+' for request');
						return false;
					}
				}
				function gatherVillagersWithNationalityAndNoSpecifiedGender(numberRequired){
					if(firstFilteredVillagers.length > numberRequired) {
						for(var i = numberRequired; i --;) {
							returnedVillagers.push(Utils.maths.randomSplice(firstFilteredVillagers));
						}
					} else {
						Utils.debug.log('Not enough villagers where isNative:'+isNative);
					}
				}
				if(_.isObject(nationalityRequirements)) {
					if(nationalityRequirements.male > 0) {
						gatherVillagersWithNationalityAndGender(nationalityRequirements.male, true);
					}
					if(nationalityRequirements.female > 0) {
						gatherVillagersWithNationalityAndGender(nationalityRequirements.female, false);
					}
					if(nationalityRequirements.any > 0){
						firstFilteredVillagers = _.without(firstFilteredVillagers, returnedVillagers);
						gatherVillagersWithNationalityAndNoSpecifiedGender(nationalityRequirements.any);
					}
				} else {
					gatherVillagersWithNationalityAndNoSpecifiedGender(nationalityRequirements);
				}
			}

			function gatherVillagersWithGender(numberRequired, isMale){
				var filteredVillagers = _.where(villagers, {isMale: isMale});
				if(filteredVillagers.length >= numberRequired){
					for(var i = numberRequired; i--;){
						returnedVillagers.push(Utils.maths.randomSplice(filteredVillagers));
					}
				} else {
					Utils.debug.log('Not enough villagers where isMale:'+isMale+' for request');
					return false;
				}
			}

			if(requirements.ship){
				gatherVillagersWithNationality(requirements.ship, false);
				villagersPicked = true;
			}
			if(requirements.native){
				gatherVillagersWithNationality(requirements.native, true);
				villagersPicked = true;
			}
			if(villagersPicked) {
				villagers = _.without(villagers, returnedVillagers);
				villagersPicked = false;
			}
			if(requirements.female){
				gatherVillagersWithGender(requirements.female, false);
				villagersPicked = true;
			}
			if(requirements.female){
				gatherVillagersWithGender(requirements.male, true);
				villagersPicked = true;
			}
			if(villagersPicked){
				villagers = _.without(villagers, returnedVillagers);
				villagersPicked = false;
			}
			if(requirements.any){
				if(villagers.length >= requirements.any) {
					for(var i = requirements.any; i--;){
						returnedVillagers.push(Utils.maths.randomSplice(villagers));
					}
				} else {
					Utils.debug.log('Not enough villagers for request');
					return false;
				}
			}

			return returnedVillagers;
		},
		createNewVillager: function(nationalityNumber, genderNumber, specifiedName){
			var forenamePot = Names.forenames[nationalityNumber][genderNumber],
				name = specifiedName || forenamePot[Utils.maths.randBetween(0, forenamePot.length)];
			if(nationality === G.villagers.nationality.ship) {
				name = name + ' ' + Names.surnames[Utils.randBetween(0,Names.surnames.length)];
			}

			return new Villager({name: name, isMale: Boolean(gender), isNative: Boolean(nationality)});
		},
		createNewVillagers: function(requirements){
			var VillagerController = this,
				i = 0,
				newVillagers = [],
				genderValue = 0,
				nationalityValue = 0;
			function gatherAllNewVillagersForNationality(nationalityRequirements){
				var i = 0;
				if (!_.isObject(nationalityRequirements) && nationalityRequirements > 0) {
					for(i = nationalityRequirements.any; i--;) {
						genderValue = Utils.maths.randBetween(0,1);
						newVillagers.push(VillagerController.createNewVillager(nationalityValue, genderValue));
					}
				} else {
					if(nationalityRequirements.any > 0) {
						for(i = nationalityRequirements.any; i--;) {
							genderValue = Utils.maths.randBetween(0,1);
							newVillagers.push(VillagerController.createNewVillager(nationalityValue, genderValue));
						}
					}
					if(nationalityRequirements.female > 0) {
						genderValue = G.villagers.gender.female;
						for(i = nationalityRequirements.female; i--;){
							newVillagers.push(VillagerController.createNewVillager(nationalityValue, genderValue));
						}
					}
					if(nationalityRequirements.male > 0) {
						genderValue = G.villagers.gender.male;
						for(i = nationalityRequirements.male; i--;){
							newVillagers.push(VillagerController.createNewVillager(nationalityValue, genderValue));
						}
					}
				}
			}
			if(requirements.any > 0) {
				for (i = requirements.any; i--;) {
					genderValue = Utils.maths.randBetween(0,1);
					nationalityValue = Utils.maths.randBetween(0,1);
					newVillagers.push(VillagerController.createNewVillager(nationalityValue, genderValue));
				}
			}
			if(requirements.ship) {
				nationalityValue = G.villagers.gender.female;
				gatherAllNewVillagersForNationality(requirements.ship);
			}
			if(requirements.native) {
				nationalityValue = G.villagers.nationality.native;
				gatherAllNewVillagersForNationality(requirements.native);
			}
			if(requirements.female > 0){
				genderValue = G.villagers.gender.female;
				for (i = requirements.female; i--;) {
					nationalityValue = Utils.maths.randBetween(0,1);
					newVillagers.push(VillagerController.createNewVillager(nationalityValue, genderValue));
				}
			}

			if(requirements.male > 0) {
				genderValue = G.villagers.gender.male;
				for (i = requirements.male; i--;) {
					nationalityValue = Utils.maths.randBetween(0,1);
					newVillagers.push(VillagerController.createNewVillager(nationalityValue, genderValue));
				}
			}
		},
		getRandomVillager: function(){
			return Utils.maths.randomPick(this.collection);
		},
		gerRandomNativeVillager: function(){
			return Utils.maths.randomPick(this.collection.where({isNative: true}));
		},
		getRandomShipVillager: function(){
			return Utils.maths.randomPick(this.collection.where({isNative: false}));
		},
		getRandomVillagers: function(count){
			return this.getVillagers({any: count});
		},
		getRandomNativeVillagers: function(count){
			return this.getVillagers({native: count});
		},
		getRandomShipVillagers: function(count){
			return this.getVillagers({ship: count});
		},
		getNewRandomVillager: function(){
			return this.createNewVillager(Utils.maths.randBetween(0,1), Utils.maths.randBetween(0,1));
		},
		getSomeNewRandomVillagers: function(count){
			return this.createNewVillagers({any: count});
		},
		getNewRandomNativeVillager: function(){
			return this.createNewVillager(0, Utils.maths.randBetween(0,1));
		},
		getSomeNewRandomNativeVillagers: function(count){
			return this.createNewVillagers({native:count});
		},
		getNewRandomShipVillager: function(){
			return this.createNewVillager(1, Utils.maths.randBetween(0,1));
		},
		getSomeNewRandomShipVillagers: function(count){
			return this.createNewVillagers({ship:count});
		}
	});
});