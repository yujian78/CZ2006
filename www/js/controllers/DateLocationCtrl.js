Controllers

.controller('DateLocationCtrl', function($scope, DisplayDateLoc) {
  $scope.catChoice = window.localStorage.category;

  document.getElementById("click").disabled = true;
  DisplayDateLoc.datelocRequest($scope.catChoice, function(data){
    datelocation = angular.copy(data);
    $scope.clinics = datelocation.clinic;
    $scope.dates = datelocation.date;
    document.getElementById("click").disabled = false;
  });

  $scope.click = function() {
      window.localStorage.clinic = document.getElementById("clinic").value;
      window.localStorage.date = document.getElementById("date").value;
      window.location = "#/tab/status/category/lad/doctors";
      // window.location.reload(true);
  }
});