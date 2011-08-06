/**
 * @class Bleext.desktop.Shortcuts
 * @extends Ext.view.View
 * requires 
 * @autor Crysfel Villa
 * @date Thu Jul 28 23:10:29 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.desktop.Shortcuts",{
	extend		: "Ext.view.View",
	
	
	cls			: "bleext-shortcuts-view",
	overItemCls	: "bleext-shortcut-over",
    trackOver	: true,
    itemSelector: "div.bleext-shortcut",

	/**
     * @cfg {String} shortcutTpl
     * This XTemplate is used to render items in the DataView. If this is changed, the
     * {@link shortcutItemSelect} will probably also need to changed.
     */
    shortcutTpl: [
        '<tpl for=".">',
            '<div class="bleext-shortcut">',
                '<div class="bleext-shortcut-icon {iconCls}">',
                    '<img src="',Ext.BLANK_IMAGE_URL,'" title="{text}">',
                '</div>',
                '<span class="bleext-shortcut-text">{text}</span>',
            '</div>',
        '</tpl>',
        '<div class="x-clear"></div>'
    ],

	initComponent	: function() {
		var me = this;
		
		me.store = Ext.create("Ext.data.ArrayStore",{
			fields	: ["text","class","iconCls"]
		});
		me.getShorcuts(me.applications);
        me.tpl = new Ext.XTemplate(me.shortcutTpl);

		me.callParent();
	},
	
	getShorcuts	: function(applications){
		if(applications){
			Ext.each(applications,function(app){
				if(app.menu){
					this.getShorcuts(app.menu);
				}else{
					if(app.configurations){
						var config = Ext.decode(app.configurations);
						if(config && config.shorcutIconCls){
							app.iconCls = config.shorcutIconCls;
							this.store.add(app);
						}
					}
				}
			},this);
		}
	}
});