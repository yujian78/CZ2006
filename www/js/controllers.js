angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, Login, $ionicPopup, $timeout, DisplayAppointment) {
  $scope.signin = function(username, password) {
    // window.localStorage.username = username;

    if(username=="" || password=="" || username==undefined || password==undefined) {
      alert("You must type password sb!");
      return;
    }
    Login.login(username, password, function(data) {
      if(data["code"] == 1) {
        DisplayAppointment.appointmentRequest(username, function(data){
          apps = angular.copy(data);
          window.localStorage.userApp = JSON.stringify(apps);
        });
        window.localStorage.userInfo = JSON.stringify(data["info"]);
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
  });
  $scope.chooseCat = function(catChoosen) {
    window.localStorage.category = catChoosen;
    window.location = "#/tab/status/category/lad";
  }
})

.controller('DateLocationCtrl', function($scope, DisplayDateLoc) {
  $scope.catChoice = window.localStorage.category;
  DisplayDateLoc.datelocRequest($scope.catChoice, function(data){
    $scope.datelocation = angular.copy(data);
    $scope.clinics = $scope.datelocation.clinic;
    $scope.dates = $scope.datelocation.date;
  });

  $scope.click = function() {
      window.localStorage.clinic = document.getElementById("clinic").value;
      window.localStorage.date = document.getElementById("date").value;
      window.location = "#/tab/status/category/lad/doctors";
      // window.location.reload(true);
  }
})

.controller('DoctorsCtrl', function($scope, DisplayDoc) {
  DisplayDoc.docRequest(window.localStorage.date, window.localStorage.clinic, window.localStorage.category, function(data) {
    $scope.doctors = angular.copy(data);
  });

  $scope.goto = function(doctor) {
    window.localStorage.doctor = JSON.stringify(doctor);
    window.location = "#/tab/status/category/lad/doctors/specific";
  }
})

.controller('DoctorsSpecificCtrl', function($scope) {
  $scope.doctor = JSON.parse(window.localStorage.doctor);
  $scope.date = window.localStorage.date;

  times = $scope.doctor.Times;
  $scope.timerows = Array(Math.floor((times.length + 2) / 3));
  for(var i=0; i<$scope.timerows.length; i++) {
    $scope.timerows[i] = Array();
  }
  for(var i=0; i < times.length; i++) {
    $scope.timerows[Math.floor(i/3)].push(times[i]); 
  }

  $scope.chooseAppointment = function(time){
    window.localStorage.time = time;
    window.location = "#/tab/status/confirmation";
  }
})

.controller('ConfirmationCtrl', function($scope, $ionicPopup, DisplayConfirmation, ConfirmAppointment, DisplayAppointment) {
  $scope.doctor = JSON.parse(window.localStorage.doctor);
  $scope.date = window.localStorage.date;
  $scope.time = window.localStorage.time;
  DisplayConfirmation.clinicRequest($scope.doctor.ID, function(data) {
    $scope.clinic = angular.copy(data);
  });

  userInfo = JSON.parse(window.localStorage.userInfo);
  userEmail = userInfo.Email;

  // console.log($scope.doctor.Category);
  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Confirm Appointment',
      template: 'Confirm this appointment?'
    });

    confirmPopup.then(function(res) {
      if(res) {
        ConfirmAppointment.makeAppointment($scope.doctor.Category, userEmail, $scope.date, 
          $scope.time, $scope.doctor.ID, function(data) {
            // Get the message from server
            errorMessage = angular.copy(data);
            // show alert
            $scope.showAlert = function() {
              //definre alert
              var alertPopup = $ionicPopup.alert({
                title: errorMessage.title,
                template: errorMessage.msg
              });
              //show alert
              alertPopup.then(function(res){
              });
            };
            $scope.showAlert();

            //Refresh the appointment lists
            DisplayAppointment.appointmentRequest(userEmail, function(data){
              apps = angular.copy(data);
              window.localStorage.userApp = JSON.stringify(apps);;
            });

            userInfo = window.localStorage.userInfo;
            window.localStorage.clear();
            window.localStorage.userInfo = userInfo;
            window.location = "#/tab/status";
          })
      } else{

      }
    });

  };
})

.controller('AppointmentsCtrl', function($scope, DisplayAppointment) {
  $scope.apps = JSON.parse(window.localStorage.userApp);

  $scope.chooseApp = function(appChoosen) {
    window.localStorage.appSelect = JSON.stringify(appChoosen);
    window.location = "#/tab/appointments/detail";
  }
})

.controller('AppointmentsDetailCtrl', function($scope, $ionicPopup, DeleteAppointment, DisplayAppointment) {
  $scope.appChoosen = JSON.parse(window.localStorage.appSelect);

  $scope.editAppoint = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Edit Appointment',
      template: 'Confirm to edit this appointment?'
    });

    confirmPopup.then(function(res) {
      if(res){
        appID = $scope.appChoosen.ID;
        userInfo = JSON.parse(window.localStorage.userInfo);
        DeleteAppointment.deleteRequest(appID, function(data){
          // Get the message from server
          errorMessage = angular.copy(data);
          
          //Refresh the appointment lists
          DisplayAppointment.appointmentRequest(userInfo.Email, function(data){
            apps = angular.copy(data);
            window.localStorage.userApp = JSON.stringify(apps);;
          });

          window.localStorage.category = $scope.appChoosen.Category;
          window.location = "#/tab/status/category/lad";
        })
      } else{

      }
    });
  }

  $scope.deleteAppoint = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Delete Appointment',
      template: 'Are you sure you want to delete this appointment?'
    });

    confirmPopup.then(function(res) {
      if(res){
        appID = $scope.appChoosen.ID;
        userInfo = JSON.parse(window.localStorage.userInfo);
        DeleteAppointment.deleteRequest(appID, function(data){
          // Get the message from server
          errorMessage = angular.copy(data);
          // show alert
          $scope.showAlert = function() {
            //definre alert
            var alertPopup = $ionicPopup.alert({
              title: errorMessage.title,
              template: errorMessage.msg
            });
            //show alert
            alertPopup.then(function(res){
            });
          };
          $scope.showAlert();
          //Refresh the appointment lists
          DisplayAppointment.appointmentRequest(userInfo.Email, function(data){
            apps = angular.copy(data);
            window.localStorage.userApp = JSON.stringify(apps);;
          });

          window.location = "#/tab/appointments";
          //$state.go($state.current, $stateParams, {reload: true});
        })
      } else{

      }
    });
  }
  
})

.controller('AccountCtrl', function($scope) {
  $scope.userInfo = JSON.parse(window.localStorage.userInfo);
  $scope.updateInfo = function() {
    window.location = "#/tab/account/contactInfo";
  }
  $scope.resetPassword = function() {
    window.location = "#/tab/account/password";
  }
  $scope.setReminder = function() {
    window.location = "#/tab/account/reminder";
  }
  
})

.controller('AccountContactCtrl', function($scope, $ionicPopup, UpdateUserInfo) {
  userInfo = JSON.parse(window.localStorage.userInfo);
  $scope.phone = userInfo.Phone;
  $scope.username = userInfo.Name;

  $scope.update = function(phoneNo, name) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Update Information',
      template: 'Confirm to update your information?'
    });

    confirmPopup.then(function(res) {
      if(res){
        UpdateUserInfo.userInfoRequest(phoneNo, name, userInfo.Email, function(data){
          // Get the message from server
          errorMessage = angular.copy(data);
          // show alert
          $scope.showAlert = function() {
            //definre alert
            var alertPopup = $ionicPopup.alert({
              title: errorMessage.title,
              template: errorMessage.msg
            });
            //show alert
            alertPopup.then(function(res){
            });
          };
          $scope.showAlert();

          if(phoneNo != null){
            userInfo.Phone = phoneNo; 
          }
          if(name != null){
            userInfo.Name = name; 
          }
          
          window.localStorage.userInfo = JSON.stringify(userInfo);
          window.location = "#/tab/account";
          //$state.go($state.current, $stateParams, {reload: true});
        })
      } else{

      }
    });
  }
})

.controller('PasswordCtrl', function($scope, $ionicPopup, UpdatePassword) {
  userInfo = JSON.parse(window.localStorage.userInfo);
  email = userInfo.Email;
  $scope.updatePassword = function(password) {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Change Password',
      template: 'Confirm to change the password?'
    });

    confirmPopup.then(function(res) {
      if(res){
        UpdatePassword.passwordRequest(password, email, function(data){
          // Get the message from server
          errorMessage = angular.copy(data);
          // show alert
          $scope.showAlert = function() {
            //definre alert
            var alertPopup = $ionicPopup.alert({
              title: errorMessage.title,
              template: errorMessage.msg
            });
            //show alert
            alertPopup.then(function(res){
            });
          };
          $scope.showAlert();

          if(password != null){
            userInfo.Password = password; 
          }
          
          window.localStorage.userInfo = JSON.stringify(userInfo);
          window.location = "#/tab/account";
          //$state.go($state.current, $stateParams, {reload: true});
        })
      } else{

      }
    });
  }
})

.controller('ReminderCtrl', function($scope) {
  
});


