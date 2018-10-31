'use strict';

/* Services */

// Post login information and returns the apikey of the user sent when the login succedded 
// The format of the input must be: 
// {passwd: "password", ​username: "user"}
// The expected output when the request succedded contains (among other info): 
// {Authorization: "PUIRESTAUTH", 
//  apikey: "APIKEYOFTHEUSER", 
//  username: "groman", ...}


// THIS IS ORIGINALCODE FROM SKELETOM
// app.factory('LoginService', ['$resource', function ($resource) {
// 	return $resource('http://sanger.dia.fi.upm.es/pui-rest-news/login', {},
// 		{
// 			login: {method: 'post'}
// 		})
// }]);

app.factory('LoginService', ['$resource', function ($resource) {
	var service= {};

	service.Login = function (user, password, callback){
		$timeout(function(){
				var response = { success: username === 'stanley.kelder' && password === '30d58b16' };
                if(!response.success) {
                    response.message = 'Username or password is incorrect';
                }
                callback(response);
            }, 1000);
		return service;
	}; 


	return $resource('http://sanger.dia.fi.upm.es/pui-rest-news/login', {},
		{
			login: {method: 'post', params: {passwd: password, username: user}}
		})
}]);

// The list of news contain elements with the following fields:
// {"id":...,
//  "id_user":...,
//  "abstract":...,
//  "subtitle":...,
//  "update_date":...,
//  "category":...,
//  "title":...,
//  "thumbnail_image":...,
//  "thumbnail_media_type":...}

app.factory('NewsListService', ['$resource', function ($resource) {
	return $resource('http://sanger.dia.fi.upm.es/pui-rest-news/articles', {},
		{
			query: {method: 'get', isArray: true}
		});
}]);

// A news contains the following elements:
// {"id":...,
//  "id_user":...,
//  "abstract":...,
//  "subtitle":...,
//  "update_date":...,
//  "category":...,
//  "title":...,
//  "image_data":...,
//  "image_media_type":...}

app.factory('NewsDetailsService', ['$resource', function ($resource) {
	return $resource('http://sanger.dia.fi.upm.es/pui-rest-news/article/:id', { id: '@_id' },
		{
			get: {method: 'get'},
			delete: {method: 'delete'}, 
			save: {method: 'post'}
		});
}]);



