define(['Global', 'Utils', 'BaseView', 'text!templates/action.button.template.html'], function(G, Utils, BaseView, ButtonTemplate){
    return BaseView.extend({
        tagName: 'div',
        className: 'action builderAction',
        template: _.template(ButtonTemplate),
        events: {
            'click .actionButton' : 'triggerAction'
        },
        triggerAction: function() {
            Utils.events.trigger(G.events.constructBuilding, this.model);
        }
    });
});