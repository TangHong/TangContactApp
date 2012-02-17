var _SQLiteDb;
(function($){
	var databaseOptions = {
			fileName: "SQLiteDemo",
			version: "1.0",
			displayName: "SQLiteDemo",
			maxSize: 1024
	};
	
	_SQLiteDb = openDatabase(
			databaseOptions.fileName,
			databaseOptions.version,
			databaseOptions.displayName,
			databaseOptions.maxSize
	);		

	brite.registerDao("Contact",new brite.dao.SQLiteDao("contacts","id",[{column:'name',dtype:'TEXT'},{column:'phone',dtype:'TEXT'},{column:'description',dtype:'TEXT'},{column:'favorite',dtype:'Tinyint'},{column:'recent',dtype:'Tinyint'},{column:'image',dtype:'TEXT'}]));
	brite.registerDao("Company",new brite.dao.SQLiteDao("company","id",[{column:'name',dtype:'TEXT'},{column:'member_id',dtype:'TEXT'}]));
	brite.registerDao("Category",new brite.dao.SQLiteDao("category","id",[{column:'name',dtype:'TEXT'},{column:'member_id',dtype:'TEXT'}]));
})(jQuery);