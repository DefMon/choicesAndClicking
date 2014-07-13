/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */
describe('ResourceService', function (){
    var ResourceService,
        storageMock,
        resourcesMock,
        resourceActionssMock;
  
    beforeEach(function (){
    
    // load the module.
        module('ngAlone.resources', function($provide){
            storageMock = jasmine.createSpyObj('storage', ['get', 'set']);
            resourcesMock = {
              food: {title: 'Food', count: 0, unlocked: true},
              wood: {title: 'Wood', count: 0, unlocked: true},
              rope: {title: 'Rope', count: 0, unlocked: false}
            };
            resourceActionsMock = {
                getFood: {title: 'Forage', cost: {}, income: {food: 1}, unlocked: true},
                getWood: {title: 'Chop wood', cost: {}, income: {wood: 1}, unlocked: true},
                getRope: {title: 'Weave rope', cost: {}, income: {rope: 1}, unlocked: false}
            };
            $provide.value('storage', storageMock);
            $provide.value('_', _);
            $provide.value('resourceDefinitions', resourcesMock);
            $provide.value('resourceActionDefinitions', resourceActionsMock);
        });
    
        // inject your service for testing.
        // The _underscores_ are a convenience thing
        // so you can have your variable name be the
        // same as your injected service.
        inject(function(_ResourceService_) {
            ResourceService = _ResourceService_;
            expect(storageMock.get).toHaveBeenCalledWith('villageResources');
        });
    });

    describe('Resources', function(){
        it('can increase a single resource by a given amount', function(){
            expect(ResourceService.gainResource('food', 5)).toBeTruthy();
            expect(resourcesMock.food.count).toBe(5);
            expect(ResourceService.gainResource('food', 2)).toBeTruthy();
            expect(resourcesMock.food.count).toBe(7);
            //default value should be 1
            expect(ResourceService.gainResource('food')).toBeTruthy();
            expect(resourcesMock.food.count).toBe(8);
        });

        it('can decrease a single resource by a given amount', function(){
            ResourceService.gainResource('food', 10);
            expect(ResourceService.loseResource('food', 1)).toBeTruthy();
            expect(resourcesMock.food.count).toBe(9);
            expect(ResourceService.loseResource('food', 5)).toBeTruthy();
            expect(resourcesMock.food.count).toBe(4);
            //default value should be 1
            expect(ResourceService.loseResource('food')).toBeTruthy();
            expect(resourcesMock.food.count).toBe(3);
            expect(ResourceService.loseResource('food', 3)).toBeTruthy();
            expect(resourcesMock.food.count).toBe(0);
        });


        it('can gain multiple resources at once', function(){
            expect(ResourceService.gainResources({food: 1, wood: 3})).toBeTruthy();
            expect(resourcesMock.food.count).toBe(1);
            expect(resourcesMock.wood.count).toBe(3);
        });

        it('can lose multiple resource at once', function(){
            expect(ResourceService.gainResources({food: 10, wood: 10})).toBeTruthy();
            expect(ResourceService.loseResources({food: 5, wood: 5})).toBeTruthy();
            expect(resourcesMock.food.count).toBe(5);
            expect(resourcesMock.wood.count).toBe(5);
        });

        it('will not lose any resources if any of  a collection would go below 0', function(){
            ResourceService.gainResource('food', 1);
            expect(ResourceService.loseResources({food: 1, wood: 1})).toBeFalsy();
            expect(resourcesMock.food.count).toBe(1);
        });

        it('can return a collection of unlocked resources', function(){
            var availableResources = ResourceService.getAvailableResources();
            expect(availableResources.length).toBe(2);
            expect(_.every(availableResources, function(resource){
                return resource.unlocked;
            }));
        });

        it('updates the local storage whenever resources change', function(){
            storageMock.set.reset();
            ResourceService.gainResource('food');
            expect(storageMock.set).toHaveBeenCalledWith('villageResources', resourcesMock);
            storageMock.set.reset();
            ResourceService.loseResource('food');
            expect(storageMock.set).toHaveBeenCalledWith('villageResources', resourcesMock);
            storageMock.set.reset();
            ResourceService.gainResources({food: 1, wood:1});
            expect(storageMock.set).toHaveBeenCalledWith('villageResources', resourcesMock);
            storageMock.set.reset();
            ResourceService.loseResources({food: 1, wood:1});
            expect(storageMock.set).toHaveBeenCalledWith('villageResources', resourcesMock);
            storageMock.set.reset();
            ResourceService.loseResource('food');
            expect(storageMock.set).not.toHaveBeenCalledWith('villageResources', resourcesMock);
            storageMock.set.reset();
            ResourceService.loseResources({food:1, wood:1});
            expect(storageMock.set).not.toHaveBeenCalledWith('villageResources', resourcesMock);
        });

        it('can return a single resource', function(){
            expect(ResourceService.getResource('food')).toBe(resourcesMock.food);
        });

        it('can unlock a resource', function(){
            storageMock.set.reset();
            ResourceService.unlockResource('rope');
            expect(resourcesMock.rope.unlocked).toBeTruthy();
            expect(storageMock.set).toHaveBeenCalledWith('villageResources', resourcesMock);
        });
    });

    describe('Resource Actions', function(){
        it('can get a list of available resource actions', function(){
            var availableResourceActions = ResourceService.getAvailableResourceActions();
                expect(availableResourceActions.length).toBe(2);
                expect(_.every(availableResourceActions, function(action){
                    return action.unlocked;
                }));
        });

        it('can unlock a resource action', function(){
            storageMock.set.reset();
            ResourceService.unlockResourceAction('getRope');
            expect(resourceActionsMock.getRope.unlocked).toBeTruthy();
            expect(storageMock.set).toHaveBeenCalledWith('resourceActions', resourceActionsMock);
        });

        it('can return a single resource', function(){
            expect(ResourceService.getResourceAction('getRope')).toBe(resourceActionsMock.getRope);
        });

        it('can register an observer for updates to the resource actions', function(){
            var callbackSpy = jasmine.createSpy('callback');
            var callbackSpyTheSecond = jasmine.createSpy('callback2');
            ResourceService.addResourceActionObserver(callbackSpy);
            ResourceService.addResourceActionObserver(callbackSpyTheSecond);
            ResourceService.unlockResourceAction('getRope');
            expect(callbackSpy).toHaveBeenCalled();
            expect(callbackSpyTheSecond).toHaveBeenCalled();
        });
    });
});

