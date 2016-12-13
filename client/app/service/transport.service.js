'use strict';
const angular = require('angular');

export default angular.module('owApp.transport', [])

.service('Product', function($http){
	'ngInject';

	this.util = {};

	this.http = {};
	this.http.list = function(data){
		return $http({
			url: `/api/products/business/${data._business}/category/${data._category}`,
			method: 'GET',
			// data: data
		})
		.then((response) => {
			return response.data;
		});
	};



})

.service('Category', function($http, $q){
	'ngInject';

	this.util = {};


	this.http = {};
	this.http.create = function(data){
		return $http({
			url: `/api/categories/`,
			method: 'POST',
			data: data
		})
		.then((response) => {
			return response.data;
		});
	};

	this.http.list = function(data){
		return $http({
			url: `/api/categories/business/${data._business}`,
			method: 'GET',
			// data: data
		})
		.then((response) => {
			return response.data;
		});
	};

	this.http.update = function(data){
		return $http({
			url: `/api/categories/${data._id}`,
			method: 'PUT',
			data: data
		})
		.then((response) => {
			return response.data;
		});
	};

	this.http.remove = function(data){
		return $http({
			url: `/api/categories/${data._id}`,
			method: 'DELETE',
			data: data
		})
		.then((response) => {
			return response.data;
		});
	};



})

.service('Admin', function($http, $q){
	'ngInject';

	this.http = {};

	this.http.list = function(data){
		return $http({
			url: `/api/users/`,
			method: 'GET',
			data: data
		})
		.then(function(response){
			return response.data;
		});
	};

	this.http.create = function(data){
		return $http({
			url: `/api/users/admin/`,
			method: 'POST',
			data: data
		})
		.then(function(response){
			return response.data;
		});
	};

	this.http.changeRole = function(data){
		return $http({
			url: `/api/users/admin/changeRole`,
			method: 'PUT',
			data: data
		})
		.then(function(response){
			return response.data;
		});
	};

	this.http.forceResetPassword = function(data){
		return $http({
			url: `/api/users/admin/forceResetPassword`,
			method: 'PUT',
			data: data
		})
		.then(function(response){
			return response.data;
		});
	};



	this.http.update = function(data){
		return $http({
			url: `/api/users/admin/updateInfo`,
			method: 'PUT',
			data: data
		})
		.then(function(response){
			return response.data;
		});
	};

	this.http.delete = function(data){
		return $http({
			url: `/api/users/${data._id}`,
			method: 'DELETE',
			data: data
		})
		.then(function(response){
			return response.data;
		});
	};



})
.service('Staff', function($http, $q){
	'ngInject';

	this.http = {};
	this.http.create = function(data){
		return $http({
			url: `/api/users/manager/`,
			method: 'POST',
			data: data
		})
		.then(function(response){
			return response.data;
		});
	};
	this.http.list = function(data){
		return $http({
			url: `/api/users/my/${data._business}`,
			method: 'GET',
			data: data
		})
		.then(function(response){
			return response.data;
		});
	};

	this.http.update = function(data){
		return $http({
			url: `/api/users/manager/updateInfo`,
			method: 'PUT',
			data: data
		})
		.then(function(response){
			return response.data;
		});
	};

	this.http.delete = function(data){
		return $http({
			url: `/api/users/my/${data._id}`,
			method: 'DELETE',
			data: data
		})
		.then(function(response){
			return response.data;
		});
	};

	this.http.forceResetPassword = function(data){
		return $http({
			url: `/api/users/forceResetPassword`,
			method: 'PUT',
			data: data
		})
		.then(function(response){
			return response.data;
		});
	};
	this.http.changeRole = function(data){
		return $http({
			url: `/api/users/changeRole`,
			method: 'PUT',
			data: data
		})
		.then(function(response){
			return response.data;
		});
	};


})

.service('Business', function BusinessService($http) {
	'ngInject';

	this.http = {};
	this.http.my = function(){
		return $http({
			url: '/api/businesses/my',
			method: 'GET',
		})
		.then(function(response){
			return response.data;
		});
	};


	this.http.create = function(data){
		return $http({
			url: '/api/businesses',
			method: 'POST',
			data: data
		})
		.then(function(response){
			return response.data;
		});
	};


	this.http.get = function(data){
		return $http({
			url: `/api/businesses/${data._id}`,
			method: 'GET'//,
			// data: data
		})
		.then(function(response){
			return response.data;
		});
	};

	// this.http.delete = function(data){
	// 	return $http({
	// 		url: `/api/businesses/${data._id}`,
	// 		method: 'DELETE',
	// 		data: data
	// 	})
	// 	.then(function(response){
	// 		return response.data;
	// 	});
	// };

	this.http.update = function(data){
		return $http({
			url: `/api/businesses/${data._id}`,
			method: 'PUT',
			data: data
		})
		.then(function(response){
			return response.data;
		});
	};



	


})


.name;
