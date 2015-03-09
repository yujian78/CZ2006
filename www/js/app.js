// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: 'LoginCtrl'
  })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.status', {
    url: '/status',
    views: {
      'tab-status': {
        templateUrl: 'templates/tab-status.html',
        controller: 'DashCtrl'
      }
    }
  })
   .state('tab.status-category', {
      url: '/status/category',
      views: {
        'tab-status': {
          templateUrl: 'templates/status-category.html',
          controller: 'appotCategoryCtrl'
        }
      }
    })
      .state('tab.status-category-lad', {
      url: '/status/category/lad',
      views: {
        'tab-status': {
          templateUrl: 'templates/status-datelocation.html',
          controller: 'DateLocationCtrl'
        }
      }
    })
      .state('tab.status-doctors', {
      url: '/status/category/lad/doctors',
      views: {
        'tab-status': {
          templateUrl: 'templates/status-doctors.html',
          controller: 'DoctorsCtrl'
        }
      }
    })

      .state('tab.status-doctors-specific', {
      url: '/status/category/lad/doctors/specific',
      views: {
        'tab-status': {
          templateUrl: 'templates/status-doctors-specific.html',
          controller: 'DoctorsSpecificCtrl'
        }
      }
    })

      .state('tab.status-confirmation', {
      url: '/status/confirmation',
      views: {
        'tab-status': {
          templateUrl: 'templates/status-confirmation.html',
          controller: 'ConfirmationCtrl'
        }
      }
    })

  .state('tab.appointments', {
      url: '/appointments',
      views: {
        'tab-appointments': {
          templateUrl: 'templates/tab-appointments.html',
          controller: 'AppointmentsCtrl'
        }
      }
    })
    
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
