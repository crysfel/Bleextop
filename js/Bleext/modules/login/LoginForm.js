/**
 * @class Bleext.modules.login.LoginForm
 * @extends Bleext.ui.Form
 * @autor Crysfel Villa
 * @date Sun Jul 10 17:10:52 CDT 2011
 *
 * Description
 *
 **/

Ext.define("Bleext.modules.login.LoginForm",{
	extend 			: "Bleext.abstract.Form",
	alias			: "loginform",
	
	forward			: true,

	initComponent	: function() {
		
		this.items = this.createLoginFields();
		this.fbar = this.createButtons();
        
		this.callParent();
	},
	
	createButtons		: function(){
		return [{
			text	: "Login",
			scope	: this,
			handler	: this.login
		},{
			text	: "Create account"
		}]
	},
	
	createLoginFields	: function(){
		return [{
			xtype	: "fieldcontainer",
			layout	: "hbox",
			defaultType : "textfield",
			width	: 360,
			items	: [{
				labelAlign	: "top",
				msgTarget	: 'side',
				fieldLabel	: "User",
				name		: "username",
				allowBlank	: false,
				flex		: 1,
				margins		: {right:3},
			},{
				labelAlign	: "top",
				msgTarget	: 'side',
				inputType	: 'password',
				fieldLabel	: 'Password',
				name		: 'password',
				allowBlank	: false,
				flex		: 1,
				margins		: {left:3},
				listeners	: {
					scope		: this,
					specialkey	: function(f,e){
						if (e.getKey() == e.ENTER) {
							this.login();
						}
					}
				}
			}]
		}];
	},
	
	login		: function(){
		if(this.getForm().isValid()){
			var values = this.getForm().getValues();
			Bleext.Ajax.request({
				url		: Bleext.desktop.Constants.DESKTOP_LOGIN_URL,
				params	: values,
				el		: this.up("window").el,
				scope	: this,
				success	: this.onSuccess,
				failure	: this.onFailure
			});
		}
	},
	
	onSuccess	: function(data,response){
		if(data.success){
			if(this.forward){
				document.location = Bleext.BASE_PATH+data.url;
			}else{
				var win = this.up("window");
				if(win){
					win.close();
				}
			}
			
		}
	},
	
	onFailure	: function(data,response){
		var passwrd = this.down("textfield[name=password]");

		Ext.create("Ext.tip.ToolTip",{
			anchor		: "left",
			target		: passwrd.bodyEl,
			trackMouse	: false,
			html		: data.message,
			autoShow	: true
		});
		passwrd.markInvalid(data.message);
	}
});