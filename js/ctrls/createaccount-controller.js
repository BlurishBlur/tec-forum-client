/*global angular*/
/*jslint browser: true*/
/*global $j, jQuery, alert*/

angular.module('forumApp').controller('createAccountCtrl', function($scope, $location) {
    "use strict";

    var route = '/users';
    var typingTimeout;

    $scope.$on("$routeChangeSuccess", function(event, next, current) {
        $j('#password').keyup(function() {
            checkPassword();
        });
        $j('#repeat').keyup(function() {
            checkPassword();
        });
    })

    function checkPassword() {
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(function() {
            reset();
            if ($scope.password != undefined && $scope.password.length < 6 && $scope.password != '') {
                $scope.passwordReturnMessage = "Please check that password is more than 6 characters.";
                colorBorderRed($j("#password"));
            }
            if ($scope.username != undefined && $scope.password != undefined && $scope.username === $scope.password) {
                $scope.passwordReturnMessage = "Username and password cannot be the same.";
                colorBorderRed($j("#password"));
            }
            if ($scope.password != undefined && $scope.repeat != '' && $scope.repeat != undefined && $scope.password !== $scope.repeat) {
                $scope.repeatPasswordReturnMessage = "Password does not match.";
                colorBorderRed($j("#password"));
                colorBorderRed($j("#repeat"));
            }
            $scope.$apply();
        }, 500);
    }


    $scope.checkForEnter = function($event) {
        if ($event.keyCode == 13) { // Enter keypress
            $scope.createUser();
        }
    }

    function putUser() {
        var userObj = JSON.stringify({ username: $scope.username, password: $scope.password });

        put(getUrl(route), userObj, function(content) {
            var saveUserDTO = JSON.parse(content);
            $scope.returnMessage = saveUserDTO.message;
            $scope.$apply()
        });
    };

    function reset() {
        $scope.returnMessage = '';
        $scope.usernameReturnMessage = '';
        $scope.passwordReturnMessage = '';
        $scope.repeatPasswordReturnMessage = '';
        colorBorderGrey($j("#username"));
        colorBorderGrey($j("#password"));
        colorBorderGrey($j("#repeat"));
    }

    $scope.createUser = function() {
        reset();
        var errors = 0;
        // Check username
        if ($scope.username === undefined || $scope.username === "") {
            $scope.usernameReturnMessage = "Please write a username.";
            colorBorderRed($j("#username"));
            errors++;
        }
        // Check password
        if ($scope.password == undefined || $scope.password.length < 6) {
            $scope.passwordReturnMessage = "Please check that password is more than 6 characters.";
            colorBorderRed($j("#password"));
            errors++;
        }
        // Check if pass and username is equal
        if ($scope.username != undefined && $scope.password != undefined && $scope.username === $scope.password) {
            $scope.passwordReturnMessage = "Username and password cannot be the same.";
            colorBorderRed($j("#password"));
            errors++;
        }
        // Check if passwords matches
        if ($scope.password === undefined || $scope.repeat === undefined || $scope.password !== $scope.repeat) {
            $scope.repeatPasswordReturnMessage = "Password does not match.";
            colorBorderRed($j("#password"));
            colorBorderRed($j("#repeat"));
            errors++;
        }

        // Final error check
        if (errors === 0) {
            putUser();
        } else {
            $scope.returnMessage = "There " + (errors > 1 ? " were " + errors + " errors" : " was 1 error") + ".";
        }
    }

    $scope.goToHome = function() {
        $location.path('/');
    }

});