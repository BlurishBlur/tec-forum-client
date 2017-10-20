/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/
angular.module('forumApp').controller('dashboardCtrl', function ($scope, $location) {
    "use strict";

    $scope.username = JSON.parse(sessionStorage.getItem('user'));

    $scope.goToHome = function() {
        $location.path('/dashboard');
    }

    $scope.logOut = function() {
        sessionStorage.setItem('loggedIn', JSON.stringify(false));
        $location.path('/');
    }
	
	$scope.showWarning = function() {
	    changeDisplay($j("#popUpBox"), "block");
	}

	$scope.close = function() {
	    changeDisplay($j("#popUpBox"), "none");
	}
});
