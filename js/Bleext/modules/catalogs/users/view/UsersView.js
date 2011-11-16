/**
 * @class Bleext.modules.catalogs.users.view.UsersView
 * @extends Ext.view.View
 * requires 
 * @autor Crysfel Villa
 * @date Tue Aug  9 18:26:55 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.catalogs.users.view.UsersView",{
	extend		: "Ext.view.View",
	
	requires	: [
		"Bleext.modules.catalogs.users.model.User",
		"Bleext.modules.catalogs.users.store.Users"
	],
	
	itemSelector	: "div.bleext-user-wrap",
	emptyText		: "No users founds",
	store			: "Bleext.modules.catalogs.users.store.Users",
	draggable		: true,
	
	initComponent	: function() {
		var me = this;

		me.tpl = me.createTemplate();
		me.store = Ext.create("Bleext.modules.catalogs.users.store.Users",{
			autoLoad	: false
		});
		
		if(me.draggable){
			me.listeners = {
				scope	: this,
				render	: this.initializeDragZone
			};
		}
		me.callParent();
	},
	
	createTemplate	: function(){
		var tpl = new Ext.XTemplate(
			'<tpl for=".">',
				'<div class="bleext-user-wrap x-toolbar-default">',
					'<img src="{base_path}{avatar}" />',
					'<p><span>{name} {lastname}</span></p>',
					'<p>{username}</p>',
				'</div>',
			'</tpl>');
		
		return tpl;
	},
	
	initializeDragZone	: function(view){
		 view.dragZone = Ext.create("Ext.dd.DragZone", view.getEl(),{
			//On receipt of a mousedown event, see if it is within a draggable element.
			//Return a drag data object if so. The data object can contain arbitrary application
			//data, but it should also contain a DOM element in the ddel property to provide
			//a proxy to drag.
			getDragData: function(e) {
				var sourceEl = e.getTarget(view.itemSelector, 10), d;
				if (sourceEl) {
					d = sourceEl.cloneNode(true);
					d.id = Ext.id();
					Ext.fly(d).setWidth(150);
					return view.dragData = {
						sourceEl	: sourceEl,
						repairXY	: Ext.fly(sourceEl).getXY(),
						ddel		: d,
						user		: view.getRecord(sourceEl).data
					};
				}
			},

			//Provide coordinates for the proxy to slide back to on failed drag.
			//This is the original XY coordinates of the draggable element.
			getRepairXY: function() {
	            return this.dragData.repairXY;
			}
		});
	}
});