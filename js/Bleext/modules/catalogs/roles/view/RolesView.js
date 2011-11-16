/**
 * @class Bleext.modules.catalogs.roles.view.RolesView
 * @extends Ext.view.View
 * requires 
 * @autor Crysfel Villa
 * @date Tue Aug  9 19:27:25 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.catalogs.roles.view.RolesView",{
	extend		: "Ext.view.View",
	requires	: [
		"Bleext.modules.catalogs.roles.store.Roles",
		"Bleext.modules.catalogs.roles.model.Role"
	],
	
	cls				: "bleext-roles-view",
	itemSelector	: "div.bleext-role-wrap",
	selectedItemCls	: "x-btn-default-toolbar-large-pressed",
	emptyText		: "No roles found",
	droppable		: true,
	
	
	initComponent	: function() {
		var me = this;
		
		me.addEvents("itemdrop");
		
		me.store = Ext.create("Bleext.modules.catalogs.roles.store.Roles",{
			autoLoad	: false
		});
		me.tpl = me.createTemplate();
        
		if(me.droppable){
			me.listeners = {
				scope	: me,
				render	: me.initializeDropZone
			};
		}

		me.callParent();
	},
	
	createTemplate	: function(){
		var tpl = new Ext.XTemplate(
			'<p class="bleext-roles-view-text">Drop users in any role.</p>',
			'<tpl for=".">',
				'<div class="bleext-role-wrap">',
					'<p><span>{name} ({users} Users)</span></p>',
					'<p>{description}</p>',
				'</div>',
			'</tpl>');
		
		return tpl;
	},
	
	initializeDropZone	: function(view){
		view.dropZone = Ext.create("Ext.dd.DropZone", view.el, {

			//If the mouse is over a target node, return that node. This is
			//provided as the "target" parameter in all "onNodeXXXX" node event handling functions
			getTargetFromEvent: function(e) {
				return e.getTarget(view.itemSelector);
			},

			//On entry into a target node, highlight that node.
			onNodeEnter : function(target, dd, e, data){
				Ext.fly(target).addCls("x-btn-default-toolbar-large-over");
			},

			//On exit from a target node, unhighlight that node.
			onNodeOut : function(target, dd, e, data){
				Ext.fly(target).removeCls("x-btn-default-toolbar-large-over");
			},

			//While over a target node, return the default drop allowed class which
			//places a "tick" icon into the drag proxy.
			onNodeOver : function(target, dd, e, data){
				return Ext.dd.DropZone.prototype.dropAllowed;
			},

			//On node drop, we can interrogate the target node to find the underlying
			//application object that is the real target of the dragged data.
			//In this case, it is a Record in the GridPanel's Store.
			//We can use the data set up by the DragZone's getDragData method to read
			//any data we decided to attach.
			onNodeDrop : function(target, dd, e, data){
				var role = view.getRecord(target);
				if(role){
					view.fireEvent("itemdrop",role,data);
					return true;
				}
				return false;
			}
		});
	}
});