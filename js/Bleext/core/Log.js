/**
 * @class Bleext.core.Log
 * @extends Object
 * @autor Crysfel Villa
 * @date Sun Jul 10 22:12:39 CDT 2011
 *
 * Class for logging
 *
 **/

Ext.define("Bleext.core.Log",{
	extend 		: "Object",
	singleton	: true,

	log			: function(object){
		if(console){
			console.log(object);
		}
	}
});

Bleext.log = Bleext.core.Log.log;