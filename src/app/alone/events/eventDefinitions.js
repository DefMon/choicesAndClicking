angular.module('ngAlone.events')
    .factory('eventDefinitions', function(){
        'use strict';
        var events =  {
            intro1: {
                isInstant: true,
                isNext: true,
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
            intro2: {
                isInstant: true,
                isNext: true,
                isUnlocked: false,
                isAvailable: true,
                text: 'Your village cast you out and now',
                choices: [
                    {
                        text: 'I am alone.',
                        variables: {
                            lock: 'intro2',
                            unlock: 'introShelter',
                            unlockAction: 'getFood',
                            unlockResource: 'food'
                        },
                        effects: ['lockEvent', 'unlockEvent', 'unlockAction', 'unlockResource']
                    }
                ]
            },
            introShelter: {
                isInstant: false,
                isNext: true,
                isUnlocked: false,
                isAvailable: true,
                text: 'You are going to need shelter before too long',
                choices: [
                    {
                        text: 'Better find some wood',
                        variables: {
                            lock: 'introShelter',
                            unlock: 'introEruption',
                            unlockAction: 'getWood',
                            unlockResource: 'wood'
                        },
                        effects: ['lockEvent', 'unlockEvent', 'unlockAction', 'unlockResource']
                    }
                ]
            },
            introEruption: {
                isInstant: false,
                isNext: false,
                isUnlocked: false,
                isAvailable: true,
                text: 'You hear a loud explosion in the distance',
                choices: [
                    {
                        text: 'oh snap'
                    }
                ]
            }
        };

        return events;
    });



