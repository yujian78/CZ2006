angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, Login, $ionicPopup, $timeout) {
  $scope.signin = function(username, password) {
    // console.log(username, password)
    if(username=="" || password=="" || username==undefined || password==undefined) {
      alert("You must type password sb!");
      return;
    }
    Login.login(username, password, function(data) {
      if(data["code"] == 1) {
        window.location = "#/tab/status";
      } else {
        $scope.showAlert = function() {
          var alertPopup = $ionicPopup.alert({
            title: 'Invalid Password',
            template: 'Please re-enter your account info'
          });
          alertPopup.then(function(res) {

          });
        };
        $scope.showAlert();
      }
    });
  }
})

.controller('DashCtrl', function($scope) {
  $scope.new_appointment = function() {
    window.location = "#/tab/status/category"
  }
})

.controller('appotCategoryCtrl', function($scope, DisplayCat) {
  DisplayCat.catRequest(function(data){
    $scope.cats = angular.copy(data);

    $scope.click = function(cat) {
      window.localStorage.category = cat;
      window.location = "#/tab/status/category/lad";
    }
  });
})

.controller('DateLocationCtrl', function($scope, DisplayDateLoc) {
  DisplayDateLoc.datelocRequest(function(data){
    $scope.datelocation = angular.copy(data);
    $scope.locations = $scope.datelocation.location;
    $scope.dates = $scope.datelocation.date;

    
  });
  $scope.click = function() {
      window.location = "#/tab/status/category/lad/doctors";
      window.localStorage.location = document.getElementById("location").value;
      window.localStorage.date = document.getElementById("date").value;
  }
})

.controller('DoctorsCtrl', function($scope, DisplayDoc) {
  DisplayDoc.docRequest(function(data){
    $scope.doctors = angular.copy(data);
  });

  $scope.goto = function(doctor) {
    window.localStorage.doctor = JSON.stringify(doctor)
    window.location = "#/tab/status/category/lad/doctors/specific"
    console.log(doctor);
  }

  $scope.date = "(" + window.localStorage.date + ")"
})

.controller('DoctorsSpecificCtrl', function($scope) {
  doctor = JSON.parse(window.localStorage.doctor);
  $scope.name = doctor.name;
  $scope.img = doctor.img;
  $scope.profile = doctor.profile;
  $scope.detail = doctor.detail;
  $scope.date = window.localStorage.date;

  times = doctor.times;
  $scope.timerows = Array(Math.floor((times.length + 2) / 3));
  for(var i=0; i<$scope.timerows.length; i++) {
    $scope.timerows[i] = Array();
  }
  for(var i=0; i < times.length; i++) {
    $scope.timerows[Math.floor(i/3)].push(times[i]); 
  }

  $scope.chooseAppointment = function(time){
    window.localStorage.time = time
    window.location = "#/tab/status/confirmation";
  }
})

.controller('ConfirmationCtrl', function($scope, $ionicPopup) {
  doctor = JSON.parse(window.localStorage.doctor)
  $scope.category = window.localStorage.category
  $scope.date = window.localStorage.date
  $scope.name = doctor.name
  $scope.img = doctor.img
  $scope.profile = doctor.profile
  $scope.location = window.localStorage.location
  $scope.time = window.localStorage.time

  // A confirm dialog
  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Confirm Appointment',
      template: 'Are you sure you want to confirm this appointment?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        console.log('You are sure');
      } else {
        console.log('You are not sure');
      }
    });
  };
})

.controller('AppointmentsCtrl', function($scope, Chats) {
  
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
