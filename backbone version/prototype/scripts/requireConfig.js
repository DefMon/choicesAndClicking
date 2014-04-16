require.config({
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
        Global: 'gameGlobalVariables',
        Utilities: 'utilities/utils.game',
        GameObjects: 'gameObjects',
        EffectUtilities: 'utilities/utils.effects',

        //models
        Building: 'models/building.model',
        FeedEvent: 'models/feed.event.model',
        Job: 'models/job.model',
        ResourceAction: 'models/resource.action.model',
        Resource: 'models/resource.model',
        Upgrade: 'models/upgrade.model',
        Village: 'models/village.model',
        GameEvent: 'models/game.event.model',

        //collections
        FeedEventsCollection: 'collections/feed.events.collection',
        BuildingsCollection: 'collections/buildings.collection',
        JobsCollection: 'collections/jobs.collection',
        ResourceActionsCollection: 'collections/resource.actions.collection',
        ResourcesCollection: 'collections/resource.collection',
        UpgradesCollection: 'collections/upgrades.collection',
        GameEventCollection: 'collections/game.events.collection',
        VillageCollection: 'collections/village.collection',
        CultureCollection: 'collections/culture.collection',

		//views
		GameView: 'views/game.view',

		VillageView: 'views/village.controller.view',

		BuildingActionView: 'views/buildings/building.action.view',
		BuildingControllerView: 'views/buildings/building.controller.view',
		BuildingView: 'views/buildings/building.view',

		FeedControllerView: 'views/feed/feed.controller.view',
		FeedEventView: 'views/feed/feed.event.view',

		JobControllerView: 'views/jobs/job.controller.view',
		JobView: 'views/jobs/job.view',

		ResourceActionView: 'views/resources/resource.action.view',
		ResourceControllerView: 'views/resources/resource.controller.view',
		ResourceView: 'views/resources/resource.view',

		UpgradeActionView: 'views/upgrades/upgrade.action.view',
		UpgradeControllerView: 'views/upgrades/upgrade.controller.view',
		CultureControllerView: 'views/upgrades/culture.controller.view',
		UpgradeView: 'views/upgrades/upgrade.view',

		NotificationView: 'views/events/notification.view',
		GameEventControllerView: 'views/events/game.event.controller.view',

		//Objects
		ResourcesObject: 'objects/resources.object',
		ResourceActionsObject: 'objects/resourceActions.object',
		BuildingsObject: 'objects/buildings.object',
		UpgradesObject: 'objects/upgrades.object',
		JobsObject: 'objects/jobs.object',
		CultureObject: 'objects/culture.object',
		VillageObject: 'objects/village.object',
		NamesObject: 'objects/names.object',
		GameEventsObject: 'objects/gameEvents.object'
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
});