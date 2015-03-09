angular.module('starter.services', [])

.factory("ServerURL", function() {
  var baseUrl = "http://128.199.219.37/"

  return {
    login: baseUrl + "login.php"
  }
})

.factory('Login', function($http, ServerURL) {
  var login = function(username, password, callback) {
    $http
    .post(ServerURL.login, {"username": username, "password": password})
    .success(function(data) {
      callback(data);
    });
  }

  return {
    login: login
  }
});
