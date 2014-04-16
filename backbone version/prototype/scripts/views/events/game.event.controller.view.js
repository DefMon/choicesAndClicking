define(['Global', 'GameEventCollection', 'NotificationView', 'Utilities'],
function(G, GameEventCollection, NotificationView, Utils){
	var GameEventController = Backbone.View.extend({
		subscriptions: {
			'events:trigger'		: 'triggerEvent',
			'events:checkqueue'		: 'checkQueue',
			'events:lock'			: 'lockEvent',
			'events:unlock'			: 'unlockNamedEvent',
			'events:rememberdata'	: 'rememberEventData',
			'action:resource'		: 'advanceEventsFromResourceAction',
			'develop:building'		: 'advanceEventsFromBuilding',
			'develop:upgrade'		: 'advanceEventsFromUpgrade',
			'phase:start'			: 'advanceEventsFromPhase',
			'events:enable'			: 'enableNamedEvent'
		},
		initialize: function(element, events, villageController){
			this.setElement(element);
			this.collection = new GameEventCollection(events);
			this.queue = [];
			this.Village = villageController;
			this.collection.fetch({remove: false});
			var onloadEvents = this.collection.where({unlocked: true, mandatory: true, instantTrigger: true});
			if(onloadEvents.length > 0) {
				for (var i = 0; i < onloadEvents.length; i++) {
					this.triggerEvent(onloadEvents[i]);
				}
			}

			this.scheduleEvent(this);
		},
		scheduleEvent: function(eventController){
			var	waitTime = Math.floor(Math.random() * G.variables.eventTimeoutMax),
			eventTimeout = setTimeout(function(){
				eventController.triggerRandomEvent(eventController);
				eventController.scheduleEvent(eventController);
			}, waitTime);

		},
		renderEvent: function(event, options){
				var notification = new NotificationView({model:event});
				this.$el.append(notification.render(options).el);
		},
		getRandomEvent: function(){
			var unlockedEvents = this.collection.where({unlocked: true}),
				mandatoryEvent = _.findWhere(unlockedEvents, {mandatory: true});
			function filterUnlockedEvents(){
				//Filter based on necessary status checks
				unlockedEvents = unlockedEvents;
			}
			if(mandatoryEvent) {
				return mandatoryEvent;
			} else {
				filterUnlockedEvents();
				var random = Math.floor(Math.random() * unlockedEvents.length);
				return unlockedEvents[random];
			}
		},
		triggerEvent: function(eventOreventIdentifier, options){
			if(_.isString(eventOreventIdentifier)) {
				this.triggerNamedEvent(eventOreventIdentifier, options);
			} else if(eventOreventIdentifier) {
				this.triggerGivenEvent(eventOreventIdentifier, options);
			} else {
				this.triggerRandomEvent(this);
			}
		},
		triggerGivenEvent: function(event, options){
			if(this.$el.html() !== '') {
				this.queue.push({name: event.get('name'), options: options});
			} else {
				this.fireEvent(event, options);
			}
		},
		triggerNamedEvent: function(eventName, options) {
			var event;
			if(this.$el.html() !== '') {
				this.queue.push({name: eventName, options: options});
			} else {
				event = this.collection.findWhere({name: eventName});
				if(event){
					this.fireEvent(event, options);
				} else {
					console.log(eventName +" was triggered but is not an event");
				}
			}
		},
		triggerRandomEvent: function(eventController) {
			var eventController = eventController || this,
				randomEvent;
			if(eventController.$el.html() === '') {
				randomEvent = eventController.getRandomEvent();
				if(randomEvent) {
					eventController.fireEvent(randomEvent);
				}
			}
		},
		fireEvent: function(triggeredEvent, options) {
				var eventOptions = {},
					eventController = this;
				function populateEventData(requiredData){
					var dataName = _.isObject(requiredData) ? requiredData.name : requiredData;
					switch(dataName) {
						case G.eventVillageData.villagers:
							eventOptions.villagers = eventController.Village.gatherVillagers(requiredData);
							break;
						case G.eventVillageData.newVillagers:
							eventOptions.newVillagers = eventController.Village.gatherNewVillagers(requiredData);
							break;
						default:
							eventOptions[dataName] = village[dataName];
					}
				}
				function checkMemoryStillMakesSense(){
					var validMemory = true;
					if (eventOptions.memory) {
						if(eventOptions.memory.villagers) {
							var villagers = _.pluck(eventController.Village.getAllVillagers(), 'name');
							_.each(eventOptions.memory.villagers, function(villager){
								if(!_.contains(villagers, villager.name)) {
									validMemory = false;
								}
							});
						}
					}
					return validMemory;
				}
				_.each(triggeredEvent.get('villageData'), populateEventData);
				eventOptions.memory = triggeredEvent.get('eventMemory');
				eventOptions = _.extend(eventOptions, options);
				if(checkMemoryStillMakesSense()) {
					eventController.renderEvent(triggeredEvent, eventOptions);
				} else {
					triggeredEvent.set('unlocked', false);
					triggeredEvent.save();
				}
		},
		checkQueue: function(){
			var queuedEvent = this.queue.shift();
			if(queuedEvent) {
				this.triggerNamedEvent(queuedEvent.name, queuedEvent.options);
			}
		},
		lockEvent: function(eventName){
			var event = this.collection.findWhere({name: eventName});
			this.relock(event.id);
		},
		unlockNamedEvent: function(eventName){
			var event = this.collection.findWhere({name: eventName});
			this.unlock(event);
		},
		unlock: function(event) {
			if(!event.get('unlocked')){
				event.set('unlocked', true);
				event.save();
				if(event.get('instantTrigger')) {
					this.triggerEvent(event);
				}
			}
			return this;
		},
		relock: function(eventId) {
			var event = this.collection.get(eventId);
			if(event.get('unlocked')){
				event.set('unlocked', false);
				event.save();
			}
			return this;
		},
		advanceEventsFromResourceAction: function(title, cost, income, name, count) {
			this.unlockEventsFromResourceAction(name, count);
		},
		advanceEventsFromUpgrade: function(name) {
			this.unlockEventsFromUpgrade(name);
			this.relockEventsFromUpgrade(name);
		},
		advanceEventsFromBuilding: function(name, count) {
			this.unlockEventsFromBuilding(name, count);
			this.relockEventsFromBuilding(name, count);
		},
		advanceEventsFromPhase: function(phaseNumber){
			this.unlockEventsFromPhase(phaseNumber);
		},
		relockEventsFromBuilding: function(name, count) {
			var lockableEvents = this.collection.where({unlocked:true, lockable: true});

				_.each(lockableEvents, function(event){
					var postrequesiteBuildings = event.get('postreqs').buildings;
					function addToPrerequesites(){
						if(event.get('unlockable')) {
							event.get('prereqs').buildings = event.get('prereqs'). buildings || {};
							event.get('prereqs').buildings[name] = count+1;
						}
					}
					if (postrequesiteBuildings && postrequesiteBuildings[name] && postrequesiteBuildings[name] <= count) {
						var prerequesites = event.get('preqs') || {};
						prerequesites.buildings = prerequesites.buildings || {};
						prerequesites.buildings[name] = count;
						delete event.get('postreqs').buildings[name];
						if(Utils.shouldObjectBeRelocked(event, 'buildings')) {
							this.relock(event.id);
						} else {
							event.save();
						}
					}
				}, this);
		},
		relockEventsFromUpgrade: function(name){
			var lockableEvents = this.collection.where({unlocked:true, lockable: true});
			_.each(lockableEvents, function(event) {
				var postrequesiteUpgrades = event.get('postreqs').upgrades;
				function addToPrerequesites(){
					if(event.get('unlockable')) {
						event.get('prereqs').upgrades = event.get('prereqs').upgrades || [];
						event.get('prereqs').upgrades.push(name);
					}
				}
				if(postrequesiteUpgrades && _.contains(postrequesiteUpgrades, name)) {
					addToPrerequesites();
					event.get('postreqs').upgrades = _.without(event.get('postreqs').upgrades, name);
					if(Utils.shouldObjectBeUnlocked(event, 'upgrades')) {
						this.unlock(event);
					} else {
						event.save();
						
					}
				}
			}, this);
		},
		unlockEventsFromResourceAction: function(name, count){
			var lockedEvents = this.collection.where({unlocked:false, unlockable: true});
				_.each(lockedEvents, function(event){
					var prerequesiteResourceActions = event.get('prereqs').resourceActions;
					if (prerequesiteResourceActions && prerequesiteResourceActions[name] && prerequesiteResourceActions[name] <= count) {
						delete event.get('prereqs').resourceActions[name];
						if(Utils.shouldObjectBeUnlocked(event, 'resourceActions')) {
							this.unlock(event);
						} else {
							event.save();
						}
					}
				}, this);
		},
		unlockEventsFromBuilding: function(name, count){
			var lockedEvents = this.collection.where({unlocked:false, unlockable: true});
				_.each(lockedEvents, function(event){
					function addToPostrequesites(){
						if(event.get('lockable')) {
							event.get('postreqs').buildings = event.get('postreqs').buildings || {};
							event.get('postreqs').buildings.push(name);
						}
					}
					var prerequesiteBuildings = event.get('prereqs').buildings;
					if (prerequesiteBuildings && prerequesiteBuildings[name] && prerequesiteBuildings[name] <= count) {
						addToPostrequesites();
						delete event.get('prereqs').buildings[name];
						if(Utils.shouldObjectBeUnlocked(event, 'buildings')) {
							this.unlock(event);
						} else {
							event.save();
						}
					}
				}, this);
		},
		unlockEventsFromUpgrade: function(name){
			var lockedEvents = this.collection.where({unlocked:false, unlockable: true});
			_.each(lockedEvents, function(event) {
				function addToPostrequesites(){
					if(event.get('lockable')) {
						event.get('postreqs').upgrades = event.get('postreqs').upgrades || [];
						event.get('postreqs').upgrades.push(name);
					}
				}
				var prerequesiteUpgrades = event.get('prereqs').upgrades;
				if(prerequesiteUpgrades && _.contains(prerequesiteUpgrades, name)) {
					addToPostrequesites();
					event.get('prereqs').upgrades = _.without(event.get('prereqs').upgrades, name);
					if(Utils.shouldObjectBeUnlocked(event, 'upgrades')) {
						this.unlock(event);
					} else {
						event.save();
					}
				}
			}, this);
		},
		unlockEventsFromPhase: function(phaseNumber){
			var lockedEvents = this.collection.where({unlocked:false, unlockable: true});
			_.each(lockedEvents, function(event) {
				var prerequesitePhase = event.get('prereqs').phase;
				if(prerequesitePhase === phaseNumber) {
					event.get('prereqs').phase = {};
					if(Utils.shouldObjectBeUnlocked(event, 'phase')) {
						this.unlock(event);
					} else {
						event.save();
					}
				}
			}, this);
		},
		rememberEventData: function(rememberingEventName, data) {
			var rememberingEvent = this.collection.findWhere({name:rememberingEventName});
			rememberingEvent.set('eventMemory', _.extend(rememberingEvent.get('eventMemory'), data));
			rememberingEvent.save();
		},
		enableNamedEvent: function(eventName) {
			var event = this.collection.findWhere({name: eventName});
			this.enableEvent(event);
		},
		enableEvent: function(event){
			event.set('unlockable', true);
			event.save();
		}

	});

	return GameEventController;
});