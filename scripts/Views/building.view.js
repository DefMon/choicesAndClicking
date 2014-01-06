define(['Global', 'Utils', 'BaseView', 'text!templates/building.template.html'], function(G, Utils, BaseView, ResourceTemplate){
	return BaseView.extend({
		tagName: 'li',
		className: 'building',
		template: _.template(ResourceTemplate)
	});
});