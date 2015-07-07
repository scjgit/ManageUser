(function(){
	'use strict';
	angular.module("userMgntApp")
	.service('manageUserService',[
		'$http',
        '$q',
		ManageUserService
		]);

	function ManageUserService($http, $q){
		this.$http = $http;
		this.$q = $q;
	}

	ManageUserService.prototype = {

		getUsers: function(){
			var self = this;
			var deferred = self.$q.defer();
			self.$http({
              method: 'GET',
              url: '/UserMgmntSystem/api/users',
              params : {timeStamp: new Date()}
	          }).then(function(result) {
	              deferred.resolve(result.data);
	          });

          	return deferred.promise;
		},

		getUser: function(id){
			var self = this;
			var deferred = self.$q.defer();
			self.$http({
              method: 'GET',
              url: '/UserMgmntSystem/api/users/'+id,
              params : {
              	timeStamp: new Date()
              }
          	}).then(function(result) {
              	deferred.resolve(result.data);
          	});
          	return deferred.promise;
		},

		addUser: function(userData){
			var self = this;
			var deferred = self.$q.defer();
			self.$http({
              	method: 'POST',
              	url: '/UserMgmntSystem/api/user/',
              	headers: { 'Content-Type': 'application/json' },
			  	data: userData
          	}).then(function(result) {
              	deferred.resolve(result.data);
          	});
          	return deferred.promise;
		},

		updateUser: function(userData){
			var self = this;
			var deferred = self.$q.defer();
			self.$http({
              	method: 'PUT',
              	url: '/UserMgmntSystem/api/users/'+userData._id,
              	headers: { 'Content-Type': 'application/json' },
			  	data: userData
          	}).then(function(result) {
	              deferred.resolve(result);
          	});
          	return deferred.promise;
		},

		removeUser: function(id){
			var self = this;
			var deferred = self.$q.defer();
			self.$http({
              method: 'DELETE',
              url: '/UserMgmntSystem/api/users/'+id,
              params : {
              	timeStamp: new Date()
              }
          	}).then(function(result) {
              	deferred.resolve(result);
          	});
          	return deferred.promise;
		}
	}
})();