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

    var box = document.getElementById('myBox');
	var span = document.getElementsByClassName("close")[0];
	
	$scope.showWarning = function() {
	    box.style.display = "block";
	}

	$scope.close = function() {
	    box.style.display = "none";
	}
	
	window.onclick = function(event) {
	    if (event.target == box) {
        	box.style.display = "none";
    	}
	}
});
