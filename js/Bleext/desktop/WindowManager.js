/**
 * @class Bleext.desktop.WindowManager
 * @extends Ext.Component
 * requires Ext.util.MixedCollection
 * @autor Crysfel Villa
 * @date Sun Jul 17 14:54:19 CDT 2011
 *
 * This class manage the windows
 *
 *
 **/

Ext.define("Bleext.desktop.WindowManager",{
	extend				: "Ext.Component",
	requires			: [
		"Ext.util.MixedCollection",
		"Bleext.desktop.LoadingModule",
		"Bleext.desktop.Window"
	],

	xTickSize			: 1,
    yTickSize			: 1,
	lastActiveWindow	: null,
	activeWindowCls		: 'bleext-desktop-active-win',
    inactiveWindowCls	: 'bleext-desktop-inactive-win',

	initComponent		: function() {
		
		this.windows = new Ext.util.MixedCollection();
		this.loader = Ext.create("Bleext.desktop.LoadingModule",{
			hidden	: true
		});
        
		this.callParent();
	},
	
	/**
	 * Creates the main window for an application. If the application is configured as "singleton" this method return the same windows every time.
	 * @param {Object} app The configuration object for the application
	 * @return {Bleext.desktop.Window} Return a window
	 */
	createWindow	: function(app){
		var me = this, 
			win,
			cfg = {
				title		: app.text,
				singleton 	: false
            };
		
		try{
			var customCfg = Ext.decode(app.configurations);
			Ext.apply(cfg,customCfg || {});
		}catch(e){}

		
		if(!app.klass){
			return false;
		}

		if(cfg.singleton){
			cfg.id = app.klass.replace(/\./g,'-');
		}

		//if only one instance of the application is allowed
		if(cfg.singleton && me.windows.containsKey(cfg.id)){
			return me.windows.get(cfg.id);
		}
		
        win = Ext.create("Bleext.desktop.Window",cfg);

		me.windows.add(win);
		win.taskButton = me.taskbar.addTaskButton(win);
        win.animateTarget = win.taskButton.el;

        win.on({
            activate	: me.updateActiveWindow,
            beforeshow	: me.updateActiveWindow,
            deactivate	: me.updateActiveWindow,
            minimize	: me.minimizeWindow,
            destroy		: me.onWindowClose,
            scope		: me
        });

        win.on({
            afterrender: function () {
                win.dd.xTickSize = me.xTickSize;
                win.dd.yTickSize = me.yTickSize;

                if (win.resizer) {
                    win.resizer.widthIncrement = me.xTickSize;
                    win.resizer.heightIncrement = me.yTickSize;
                }
            },
            single: true
        });
		
        return win;
	},
	
	minimizeWindow		: function(win){
		win.minimized = true;
        win.hide();
	},
    
	onWindowClose: function(win) {
        var me = this;
        me.windows.remove(win);
        me.taskbar.removeTaskButton(win.taskButton);
        me.updateActiveWindow();
    },
	
	updateActiveWindow: function () {
        var me = this, 
			activeWindow = me.getActiveWindow(), 
			last = me.lastActiveWindow;
			
        if (activeWindow === last) {
            return;
        }

        if (last) {
            if (last.el.dom) {
                last.addCls(me.inactiveWindowCls);
                last.removeCls(me.activeWindowCls);
            }
            last.active = false;
        }

        me.lastActiveWindow = activeWindow;

        if (activeWindow) {
            activeWindow.addCls(me.activeWindowCls);
            activeWindow.removeCls(me.inactiveWindowCls);
            activeWindow.minimized = false;
            activeWindow.active = true;
        }

        me.taskbar.setActiveButton(activeWindow && activeWindow.taskButton);
        // prepends the active app window's title to the Bleext desktop window title, e.g.: [app title] - desktop title
        if (!window.document.originalTitle) {
            window.document.originalTitle = window.document.title;
        }
        window.document.title = ((activeWindow && activeWindow.title) ? '['+ activeWindow.title +'] - ' : '') + window.document.originalTitle;
    },

	getActiveWindow: function () {
        var win = null,
            zmgr = this.getDesktopZIndexManager();

        if (zmgr) {
            // We cannot rely on activate/deactive because that fires against non-Window
            // components in the stack.

            zmgr.eachTopDown(function (comp) {
                if (comp.isWindow && !comp.hidden) {
                    win = comp;
                    return false;
                }
                return true;
            });
        }

        return win;
    },
	
	getDesktopZIndexManager: function () {
        var windows = this.windows;
        // TODO - there has to be a better way to get this...
        return (windows.getCount() && windows.getAt(0).zIndexManager) || null;
    },

	getCount				: function(){
		return this.windows.getCount();
	},
	
	cascadeWindows: function() {
        var x = 0, y = 0,
            zmgr = this.getDesktopZIndexManager();

        zmgr.eachBottomUp(function(win) {
            if (win.isWindow && win.isVisible() && !win.maximized) {
                win.setPosition(x, y);
                x += 20;
                y += 20;
            }
        });
    },

	minimizeAllWindows: function() {
        var x = 0, y = 0,
            zmgr = this.getDesktopZIndexManager();

        zmgr.eachBottomUp(function(win) {
            if (win.isWindow && win.isVisible()) {
                this.minimizeWindow(win);
            }
        },this);
    },

	closeAllWindows: function() {
        var x = 0, y = 0,
            zmgr = this.getDesktopZIndexManager();

        zmgr.eachBottomUp(function(win) {
            if (win.isWindow) {
                win.close();
            }
        });
    },

	onWindowMenuBeforeShow: function (menu) {
        var items = menu.items.items, win = menu.theWin;
        items[0].setDisabled(win.maximized !== true && win.hidden !== true); // Restore
        items[1].setDisabled(win.minimized === true); // Minimize
        items[2].setDisabled(win.maximized === true || win.hidden === true); // Maximize
    },

    onWindowMenuClose: function () {
        var me = this, win = me.windowMenu.theWin;

        win.close();
    },

    onWindowMenuHide: function (menu) {
        menu.theWin = null;
    },

    onWindowMenuMaximize: function () {
        var me = this, win = me.windowMenu.theWin;

        win.maximize();
    },

    onWindowMenuMinimize: function () {
        var me = this, win = me.windowMenu.theWin;

        win.minimize();
    },

    onWindowMenuRestore: function () {
        var me = this, win = me.windowMenu.theWin;

        me.restoreWindow(win);
    }
});