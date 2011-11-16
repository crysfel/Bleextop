/**
 * @class Bleext.modules.catalogs.applications.view.ApplicationForm
 * @extends Bleext.abstract.Form
 * requires 
 * @autor Crysfel Villa
 * @date Tue Aug  2 01:19:40 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.modules.catalogs.applications.view.ApplicationForm",{
	extend		: "Bleext.abstract.Form",
	

	initComponent	: function() {
		var me = this;
		
        me.items = this.buildItems();

		me.callParent();
	},
	
	buildItems		: function(){
		return	{
			xtype	: "fieldset",
			padding	: 10,
			defaults	: {xtype:"textfield",anchor	: '100%'},
			items	: [{
				xtype		: "hidden",
				name		: "application_k"
			},{
				xtype		: "hidden",
				name		: "application_parent_k"
			},{
				fieldLabel	: "Name",
				name		: "name",
				allowBlank	: false
			},{
				fieldLabel	: "Controller",
				name		: "klass"
			},{
				xtype		: "textarea",
				fieldLabel	: "Description",
				name		: "description"
			},{
				xtype		: "checkbox",
				name		: "singleton",
				boxLabel	: "Singleton",
				hideEmptyLabel 	: false,
				inputValue	: 1,
				uncheckedValue: 0,
				labelSeparator 	: "",
				fieldLabel		: ""
			},{
				xtype		: "checkbox",
				name		: "active",
				boxLabel	: "Active",
				hideEmptyLabel 	: false,
				inputValue	: 1,
				uncheckedValue: 0,
				labelSeparator 	: "",
				fieldLabel		: ""
			}]
		};
	}
});