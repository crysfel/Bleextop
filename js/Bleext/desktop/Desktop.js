/**
 * @class Bleext.desktop.Desktop
 * @extends Ext.panel.Panel
 * requires Bleext.desktop.TaskBar
 * @autor Crysfel Villa
 * @date Thu Jul 28 20:56:58 CDT 2011
 *
 * The desktop class
 *
 *
 **/

Ext.define("Bleext.desktop.Desktop",{
	extend		: "Ext.panel.Panel",
	alias		: "widget.desktop",
	requires	: [
		"Bleext.desktop.Taskbar",
		"Bleext.desktop.Shortcuts",
		"Bleext.desktop.Wallpaper",
		"Bleext.desktop.FitAllLayout"
	],
	
	id			: "bleext-desktop",
	border		: false,
	layout		: "fitall",

	initComponent	: function() {
		var me = this;

		me.taskbar = Ext.create("Bleext.desktop.Taskbar",me.userConfig);
		me.dockedItems = [me.taskbar];
		me.windowMgr = Ext.create("Bleext.desktop.WindowManager",{taskbar:me.taskbar});

		me.shortcuts = Ext.create("Bleext.desktop.Shortcuts",{
			applications	: me.userConfig.applications
		});
		me.wallpaper = Ext.create("Bleext.desktop.Wallpaper",{
			wallpaper	: Bleext.BASE_PATH+me.userConfig.config.wallpaper
		});
		me.windowMenu = new Ext.menu.Menu(me.createWindowMenu());

		me.items = [
			me.wallpaper,
			me.shortcuts
		];
        
		me.callParent();
		
		me.shortcuts.on("itemclick", me.onShortcutItemClick, me);
		Bleext.Ajax.on("sessionexpired",Bleext.App.showLoginWindow,Bleext.App);
		Bleext.Ajax.on("showerror",Bleext.App.showNotification,Bleext.App);
	},
	
	createWindowMenu: function () {
        var me = this;
        return {
            defaultAlign: 'br-tr',
            items: [
                { text: 'Restore', handler: me.windowMgr.onWindowMenuRestore, scope: me.windowMgr },
                { text: 'Minimize', handler: me.windowMgr.onWindowMenuMinimize, scope: me.windowMgr },
                { text: 'Maximize', handler: me.windowMgr.onWindowMenuMaximize, scope: me.windowMgr },
                '-',
                { text: 'Close', handler: me.windowMgr.onWindowMenuClose, scope: me }
            ],
            listeners: {
                beforeshow	: me.windowMgr.onWindowMenuBeforeShow,
                hide		: me.windowMgr.onWindowMenuHide,
                scope		: me.windowMgr
            }
        };
    },

	onShortcutItemClick	: function(dataview,record,el,index,event){
		Bleext.App.runApplication({
			initialConfig : record.data
		});
	}
});