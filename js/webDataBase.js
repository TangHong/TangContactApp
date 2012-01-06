var ipad = ipad || {};

(function() {
	//now only for table contact
	function webDataBase() {
		this.init();
	}
	
	webDataBase.prototype.init = function() {
		var c = this;
		c.db = openDatabase("ipad","1.0","LocalDatabase",200000);
		c.db.transaction(function(tx){
			tx.executeSql("CREATE TABLE IF NOT EXISTS contact ( name TEXT UNIQUE, id TEXT UNIQUE)",[],function(tx,rs){
				console.log(rs);
			},function(tx,error){
				console.log(error)	
			});
		});
	}
	
	webDataBase.prototype.create = function(objtype,contact) {
		var c = this;
		c.db.transaction(function(tx){
			tx.executeSql("CREATE TABLE IF NOT EXISTS "+objtype+" ( name TEXT UNIQUE, id TEXT UNIQUE)",[],function(tx,rs){
				console.log(rs);
			},function(tx,error){
				console.log(error)	
			});
			
			tx.executeSql("INSERT INTO "+objtype+"(name,id)VALUES(?,?)",[contact.name,contact.id],function(tx,rs){
				console.log(rs);
			},function(tx,error){
				console.log(error)	
			});
		});
	}
	
	webDataBase.prototype.update = function(objtype,contact) {
		var c = this;
		c.db.transaction(function(tx){
			tx.executeSql("UPDATE "+objtype+"(name,id)VALUES(?,?) where id ='"+contact.id+"'",[contact.name,contact.id],function(tx,rs){
				console.log(rs);
			},function(tx,error){
				console.log(error)	
			});
		});
	}
	
	webDataBase.prototype.remove = function(objtype,id) {
		var c = this;
		c.db.transaction(function(tx){
			tx.executeSql("DELETE FROM "+objtype+" where id='"+id+"'",[],function(tx,rs){
				console.log(objtype);
				console.log(rs);
			},function(tx,error){
				console.log(error)	
			});
		});
	}
	
	webDataBase.prototype.list = function(objType) {
		var c = this;
		c.contacts = [];
		var dfd = $.Deferred();
		c.db.transaction(function(tx){
			tx.executeSql("SELECT * FROM "+objType,[],function(tx,rs){
				
				for(var i = 0;i < rs.rows.length ; i++){
					var contact = {};
					contact.name = rs.rows.item(i).name;
					contact.id = rs.rows.item(i).id;
					c.contacts.push(contact);
				}
				dfd.resolve(c.contacts);
			},function(tx,error){
				console.log(error)	
			});
		});
		return dfd.promise();
	}
	
	ipad.webDataBase = webDataBase;
})();