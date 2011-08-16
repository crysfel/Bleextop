/**
 * @class Bleext.desktop.Window
 * @extends Ext.window.Window
 * requires Ext.ux.statusbar.StatusBar
 * @autor Crysfel Villa
 * @date Wed Jul 27 22:10:51 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.desktop.Window",{
	extend		: "Ext.window.Window",
	requires		: ["Ext.ux.statusbar.StatusBar"],
	
	title			: "Default title application",
	stateful		: false,
    isWindow		: true,
    minimizable		: true,
    maximizable		: true,
	width			: Bleext.desktop.Constants.DEFAULT_WINDOW_WIDTH,
	height			: Bleext.desktop.Constants.DEFAULT_WINDOW_HEIGHT,
	layout			: "fit",
	//renderTo		: Bleext.App.desktop.body.dom,
	constrain		: true,
	bodyPadding		: 2,

	initComponent	: function() {
		var me = this;

		this.statusBar = Ext.create("Ext.ux.statusbar.StatusBar", {
			dock		: "bottom",
			defaultText	: "Ready"
		});
		
		this.dockedItems = [this.statusBar];
        
		me.callParent();
	},
	
	doClose 		: function ()  {
        this.doClose = Ext.emptyFn; // dblclick can call again...
        this.el.disableShadow();
        this.el.fadeOut({
            listeners: {
				scope	: this,
                afteranimate: function () {
                    this.destroy();
                }
            }
        });
    }
});