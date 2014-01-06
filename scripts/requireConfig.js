require.config(
    {
        baseUrl: 'scripts',
        paths: {
                //libraries 
                jQuery: 'lib/jquery-2.0.3.min',
                text: 'lib/text',
                Underscore: 'lib/lodash.min',
                Backbone: 'lib/backbone-min',
                LocalStorage: 'lib/backbone.localStorage-min',
                Mediator: 'lib/backbone-mediator',

                //game
                Global: 'globalValues',
                MathsUtils: 'Utilities/maths.utils',
                DebugUtils: 'Utilities/debug.utils',
                StorageUtils: 'Utilities/storage.utils',
                EventsUtils: 'Utilities/events.utils',
                Utils: 'Utilities/utilities',
                Effects: 'Utilities/effects',

                //models
                Villager: 'models/Villager.model',
                Village: 'models/Village.model',
                Resource: 'models/Resource.model',
                Job: 'models/Job.model',
                Building: 'models/Building.model',
                CultureTrait: 'models/CultureTrait.model',
                CultureValues: 'models/CultureValues.model',
                Upgrade: 'models/Upgrade.model',
                Action: 'models/Action.model',
                GameEvent: 'models/GameEvent.model',
                FeedEvent: 'models/FeedEvent.model',

                //collections
                JobsCollection: 'Collections/jobs.collection',
                VillagersCollection: 'Collections/villagers.collection',
                ResourcesCollection: 'Collections/resources.collection',
                BuildingsCollection: 'Collections/buildings.collection',
                CultureTraitsCollection: 'Collections/cultureTraits.collection',
                UpgradesCollection: 'Collections/Upgrades.collection',
                ActionsCollection: 'Collections/Actions.collection',
                GameEventsCollection: 'Collections/gameEvents.collection',
                FeedEventsCollection: 'Collections/feedEvents.collection',
                //Objects
                Objects: 'Objects/game.objects',
                Names: 'Objects/names.object',
                ActionsObject: 'Objects/actions.object',
                BuildingsObject: 'Objects/buildings.object',
                CultureTraitsObject: 'Objects/cultureTraits.object',
                CultureValuesObject: 'Objects/cultureValues.object',
                GameEventsObject: 'Objects/gameEvents.object',
                JobsObject: 'Objects/jobs.object',
                ResourcesObject: 'Objects/resources.object',
                UpgradesObject: 'Objects/upgrades.object',
                VillageObject: 'Objects/village.object',
                VillagersObject: 'Objects/villagers.object',

                //Controllers
                GameController: 'Controllers/Game.controller.view',
                VillagersController: 'Controllers/Villager.controller.view',
                VillageController: 'Controllers/Village.controller.view',
                FeedController: 'Controllers/Feed.controller.view',
                GameEventsController: 'Controllers/GameEvents.controller.view',
                ResourcesController: 'Controllers/Resources.controller.view',
                BuildingsController: 'Controllers/Buildings.controller.view',
                UpgradesController: 'Controllers/Upgrades.controller.view',
                CultureController: 'Controllers/Culture.controller.view',
                WorkersController: 'Controllers/Workers.controller.view',
                ActionsController: 'Controllers/Actions.controller.view',

                //views
                BaseView: 'Views/base.abstract.view',
                BuildingView: 'Views/building.view',
                BuilderActionView: 'Views/builderAction.view',
                ActionView: 'Views/action.view',
                ResourceView: 'Views/resource.view',
                FeedEventView: 'Views/feedEvent.view'
        },
	shim: {
		jQuery: {
			exports: '$'
		},
		Underscore: {
			exports: '_'
		},
		Backbone: {
			deps: ['Underscore', 'jQuery'],
			exports: 'Backbone'
		}
        }
    }
);