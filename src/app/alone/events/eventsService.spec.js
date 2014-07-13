/*globals describe, jasmine, it, beforeEach, expect, inject, _, module*/
describe('EventsService', function (){
    var EventsService,
        storageMock,
        gameConstantsMock,
        eventEffectsMock,
        rootScopeMock,
        eventsMock;

    beforeEach(function (){

        // load the module.
        module('ngAlone.events', function($provide){
            storageMock = jasmine.createSpyObj('storage', ['get', 'set']);
            rootScopeMock = jasmine.createSpyObj('rootScope', ['$broadcast']);
            eventsMock = {
                intro1: {
                    isInstant: true,
                    isNext: false,
                    isUnlocked: true,
                    isAvailable: true,
                    text: 'You are alone.',
                    choices: [
                        {
                            variables: {
                                lock: 'intro1',
                                unlock: 'intro2'
                            },
                            text: 'Continue',
                            effects: ['lockEvent', 'unlockEvent']
                        }
                    ]
                },
                intro102: {
                    isInstant: true,
                    isNext: false,
                    isUnlocked: true,
                    isAvailable: false,
                    text: 'You are alone.',
                    choices: [
                        {
                            variables: {
                                lock: 'intro1',
                                unlock: 'intro2'
                            },
                            text: 'Continue',
                            effects: ['lockEvent', 'unlockEvent']
                        }
                    ]
                },
                intro2: {
                    isInstant: true,
                    isNext: false,
                    isUnlocked: true,
                    category: 'intro',
                    isAvailable: false,
                    text: 'Your village cast you out and now',
                    choices: [
                        {
                            text: 'I am alone.',
                            variables: {
                                lock: 'intro2'
                            },
                            effects: ['lockEvent']
                        }
                    ]
                },
                phase01: {
                    isInstant: true,
                    isNext: false,
                    isUnlocked: false,
                    category: 'phase0',
                    text: 'Your village cast you out and now',
                    choices: [
                        {
                            text: 'I am alone.',
                            variables: {
                                lock: 'intro2'
                            },
                            effects: ['lockEvent']
                        }
                    ]
                }
            };
            gameConstantsMock = {

            };
            eventEffectsMock = {

            };
            $provide.value('storage', storageMock);
            $provide.value('$rootScope', rootScopeMock);
            $provide.value('_', _);
            $provide.value('gameConstants', gameConstantsMock);
            $provide.value('eventDefinitions', eventsMock);
            $provide.value('eventEffects', eventEffectsMock);
        });

        inject(function(_EventsService_) {
            EventsService = _EventsService_;
            expect(storageMock.get).toHaveBeenCalledWith('gameEvents');
        });
    });

    describe('Events', function(){
        it('can return a collection of unlocked and available events', function(){
            var availableEvents = EventsService.getAvailableEvents();
            expect(availableEvents.length).toBe(1);
            expect(_.every(availableEvents, function(event){
                return event.isUnlocked && event.isAvailable;
            }));
        });

        it('can unlock an event', function(){
            EventsService.unlockEvent('intro2');
            expect(eventsMock.intro2.isUnlocked).toBeTruthy();
        });

        it('can lock an event', function(){
            EventsService.lockEvent('intro1');
            expect(eventsMock.intro1.isUnlocked).toBeFalsy();
        });

        it('can unlock an event category', function(){
            EventsService.unlockCategory('phase0');
            expect(eventsMock.phase01.isUnlocked).toBeTruthy();
        });

        it('can lock an event category', function(){
            EventsService.lockCategory('intro');
            expect(eventsMock.intro2.isUnlocked).toBeFalsy();
        });

        it('can return a random available event', function(){
            var randomAvailableEvent = EventsService.getAvailableEvent();
            expect(randomAvailableEvent.isUnlocked).toBeTruthy();
            expect(randomAvailableEvent.isAvailable).toBeTruthy();
        });

        it('can set and get the current event', function(){
            EventsService.setCurrentEvent(eventsMock.intro1);
            expect(EventsService.getCurrentEvent()).toBe(eventsMock.intro1);
            EventsService.setCurrentEvent(eventsMock.intro2);
            expect(EventsService.getCurrentEvent()).toBe(eventsMock.intro2);
        });

        it('can clear the current Event', function(){
            EventsService.setCurrentEvent(eventsMock.intro2);
            EventsService.setCurrentEvent();
            expect(EventsService.getCurrentEvent()).toBeNull();
        });

        it('broadcasts when the current event is updated', function(){
            EventsService.setCurrentEvent(eventsMock.intro2);
            expect(rootScopeMock.$broadcast).toHaveBeenCalledWith('eventUpdate', eventsMock.intro2);
        });

        it('can return an event which is available, unlocked, next and instant', function(){
           eventsMock.intro1.isInstant = true;
           expect(EventsService.getImmediateEvent()).toBe(eventsMock.intro1);
        });

        it('will return an event which has isNext true if there is one when returning random events', function(){
            eventsMock.intro1.isNext = true;
            expect(EventsService.getAvailableEvent()).toBe(eventsMock.intro1);
        });
    });

});

