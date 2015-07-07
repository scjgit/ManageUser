(function(){
	'use strict';
	angular.module("userMgntApp")
	.controller("searchUserctrl",[
		'manageUserService',
		SearchUserctrl
	]);

	function SearchUserctrl(manageUserService){
		this.manageUserService = manageUserService;
		this.savedUsers;
		this.user;
		this.isAddAction = true;
		this.firstName;
		this.message;
	}

	SearchUserctrl.prototype = {

		getUsers: function(){
			var self = this;
			self.manageUserService.getUsers()
			.then(function(data){
				console.log(data);
				self.savedUsers = data;
			},function(error){
				console.log(error);
			});
		},

		removeUser: function(userId){
			var self = this;
			self.manageUserService.removeUser(userId)
			.then(function(data){
				console.log(data);
			},function(error){
				console.log(error);
			});
		},

		addUser: function(){
			var self = this;
			console.log(this.user);
			self.manageUserService.addUser(self.user)
			.then(function(data){
				console.log(data);
				self.user ={};
			},function(error){
				console.log(error);
			});
		},

		updateUserObject: function(index){
			var self = this;
			this.isAddAction = false;
			console.log(this.savedUsers[index]);
			var date = (this.savedUsers[index]).birthday;
			(this.savedUsers[index]).birthday = new Date(date);
			this.user = this.savedUsers[index];
		},

		updateUser: function(index){
			var self = this;
			self.manageUserService.updateUser(self.user)
			.then(function(data){
				console.log(data);
				self.user ={}
				self.isAddAction = true;
			},function(error){
				console.log(error);
			});
		},

		getUserByFirstName: function(){
			var self = this;
			self.manageUserService.getUser(self.firstName)
			.then(function(data){
				console.log(data);
				if(data){
				var userArr = [];
				userArr.push(data);
				self.savedUsers = userArr;
			}else{
				self.message = "No data found!"
			}
			},function(error){
				console.log(error);
			});
		}
	}

})();