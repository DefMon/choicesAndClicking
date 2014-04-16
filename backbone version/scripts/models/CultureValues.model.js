define(['Global'], function(G){
    return Backbone.Model.extend({
        defaults: {
            id: 1,
            name: 'cultureValues',
            values: {}
        }
    });
});