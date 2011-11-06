/**
 * @class Bleext.desktop.TaskBar
 * @extends Ext.Component
 * @autor Crysfel Villa
 * @date Mon Jul 11 11:08:55 CDT 2011
 *
 * Class for the Taskbar
 *
 **/

Ext.define("Bleext.desktop.Taskbar",{
	extend 			: "Ext.toolbar.Toolbar",
	requires		: [
		"Bleext.desktop.StartMenu",
		"Bleext.desktop.StartButton"
	],
	
	quickStart		: [],
	
	initComponent	: function () {
        var me = this;

		me.items = this.buildItems();

		me.callParent();
    },

	buildItems		: function(){
		var me = this,
			sppliter = {
				xtype	: "splitter", html: "&#160;",
				height	: 14, width: 2, // TODO - there should be a CSS way here
				cls		: "x-toolbar-separator x-toolbar-separator-horizontal bleext-toolbar-splitter"
            };

		me.startMenu = Ext.create("Bleext.desktop.StartMenu",{
			applications	: me.applications,
			user			: me.user,
			position		: me.dock
		});

		me.startButton = Ext.create("Bleext.desktop.StartButton",{
			menu		: me.startMenu
		});
       
		me.quickStart = Ext.create("Ext.toolbar.Toolbar",this.getQuickStart());
		me.windowBar = Ext.create("Bleext.desktop.TaskbarContainer");
		
		
		return [
			me.startButton,
			me.quickStart,
			sppliter,
			me.windowBar
		];
	},
	
	/**
     * This method returns the configuration object for the Quick Start toolbar. A derived
     * class can override this method, call the base version to build the config and
     * then modify the returned object before returning it.
     */
    getQuickStart	: function () {
		var me = this, ret = {
			minWidth		: 20,
			width			: 60,
			enableOverflow	: true,
			cls				: "bleext-toolbar-container",
			items			: [
				{overflowText:"Show desktop",tooltip:{ text: "Show desktop", align: 'bl-tl' },iconCls:"bleext-desktop-icon"},
				{overflowText:"Settings",tooltip:{ text: "Settings", align: 'bl-tl' },iconCls:"bleext-settings-icon",handler:function(){Bleext.App.showNotification({message:"Testing this notification! this is just a dommy text!"});}}
			]
        };

        Ext.each(this.quickStart, function (item) {
			Ext.applyIf(item,{
				tooltip		: { text: item.text, align: 'bl-tl' },
				overflowText: item.text,
				iconCls		: "bleext-default-quickstart-icon",
				scope		: Bleext.App,
				handler		: Bleext.App.runApplication
			});
        });

        return ret;
    },

	addTaskButton	: function(win) {
        var config = {
			cls			: "bleext-toolbar-button",
            iconCls		: win.iconCls,
            enableToggle: true,
            toggleGroup	: 'all',
            width		: 120,
            text		: Ext.util.Format.ellipsis(win.title, 20),
            listeners	: {
                click: this.onWindowBtnClick,
                scope: this
            },
            win			: win
        };

        var cmp = this.windowBar.add(config);
        cmp.toggle(true);
        return cmp;
    },

	removeTaskButton: function (btn) {
        var found, me = this;
        me.windowBar.items.each(function (item) {
            if (item === btn) {
                found = item;
            }
            return !found;
        });
        if (found) {
            me.windowBar.remove(found);
        }
        return found;
    },

	onWindowBtnClick	: function(btn){
		var win = btn.win;

        if (win.minimized || win.hidden) {
            win.show();
        } else if (win.active) {
            win.minimize();
        } else {
            win.toFront();
        }
	},
	
	setActiveButton: function(btn) {
        if (btn) {
            btn.toggle(true);
        } else {
            this.windowBar.items.each(function (item) {
                if (item.isButton) {
                    item.toggle(false);
                }
            });
        }
    }
});