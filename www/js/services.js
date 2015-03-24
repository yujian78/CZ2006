angular.module('starter.services', [])

.factory("ServerURL", function() {
  var baseUrl = "http://ciel.at/"

  return {
    login: baseUrl + "login.php",
    category: baseUrl + "category_info.php",
    dalocation: baseUrl + "datelocation_info.php",
    doctors: baseUrl + "doctors_info.php",
    confirmation: baseUrl + "confirmation.php"
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
  var datelocRequest = function(catChoice, callback){
    $http
    .post(ServerURL.dalocation, {"requestForLad": catChoice})
    .success(function(data){
      callback(data);
    });
  } 

  return {
    datelocRequest: datelocRequest
  }
})

.factory('DisplayDoc', function($http, ServerURL) {
  var docRequest = function(date, clinic, category, callback){
    $http
    .post(ServerURL.doctors, {"selectDate": date, "selectClinic": clinic, "selectCategory": category})
    .success(function(data){
      callback(data);
    });
  } 

  return {
    docRequest: docRequest
  }
})

.factory('DisplayConfirmation', function($http, ServerURL) {
  var clinicRequest = function(doctorID, callback){
    $http
    .post(ServerURL.confirmation, {"Doctor": doctorID})
    .success(function(data){
      callback(data);
    });
  } 

  return {
    clinicRequest: clinicRequest
  }
})
