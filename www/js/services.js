angular.module('starter.services', [])

.factory("ServerURL", function() {
  var baseUrl = "http://ciel.at/"

  return {
    login: baseUrl + "login.php",
    category: baseUrl + "category_info.php",
    dalocation: baseUrl + "datelocation_info.php",
    doctors: baseUrl + "doctors_info.php"
  }
})

.factory('Login', function($http, ServerURL) {
  var login = function(username, password, callback) {
    $http
    .post(ServerURL.login, {"username": username, "password": password})
    .success(function(data) {
      callback(data);
    })
  }

  return {
    login: login
  }
})

.factory('DisplayCat', function($http, ServerURL) {
  var catRequest = function(callback){
    $http
    .post(ServerURL.category, {"requestForCategory": "true"})
    .success(function(data){
      callback(data);
    });
  } 

  return {
    catRequest: catRequest
  }
})

.factory('DisplayDateLoc', function($http, ServerURL) {
  var datelocRequest = function(callback){
    $http
    .post(ServerURL.dalocation, {"requestForLad": "true"})
    .success(function(data){
      callback(data);
    });
  } 

  return {
    datelocRequest: datelocRequest
  }
})

.factory('DisplayDoc', function($http, ServerURL) {
  var docRequest = function(callback){
    $http
    .post(ServerURL.doctors, {"requestForDoc": "true"})
    .success(function(data){
      callback(data);
    });
  } 

  return {
    docRequest: docRequest
  }
})
