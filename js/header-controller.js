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

    if($location.path() === '/dashboard') {
        $j(function(){
            $j("#headerHome").addClass("active"); 
         });
        
    } else if($location.path() === '/categories') {
        $j(function(){
            $j("#headerCategories").addClass("active"); 
         });
    }
    
    $scope.goToHome = function() {
        $location.path('/dashboard');
        $j(".active").removeClass("active");
        $j("#headerHome").addClass("active");
    }

    $scope.goToCategories = function() {
        $location.path('/categories');
        $j(".active").removeClass("active");
        $j("#headerCategories").addClass("active");
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
