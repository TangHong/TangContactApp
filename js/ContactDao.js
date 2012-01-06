brite.registerDao("Contact",(function(){
	var webDataBase = new ipad.webDataBase();
	
	var ContactDao = {
		create: function(objType,contact) {
			contact.id = brite.util.uuid(12);
			webDataBase.create(objType,contact);
		},
		update:function(objType,contact) {
			webDataBase.update(objType,contact);
		},
		remove:function(objType,contact) {
			webDataBase.remove(objType,contact);
		},
		list:function(objType) {
			return webDataBase.list(objType).done(function(contacts){
					return contacts;
			});
		}
	};
	
	return ContactDao;
})());
