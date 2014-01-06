define([
	'Names', 'ActionsObject', 'BuildingsObject', 'CultureTraitsObject', 'CultureValuesObject', 'GameEventsObject',
	'JobsObject', 'ResourcesObject', 'UpgradesObject', 'VillageObject', 'VillagersObject'
], function(
	Names, ActionsObject, BuildingsObject, CultureTraitsObject, CultureValuesObject, GameEventsObject,
	JobsObject, ResourcesObject, UpgradesObject, VillageObject, VillagersObject
){
	return {
		names: Names,
		actions: ActionsObject,
		buildings: BuildingsObject,
		cultureTraits: CultureTraitsObject,
		cultureValues: CultureValuesObject,
		gameEvents: GameEventsObject,
		jobs: JobsObject,
		resources: ResourcesObject,
		upgrades: UpgradesObject,
		village: VillageObject,
		villagers: VillagersObject
	};
});