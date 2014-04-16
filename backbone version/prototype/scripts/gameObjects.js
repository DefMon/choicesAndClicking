define([
	'Global',
	'ResourcesObject',
	'ResourceActionsObject',
	'BuildingsObject',
	'UpgradesObject',
	'JobsObject',
	'CultureObject',
	'VillageObject',
	'NamesObject',
	'GameEventsObject'
], function(
	G,
	ResourcesObject,
	ResourceActionsObject,
	BuildingsObject,
	UpgradesObject,
	JobsObject,
	CultureObject,
	VillageObject,
	NamesObject,
	GameEventsObject
){
	var idCount = 0;

	return {
		resources: ResourcesObject,
		resourceActions: ResourceActionsObject,
		buildings: BuildingsObject,
		upgrades: UpgradesObject,
		jobs: JobsObject,
		culture: CultureObject,
		village: VillageObject,
		forenames: NamesObject.forenames,
		surnames: NamesObject.surnames,
		gameEvents: GameEventsObject
	};
});