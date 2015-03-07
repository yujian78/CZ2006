angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  $scope.new_appointment = function() {
    window.location = "#/tab/status/category"
  }
})

.controller('appotCategoryCtrl', function($scope) {
  $scope.click = function(cat) {
    window.localStorage.category = cat;
    window.location = "#/tab/status/category/lad";
  }
})

.controller('DateLocationCtrl', function($scope) {
  $scope.locations = [{id:"none",name: " "}, {id:"jurong_point", name: "Jurong Point"}, {id:"bishan", name: "Bishan"}, 
  {id:"changi_airport", name: "Changi Airport"}]
  $scope.dates = [{id:"none",name: " "}, {id:"03-08", name: "March 8th"}, {id:"03-09", name: "March 9th"}, 
  {id:"03-10", name: "March 10th"}]
  
  $scope.click = function() {
    window.location = "#/tab/status/category/lad/appointment";
    window.localStorage.location = document.getElementById("location").value;
    window.localStorage.date = document.getElementById("date").value;
  }
})

.controller('AppointmentCtrl', function($scope) {
  $scope.doctors = [{img: "img/doc1.png", name: "Marty Mcfly", profile: "General Practitioner, Women Health", 
  times: ["8:30AM", "9:30AM", "10:30AM", "11:30AM", "12:30PM", "13:30PM"]}, 
  {img: "img/doc2.png", name: "Mary Fung", profile: "General Practitioner, Dental", 
  times: ["9:30AM", "10:30AM", "11:30AM", "12:30PM", "13:30PM"]}, 
  {img: "img/doc3.png", name: "Tom Hagons", profile: "General Practitioner", 
  times: ["8:30AM", "11:30AM", "12:30PM", "13:30PM"]}]
  $scope.goto = function(doctor) {
    window.localStorage.doctor = JSON.stringify(doctor)
    console.log(doctor)
    window.location = "#/tab/status/category/lad/appointment/specific"
  }
})

.controller('AppointmentSpecificCtrl', function($scope) {
  doctor = JSON.parse(window.localStorage.doctor)
  $scope.name = doctor.name
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
