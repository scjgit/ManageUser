(function(){
	'use strict';
	angular.module("userMgntApp",['ngRoute'])
	.config(['$routeProvider', function($routeProvider){
		$routeProvider.when('/searchUser',{
			templateUrl: 'src/views/searchUser.html',
			controller: 'searchUserctrl',
			controllerAs : 'vmSearchUserctrl'
		}).otherwise({
        	redirectTo: '/searchUser'
      	});
	}]);;
})();