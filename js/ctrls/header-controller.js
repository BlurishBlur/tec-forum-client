/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/

angular.module('forumApp').controller('headerCtrl', function($scope, $location) {
    "use strict";

    $scope.header = { name: 'header.html', url: './partials/header.html' };
    var typingTimeout;

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

    $scope.changePass = function() {
        var user = JSON.parse(sessionStorage.getItem(userToken));
        var newPasswordObj = JSON.stringify({newPassword: $scope.newPassword, username: user.username, id: user.id});
        post(getUrl('/change'), newPasswordObj, function(content) {
            $scope.close();
            $scope.$apply();
        });
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
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(function() {
            $location.path('/search/' + $scope.searchTerm);
            $scope.$apply();
        }, 350);
    }

});