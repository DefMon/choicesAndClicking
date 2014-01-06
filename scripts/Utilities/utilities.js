define(['MathsUtils', 'DebugUtils', 'StorageUtils', 'EventsUtils'],
function(MathsUtils, DebugUtils, StorageUtils, EventsUtils){
	return {
		debug: DebugUtils,
		storage: StorageUtils,
		events: EventsUtils,
		maths: MathsUtils
	};
});