/**
 * @class Bleext.desktop.Constants
 * @extends Object
 * requires 
 * @autor Crysfel Villa
 * @date Mon Jul 25 23:04:37 CDT 2011
 *
 * Description
 *
 *
 **/

Ext.define("Bleext.desktop.Constants",{
	alternateClassName	: "Bleext.Constants" ,
	singleton	: true,

	DESKTOP_CONFIGURATION_URL	: Bleext.BASE_PATH+"index.php/desktop/config",
	DESKTOP_LOGIN_URL			: Bleext.BASE_PATH+"index.php/login/validate",
	DESKTOP_LOGOUT_URL			: Bleext.BASE_PATH+"index.php/login/logout",
	DESKTOP_HOME_URL			: Bleext.BASE_PATH+"index.php/desktop/home",
	
	
	LOGIN_IMAGE					: Bleext.BASE_PATH+"resources/images/login-image.jpg"
	
});