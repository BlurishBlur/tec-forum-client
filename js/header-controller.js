/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/

angular.module('forumApp').controller('headerCtrl', function ($scope, $location) {
    "use strict";

    $scope.header = {name: 'header.html', url: './partials/header.html'};

    //$j("#popUpBox").hide();

    $scope.username = JSON.parse(sessionStorage.getItem('user'));

    $scope.goToHome = function() {
        $location.path('/dashboard');
    }

    $scope.logOut = function() {
        sessionStorage.setItem('loggedIn', JSON.stringify(false));
        $location.path('/');
    }
	
	$scope.showWarning = function() {
	    $j("#popUpBox").show();
	}

	$scope.close = function() {
	    $j("#popUpBox").hide();
	}
});