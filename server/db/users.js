var mongo = require('mongoskin');
var ObjectId = require('mongodb').ObjectID;
var db = mongo.db("mongodb://localhost:27000/test", {native_parser:true});
db.bind('user');
var Q = require('q');

function Users(){
}

Users.prototype ={

	/**Fetching all users from Db**/
	getUsers : function(){
		var deferred = Q.defer();
		db.user.find().toArray(function(err, result) {
		  if (err){
		  	db.close();
		  	deferred.reject(err);
		  	return;
		  }
		  deferred.resolve(result);
		});
		return deferred.promise;
	},

	/**Fetch a user from Db**/
	getUser : function(searchData){
		var deferred = Q.defer();
		var criteria = { firstName: searchData };
		db.user.findOne(criteria, function(err, result) {
			console.log(err, result);
		  if (err){
		  	db.close();
		  	deferred.reject(err);
		  	return;
		  }
		  deferred.resolve(result);
		});
		return deferred.promise;
	},

	/**Inserting a user into Db**/
	addUser: function(userData){
		var deferred = Q.defer();
		db.user.insert(userData,function(err, result){
			if (err){
				db.close();
			  	deferred.reject(err);
			  	return;
			}
		  	deferred.resolve("");
		});
		return deferred.promise;
	},

	/**Updating a user in Db**/
	updateUser: function(userObj){
		var deferred = Q.defer();
		var criteria = { _id: ObjectId(userObj._id) };
		db.user.update(criteria, convertToDbObj(userObj), function(err, result) {
		  if (err){
		  	db.close();
		  	deferred.reject(err);
		  	return;
		  }
		  deferred.resolve(result);
		});
		return deferred.promise;
	},

	
	/**Deleting a user in Db**/
	deleteUser: function(id){
		var deferred = Q.defer();
		var criteria = { _id: ObjectId(id) };
		db.user.remove(criteria,function(err, result) {
			console.log(err, result);
		  if (err){
		  	db.close();
		  	deferred.reject(err);
		  	return;
		  }
		  deferred.resolve(result);
		});
		return deferred.promise;
	}

	
};

/**Converts to db object for updating**/
function convertToDbObj(userObj){
	delete userObj._id;
	return userObj;
}

module.exports = new Users();