var ipad = ipad || {};

(function() {
	//now only for table contact
	function SQLiteDao() {
		
	}
	
	
	
	SQLiteDao.prototype.connect = function() {
	//error message
		var lasterr = ""; 
		//Exec Falg
		var execFlag; 
	/**
		* Connecte to sqlite server 
		* provite:sqlite IP,PORT,DB Name,USER,Password,CharSet
		*/
			execFlag = sqlite.connecte("D://test.db");
			if(execFlag == 1) {
				console.log("success");
				return 1;
		  }else {
				lasterr = sqlite.getLastError();
				return 0;
			}
	}
	/**
	 * Close already open Connection
	 */
	SQLiteDao.prototype.close = function() {
		 execFlag = sqlite.close();
		 if(execFlag == 1) {
		 	return 1;
		 }else {
		  lasterr = sqlite.getLastError();
		  return 0;
		 }
	}
	/**
   * Exec Insert Into SQL statement
   * @param {Object} sql
   */
	SQLiteDao.prototype.insertsqlite = function(sql) {
		execFlag = sqlite.insertData(sql);
 		if(execFlag == 1) {
  		return 1;
  	}else {
  		lasterr = sqlite.getLastError();
  		return 0;
 		}	
  }
  /**
    * Exec DataBase Manager Language
    * @param {Object} sql
    */
	SQLiteDao.prototype.execDMLsqlite = function(sql) {
		execFlag = sqlite.execDML(sql);
 		if(execFlag == 1) {
  		return 0;
  	}else {
  		lasterr = sqlite.getLastError();
  		return 0;
 		}
	}
	
	ipad.SQLiteDao = SQLiteDao;
})();