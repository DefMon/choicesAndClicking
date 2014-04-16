define(['Backbone', 'LocalStorage', 'Mediator'], {
	villagers: {
		nationality: {
			native: 0,
			ship: 1,
		},
		gender: {
			female: 0,
			male: 1
		},
		workerPool: 'gatherFood'
	},
	events: {
		takeAction: 'action',
		constructBuilding: 'build'
	},
	resources: {
		priorities: {
			food: 0,
			material: 1,
			production: 2
		}
	},
	seasons: ['Spring', 'Summer', 'Autumn', 'Winter'],
	storage: {
		village: 'village',
		villagers: 'villagers',
		seasonTick: 'seasonTick',
		jobs: 'jobs',
		resources: 'resources',
		buildings: 'buildings',
		cultureValues: 'cultureValues',
		cultureTraits: 'cultureTraits',
		upgrades: 'upgrades',
		actions: 'actions',
		gameEvents: 'gameEvents',
		feedEvents: 'feedEvents'
	},
	timers: {
		eventTimeoutMin: 30000,
		eventTimeoutMax: 300000,
		resourceInterval: 10000,
		seasonInterval: 5000,
		seasonTicks: 10
	}
});