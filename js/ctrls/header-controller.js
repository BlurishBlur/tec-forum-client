/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/

angular.module('forumApp').controller('headerCtrl', function($scope, $location) {
    "use strict";

    $scope.header = { name: 'header.html', url: './partials/header.html' };

    $scope.isLoggedIn = function() {
        var isLoggedIn = getIsLoggedIn();
        if (isLoggedIn === true) {
            $scope.username = JSON.parse(sessionStorage.getItem(userToken)).username;
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
        sessionStorage.setItem(loggedInToken, JSON.stringify(false));
        $scope.close();
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

    $scope.deleteUser = function() {
        console.log('deluser');
        del(getUrl('/users'), sessionStorage.getItem(userToken), function(content) {
            $scope.logOut();
            $scope.$apply();
        });
    }

    $scope.search = function() {
        console.log($scope.searchTerm);
        //$location.path('/search/' + $scope.searchTerm);
    }

});

app.filter('search', function() {



    return function(threadsList, searchTerm) {
        if (!searchTerm) {
            return threadsList;
        }

        var result = [];
        searchTerm = searchTerm.toLowerCase();

        for (var i = 0; i < threadsList.length; i++) {
            //if (threadsList[i].)

        }

    }

});