/**
 * @class Bleext.modules.login.LoginPanel
 * @extends Bleext.ui.ModalPanel
 * @autor Crysfel Villa
 * @date Sun Jul 10 16:27:45 CDT 2011
 *
 * The login Panel.
 *
 **/


Ext.define("Bleext.modules.login.LoginWindow",{
	extend 			: "Bleext.abstract.ModalWindow",
	requires		: ["Bleext.modules.login.LoginForm"],
	
	layout			: "auto",
	modal			: false,
	width			: 400,
	height			: 240,
	closable		: false,
	
	forward			: true,
	
	initComponent: function() {
		
        this.items = this.buildItems();

		this.callParent();
	},
	
	buildItems	: function(){
		return [{
			xtype	: "component",
			html 	: '<img src="'+Bleext.Constants.LOGIN_IMAGE+'" />' 
		},
			Ext.create("Bleext.modules.login.LoginForm",{forward:this.forward})
		];
	}
});