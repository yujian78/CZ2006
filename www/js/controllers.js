var Controllers = angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  $scope.new_appointment = function() {
    window.location = "#/tab/status/category"
  }
});