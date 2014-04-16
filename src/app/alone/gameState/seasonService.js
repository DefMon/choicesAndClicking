angular.module('ngAlone.gameState')
.service('SeasonService', ['storage', 'gameConstants', function(storage, gameConstants){
    var seasonTick = storage.get('seasonTick') || 0;
    var seasonId = storage.get('season') || 0;

    function advanceSeason() {
        seasonId++;
        if (seasonId === gameConstants.seasons.length) {
            seasonId = 0;
            console.log('Seasons change!');
        }
        storage.set('season', seasonId);
    }


    var publicFunctions = {
        tick: function(){
            seasonTick++;
            if(seasonTick === gameConstants.seasonAdvanceTick) {
                seasonTick = 0;
                advanceSeason();
            }
            storage.set('seasonTick', seasonTick);
        },
        getCurrentSeasonId: function(){
            return seasonId;
        },
        getCurrentSeason: function(){
            return gameConstants.seasons[seasonId];
        },
        getCurrentSeasonName: function(){
            return gameConstants.seasons[seasonId];
        }
    };

    return publicFunctions;
}]);