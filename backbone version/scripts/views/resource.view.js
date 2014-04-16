define(['Global', 'Utils', 'BaseView', 'text!templates/resource.template.html'], function(G, Utils, BaseView, ResourceTemplate){
	return BaseView.extend({
		tagName: 'li',
		className: 'resource',
		template: _.template(ResourceTemplate),
	});
});