define([
	'Global', 'GameObjects', 'Utilities', 'VillageCollection', 'Village', 'ResourceControllerView', 'BuildingControllerView',
	'UpgradeControllerView',  'CultureControllerView', 'JobControllerView', 'text!templates/village.template.html'
], function (
	G, Objects, Utils, VillageCollection, Village, ResourceController, BuildingController,
	UpgradeController, CultureController, JobController, Template
) {
	return Backbone.View.extend({
		el: '#village',
		template: _.template(Template),
		subscriptions: {
			'action:builder'			: 'payAndBuild',
			'action:upgrader'			: 'payAndUpgrade',
			'village:develop:popcap'	: 'increasePopCap',
			'village:destroy:popcap'	: 'decreasePopCap',
			'village:modify'			: 'modifyVillage',
			'game:interval:resources'	: 'resourceIntervalActions',
			'game:interval:population'	: 'populationIntervalActions',
			'gain:villagers'			: 'gainVillagers'
		},
		initialize: function(village){
			this.collection = new VillageCollection(Objects.village);
			this.collection.fetch({remove: false});
			this.model = this.collection.at(0);
			this.$actionEl = $('#actions');
			this.$statsEl = $('#villageStats');

			this.Resources = new ResourceController('#resources', '#resourceActions', Objects.resources, Objects.resourceActions);
			this.Buildings = new BuildingController('#buildings', '#builderActions', Objects.buildings);
			this.Upgrades = new UpgradeController('#upgrades', '#upgradeActions', Objects.upgrades);
			this.Culture = new CultureController('#culture', Objects.culture);
			this.Jobs = new JobController('#jobs', Objects.jobs);


			
			this.render();
			
			this.model.on('change', this.update, this);
		},
		render: function() {
			this.$statsEl.html(this.template(this.model.toJSON()));
		},
		update: function() {
			this.render();
			this.model.save();
		},
		payAndBuild: function(buildingId, cost, title) {
			if(this.Resources.payCost(cost, title)){
				this.Buildings.build(buildingId);
			}
		},
		payAndUpgrade: function(upgradeId, cost, title) {
			if(this.Resources.payCost(cost, title)) {
				this.Upgrades.upgrade(upgradeId);
			}
		},
		increasePopCap: function(quantity) {
			this.model.set('popCap', this.model.get('popCap') + quantity);
		},
		decreasePopCap: function(quantity) {
			this.model.set('popCap', this.model.get('popCap') - quantity);
		},
		modifyVillage: function(property, change, reverse) {
			switch(property){
				case 'consumption':
					this.modifyConsumption(change, reverse);
			}
		},
		modifyConsumption: function(modification, reverse){
			this.model.set('consumption', Utils.doOperation(this.model.get('consumption'), modification[0], modification[1], reverse));
		},
		resourceIntervalActions: function(){
			this.Jobs.gatherIncome();
			this.feedPopulation();
		},
		populationIntervalActions: function(){
			this.gainPopulation(Math.floor(Math.random() * G.variables.maxSingleRandomPopGrowth));
		},
		getRandomVillager: function(){
			var villagers = this.model.get('villagers');
			return villagers[Utils.randBetween(0, villagers.length)];
		},
		getAllVillagers: function(){
			return this.model.get('villagers');
		},
		gatherVillagers: function(requirements){
			var villagers = _.clone(this.model.get('villagers')),
				returnedVillagers = [];
			for (var i = requirements.any; i--;) {
				returnedVillagers.push(villagers.splice(Utils.randBetween(0, villagers.length), 1)[0]);
			}
			return returnedVillagers;
		},
		gatherNewVillagers: function(requirements){
			var returnedVillagers = []
			if(requirements.any){
				_.ureturnedVillagers.push(this.createNewVillagers(requirements.any));
			}
			if(requirements.native){
				if(requirements.native.any) {
					returnedVillagers.push(this.createNewVillagers(requirements.native.any, {isNative:true}))
				}
				if(requirements.native.male){
					returnedVillagers.push(this.createNewVillagers(requirements.native.male, {isNative: true, isMale:true}))
				}
				if(requirements.native.female){
					returnedVillagers.push(this.createNewVillagers(requirements.native.male, {isNative: true, isMale:false}))
				}
			}
			if(requirements.notNative){
				if(requirements.notNative.any) {
					returnedVillagers.push(this.createNewVillagers(requirements.notNative.any, {isNative:false}))
				}
				if(requirements.notNative.male){
					returnedVillagers.push(this.createNewVillagers(requirements.notNative.male, {isNative: false, isMale:true}))
				}
				if(requirements.notNative.female){
					returnedVillagers.push(this.createNewVillagers(requirements.notNative.male, {isNative: false, isMale:false}))
				}	
			}
			if(requirements.male) {
				returnedVillagers.push(this.createNewVillagers(requirements.male, {isMale: true}))
			}
			if(requirements.female){
				returnedVillagers.push(this.createNewVillagers(requrrerments.female, {isMale: false}))
			}
			returnedVillagers = _.flatten(returnedVillagers);
			return returnedVillagers;
		},
		createNewVillager: function(){
			this.createNewVillagers(1);
		},
		createNewVillagers: function(quantity, expectations){
			var validForenames = Objects.forenames,
				villager = {},
				villagers = [],
				forename, surname, randomiser;
			if(expectations){
				if(typeof expectations.isNative === 'undefined'){
					if(typeof expectations.isMale === 'undefined'){
						//no filtering
					} else {
						validForenames = _.where(validForenames, {isMale: expectations.isMale});
					}
				} else {
					if(typeof expectations.isMale === 'undefined'){
						validForenames = _.where(validForenames, {isNative: expectations.isNative})
					} else {
						validForenames = _.where(validForenames, {isNative: expectations.isNative, isMale: expectations.isMale});
					}
				}
			}
			for (var i = quantity; i--;) {
				randomiser = Utils.randBetween(0, validForenames.length);
				forename = validForenames[randomiser];
				if(forename.isNative){
					villager.name = forename.name;
				} else {
					randomiser = Utils.randBetween(0, Objects.surnames.length);
					villager.name = forename.name + ' '+ Objects.surnames[randomiser];
				}
				villager.isMale = forename.isMale;
				villager.isNative = forename.isNative;
				villager.subPronoun = villager.isMale ? 'he' : 'she';
				villager.objPronoun = villager.isMale ? 'him' : 'her';
				villager.posPronoun = villager.isMale ? 'his' : 'her';
				if(quantity === 1) {
					return villager;
				} else {
					villagers.push(villager);
				}
			}
			return villagers;

		},
		gainVillagers: function(newVillagers, abovePopLimit) {
			var villagers = this.model.get('villagers'),
				availableSpace = this.model.get('popCap') - this.model.get('pop');
			if (abovePopLimit || availableSpace > 0) {
				for(var i = abovePopLimit ? newVillagers.length : Math.min(availableSpace, newVillagers.length); i--;){
					villagers.push(newVillagers[i]);	
				}
				this.model.set('villagers', villagers);
				this.Jobs.gainNewWorkers(newVillagers.length);
				this.model.set('pop', this.model.get('pop') + newVillagers.length);
			}
		},
		gainPopulation: function(gainedPeople){
			var availableSpace = this.model.get('popCap') - this.model.get('pop'),
				villagers = this.model.get('villagers');

			if (gainedPeople > availableSpace) {
				gainedPeople = availableSpace;
			}
			if (gainedPeople) {
				for (var i = gainedPeople; i--;) {
					villagers.push(this.createNewVillager());
				}
				this.Jobs.gainNewWorkers(gainedPeople);
				this.model.set('pop', this.model.get('pop') + gainedPeople);
			}
			return gainedPeople;
		},
		losePopulation: function(lostPeople){
			if (this.model.get('pop') <= lostPeople) {
				this.model.set('pop', 0);
				this.model.set('villagers', []);
			} else {
				var villagers = this.model.get('villagers');
				for (var i = lostPeople; i--;) {
					villagers.splice(Utils.randBetween(0, villagers.length), 1);
				}
				this.model.set('villagers', villagers);
				this.model.set('pop', this.model.get('pop') - lostPeople);
			}
		},
		feedPopulation: function() {
			var shortfall = this.Resources.feedPopulation(this.model.get('pop'), this.model.get('consumption'));
			if(shortfall) {
				console.log('Starvation is disabled, but you would totally have killed '+shortfall+' villagers')
				// if (this.model.get('pop') <= shortfall) {
				// 	this.Jobs.starve(this.model.get('pop') - 1);
				// 	Backbone.Mediator.publish(G.events.triggerEvent, 'youStarved');
				// } else {
				// 	this.Jobs.starve(shortfall);
				// 	Backbone.Mediator.publish(G.events.triggerEvent, 'villagersStarved', {number: shortfall});
				// }
				// this.losePopulation(shortfall);
			}
		}
	});
});