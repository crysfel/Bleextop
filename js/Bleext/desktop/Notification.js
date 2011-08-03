/**
 * @class Bleext.desktop.Notification
 * @extends Ext.Component
 * @autor Crysfel Villa
 * @date Sun Jul 17 22:52:13 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.desktop.Notification",{
	extend		: "Ext.panel.Panel",
	mixins		: {
		
	},
	config		: {
		message	: "This is a message!",
		time	: 3000
	},

	cls				: "bleext-notification",
	floating		: true,
	width			: 250,
	height			: 80,
	bodyPadding		: 10,
	closable		: true,
	ui				: "bubble",
	
	constructor: function(config) { 
			this.initConfig(config); 

			this.callParent(arguments); 

			return this; 
	},
	
	initComponent	: function() {
		var me = this, 
			size = Ext.getBody().getViewSize();
		
        me.html = {
			tag	: "p",
			html: me.getMessage()
		};
		me.renderTo= Ext.getBody();
		me.x = size.width - me.width - 15;
		me.y = 15;
		me.callParent();
		
		me.doClose = function ()  {
            me.doClose = Ext.emptyFn; // dblclick can call again...
            me.el.disableShadow();
            me.el.fadeOut({
                listeners: {
                    afteranimate: function () {
                        me.destroy();
                    }
                }
            });
        };

		setTimeout(function(){
			me.close();
		},me.getTime());
	}
});