/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/

angular.module('forumApp').controller('headerCtrl', function ($scope, $location) {
    "use strict";

    $scope.header = {name: 'header.html', url: './partials/header.html'};

    $scope.isLoggedIn = function() {
        var isLoggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));
        if(isLoggedIn === true) {
            $scope.username = JSON.parse(sessionStorage.getItem('user'));
        }
        return isLoggedIn;
    }
    
    $scope.goToHome = function() {
        $location.path('/dashboard');
    }

    $scope.goToCategories = function() {
        $location.path('/categories');
    }

    $scope.logOut = function() {
        sessionStorage.setItem('loggedIn', JSON.stringify(false));
        $location.path('/');
    }
	
	$scope.showWarning = function() {
	    $j("#popUpBox").show();
	}

    $scope.changePassword = function() {
        $j("#popUpPasswordChange").show();
    }

	$scope.close = function() {
	    $j("#popUpBox").hide();
        $j("#popUpPasswordChange").hide();
	}
});
