angular.module( 'ngAlone.events')
    .service('EventsService', ['storage', '_', 'gameConstants', '$rootScope', 'eventDefinitions', 'EventEffects',
    function(storage, _, gameConstants, $rootScope, eventDefinitions, EventEffects){
        'use strict';
        var events = storage.get('gameEvents') || eventDefinitions;
        var currentEvent =  null;
        function updateCurrentEvent(value) {
            currentEvent = value;
            $rootScope.$broadcast('eventUpdate', currentEvent);
        }

        var publicFunctions = {
            getAvailableEvents: function(){
                return _.where(events, {isUnlocked: true, isAvailable: true});
            },
            unlockEvent: function(eventName) {
                var event = events[eventName];
                event.isUnlocked = true;
                storage.set('gameEvents', events);
            },
            lockEvent: function(eventName) {
                var event = events[eventName];
                event.isUnlocked = false;
                storage.set('gameEvents, events');
            },
            unlockCategory: function(categoryName) {
                var categoryEvents = _.where(events, {category: categoryName});
                _.each(categoryEvents, function(event){
                   event.isUnlocked = true;
                });
                storage.set('gameEvents', events);
            },
            lockCategory: function(categoryName) {
                var categoryEvents = _.where(events, {category: categoryName});
                _.each(categoryEvents, function(event){
                    event.isUnlocked = false;
                });
                storage.set('gameEvents', events);
            },
            getAvailableEvent: function(){
                var events = this.getAvailableEvents();
                var nextEvent = _.findWhere(events, {isNext: true});
                return nextEvent || _.sample(events);
            },
            setCurrentEvent: function(event) {
                var newEvent = event || null;
                updateCurrentEvent(newEvent);

            },
            getImmediateEvent: function(){
                return  _.findWhere(events, {isUnlocked: true, isAvailable: true, isInstant: true}) || null;
            },
            getCurrentEvent: function() {
                return currentEvent;
            },
            resolveCurrentEvent: function(choiceIndex) {
                var choice = currentEvent.choices[choiceIndex];
                _.each(choice.effects, function(effectName){
                   EventEffects[effectName](choice.variables, this);
                }, this);
                updateCurrentEvent(this.getImmediateEvent());

            }
        };
        updateCurrentEvent(currentEvent);
        return publicFunctions;
    }]);