'use strict';

/* Services */

// Post login information and returns the apikey of the user sent when the login succedded 
// The format of the input must be: 
// {passwd: "password", ​username: "user"}
// The expected output when the request succedded contains (among other info): 
// {Authorization: "PUIRESTAUTH", 
//  apikey: "APIKEYOFTHEUSER", 
//  username: "groman", ...}

app.factory('LoginService', ['$resource', function ($resource) {
	return $resource('http://sanger.dia.fi.upm.es/pui-rest-news/login', {},
		{
			login: {method: 'post'}
		});
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



