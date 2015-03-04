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

.controller('DateLocationCtrl', function($scope, $stateParams) {
  alert(window.localStorage.category);
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
