Controllers

.controller('AppointmentsCtrl', function($scope, $rootScope, DisplayAppointment) {
		$scope.apps = JSON.parse(window.localStorage.userApp);

		$scope.chooseApp = function(appChoosen) {
			window.localStorage.appSelect = JSON.stringify(appChoosen);			
			window.location = "#/tab/appointments/detail";
		}
});