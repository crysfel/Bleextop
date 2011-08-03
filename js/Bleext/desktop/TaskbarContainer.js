/**
 * @class Bleext.desktop.TaskbarContainer
 * @extends Ext.toolbar.Toolbar
 * @autor Crysfel Villa
 * @date Mon Jul 11 21:03:08 CDT 2011
 *
 * This class contains the buttons in the bar
 *
 **/

Ext.define("Bleext.desktop.TaskbarContainer",{
	extend 			: "Ext.toolbar.Toolbar",

	flex			: 1,
	enableOverflow	: true,
	cls				: "bleext-toolbar-container",
	items			: ["&#160;"]
});