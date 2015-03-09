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
        //alert("username or password is not correct!");
        // Triggered on a button click, or some other target
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

.controller('appotCategoryCtrl', function($scope) {
  $scope.cats = [{id:"dental",name:"Dental"}, {id:"ent",name:"ENT"}, {id:"womenhealth", name:"Women's Health"}]
  $scope.click = function(cat) {
    window.localStorage.category = cat;
    window.location = "#/tab/status/category/lad";
  }
})

.controller('DateLocationCtrl', function($scope) {
  $scope.locations = [{id:"none",name: " "}, {id:"jurong_point", name: "Jurong Point"}, {id:"bishan", name: "Bishan"}, 
  {id:"changi_airport", name: "Changi Airport"}]
  $scope.dates = [{id:"none",name: " "}, {id:"2015-03-08", name: "March 8th"}, {id:"2015-03-09", name: "March 9th"}, 
  {id:"2015-03-10", name: "March 10th"}]
  
  $scope.click = function() {
    window.location = "#/tab/status/category/lad/doctors";
    window.localStorage.location = document.getElementById("location").value;
    window.localStorage.date = document.getElementById("date").value;
  }
})

.controller('DoctorsCtrl', function($scope) {
  $scope.doctors = [{img: "img/doc1.png", name: "Marty Mcfly", profile: "General Practitioner, Women Health", 
  times: ["08:30", "09:30", "10:30", "11:30", "12:30", "13:30"]}, 
  {img: "img/doc2.png", name: "Mary Fung", profile: "General Practitioner, Dental", 
  times: ["09:30", "10:30", "11:30", "12:30", "13:30"]}, 
  {img: "img/doc3.png", name: "Tom Hagons", profile: "General Practitioner", 
  times: ["08:30", "11:30", "12:30", "13:30"]}]

  $scope.goto = function(doctor) {
    window.localStorage.doctor = JSON.stringify(doctor)
    window.location = "#/tab/status/category/lad/doctors/specific"
  }

  $scope.date = "(" + window.localStorage.date + ")"
})

.controller('DoctorsSpecificCtrl', function($scope) {
  doctor = JSON.parse(window.localStorage.doctor)
  $scope.name = doctor.name
  $scope.img = doctor.img
  $scope.profile = doctor.profile
  $scope.date = window.localStorage.date

  $scope.detail = "Dr Marty Mcfly obtained her Master’s degree in Internal Medicine from the National University of Singapore and membership of the Royal College of Physicians (UK) in 2002. She received her specialist accreditation in Respiratory Medicine in Singapore in 2005 and was awarded the European Diploma in Intensive Care by the European Society of Intensive Care Medicine in 2006. She completed further training in Advanced Pulmonology and Multi-Disciplinary Intensive Care Medicine under a Singapore Ministry of Health scholarship at the Cleveland Clinic in Ohio, USA in 2009 and was elected a Fellow Physician of the American College of Chest Physicians."
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
