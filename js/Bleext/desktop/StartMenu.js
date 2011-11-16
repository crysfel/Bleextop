/**
 * @class Bleext.desktop.StartMenu
 * @extends Ext.menu.Menu
 * @autor Crysfel Villa
 * @date Mon Jul 11 12:22:39 CDT 2011
 *
 * Class for the start menu
 *
 **/

Ext.define('Bleext.desktop.StartMenu', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.menu.Menu',
        'Ext.toolbar.Toolbar'
    ],

    ariaRole: 'menu',

    cls: 'x-menu bleext-start-menu',

    defaultAlign: 'bl-tl',

    iconCls: 'user',

    floating: true,

    shadow: true,

    // We have to hardcode a width because the internal Menu cannot drive our width.
    // This is combined with changing the align property of the menu's layout from the
    // typical 'stretchmax' to 'stretch' which allows the the items to fill the menu
    // area.
    width	: 300,
	height	: 300,

    initComponent: function() {
        var me = this;

		me.title = me.user.name+' '+me.user.lastname;
		
		
		
		var menu = me.setHandler(me.applications);
        me.menu = new Ext.menu.Menu({
            cls		: 'ux-start-menu-body',
            border	: false,
            floating: false,
            items	: menu
        });
        me.menu.layout.align = 'stretch';
		
        me.items = [me.menu];
        me.layout = 'fit';

        Ext.menu.Manager.register(me);
        me.callParent();
        // TODO - relay menu events

        me.toolbar = new Ext.toolbar.Toolbar(Ext.apply({
            dock: 'right',
            cls: 'ux-start-menu-toolbar',
            vertical: true,
            width: 100
        //}, me.toolConfig));
		}, {
            width: 100,
            items: [
                {
                    text	:'Settings',
                    iconCls	:'bleext-settings-icon',
                    handler	: me.onSettings,
                    scope	: me
                },
                '-',
                {
                    text	:'Logout',
                    iconCls	:'bleext-logout-icon',
                    handler	: me.onLogout,
                    scope	: me
                }
            ]
        }));

        me.toolbar.layout.align = 'stretch';
        me.addDocked(me.toolbar);

        delete me.toolItems;

        me.on('deactivate', function () {
            me.hide();
        });
    },

    addMenuItem: function() {
        var cmp = this.menu;
        cmp.add.apply(cmp, arguments);
    },

    addToolItem: function() {
        var cmp = this.toolbar;
        cmp.add.apply(cmp, arguments);
    },

    showBy: function(cmp, pos, off) {
        var me = this;

        if (me.floating && cmp) {
            me.layout.autoSize = true;
            me.show();

            // Component or Element
            cmp = cmp.el || cmp;

            // Convert absolute to floatParent-relative coordinates if necessary.
            var xy = me.el.getAlignToXY(cmp, pos || me.defaultAlign, off);
            if (me.floatParent) {
                var r = me.floatParent.getTargetEl().getViewRegion();
				switch(me.position){
					case "top"		: 
							xy[0] -= r.x;
							xy[1] = r.bottom - r.y/2;
							break;
					case "bottom"	:
							xy[0] -= r.x;
			                xy[1] -= r.y;
							break;
					default	: break;
				}
                
            }
            me.showAt(xy);
            me.doConstrain();
        }
        return me;
    },

	/**
	 * This method set a handler for each button
	 * @param {Array} applications The application list for the start menu
	 * @return {Array} Return the same array but add a handler to each button
	 */
	setHandler	: function(applications) {
		Ext.each(applications,function(item){
			if(item.menu){
				item.iconCls = "bleext-folder-icon";
				item.menu = this.setHandler(item.menu);
			}else{
				try{
					var cfg = Ext.decode(item.config);
					item.iconCls = cfg.iconCls;
				}catch(e){}
				item.scope = Bleext.App;
				item.handler = Bleext.App.runApplication;
			}
		},this);
		return applications;
	},
	
	onLogout	: function(){
		Ext.Msg.confirm("Confirm","Are you sure you want to logout?",function(btn){
			if(btn === "yes"){
				document.location = Bleext.Constants.DESKTOP_LOGOUT_URL;
			}
		});
	}

}); // StartMenu

