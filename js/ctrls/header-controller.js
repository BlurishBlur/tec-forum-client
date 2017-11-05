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

    $scope.showDeleteUser = function() {
        $j("#popUpBox").show();
    }

    $scope.showChangePassword = function() {
        $j("#popUpPasswordChange").show();
    }

    function reset() {
        $scope.passwordReturnMessage = '';
        $scope.repeatPasswordReturnMessage = '';
        colorBorderGrey($j("#passwordChange"));
        colorBorderGrey($j("#repeatChange"));
        $j(".inputText").removeClass("inputTextAnimation");
    }

    $scope.changePassword = function() {
        reset();
        var user = JSON.parse(sessionStorage.getItem(userToken));
        var errors = 0;
        // Check password
        if ($scope.newPassword == undefined || $scope.newPassword.length < 6) {
            $scope.passwordReturnMessage = "Please check that password is more than 6 characters.";
            colorBorderRed($j("#passwordChange"));
            errors++;
        }
        // Check if pass and username is equal
        if (user.username != undefined && $scope.newPassword != undefined && user.username === $scope.newPassword) {
            $scope.passwordReturnMessage = "Username and password cannot be the same.";
            colorBorderRed($j("#passwordChange"));
            errors++;
        }
        // Check if passwords matches
        if ($scope.newPassword === undefined || $scope.newPasswordRepeat === undefined || $scope.newPassword !== $scope.newPasswordRepeat) {
            $scope.repeatPasswordReturnMessage = "Password does not match.";
            colorBorderRed($j("#passwordChange"));
            colorBorderRed($j("#repeatChange"));
            errors++;
        }
        if (errors === 0) {
            postPassword(user);
            $j(".inputText").removeClass("inputTextAnimation");
        } else {
            $j(".inputText").addClass("inputTextAnimation").one("animationend", function() {
                $scope.returnMessage = "There " + (errors > 1 ? " were " + errors + " errors" : " was 1 error") + ".";
            });
        }
    }

    function postPassword(user) {
        var newPasswordObj = JSON.stringify({ newPassword: $scope.newPassword, username: user.username, id: user.id });
        post(getUrl('/change'), newPasswordObj, function(content) {
            $scope.close();
            $scope.$apply();
        });
    }

    $scope.close = function() {
        reset();
        $j("#popUpBox").hide();
        $j("#popUpPasswordChange").hide();
    }

    $scope.deleteUser = function() {
        del(getUrl('/users'), sessionStorage.getItem(userToken), function(content) {
            $scope.logOut();
            $scope.$apply();
        });
    }

    $scope.search = function() {
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(function() {
            if ($scope.searchTerm) {
                $location.path('/search/' + $scope.searchTerm);
                $scope.$apply();
            }
        }, 350);
    }

});