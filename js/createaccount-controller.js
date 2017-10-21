/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/

angular.module('forumApp').controller('createAccountCtrl', function ($scope, $location) {
    "use strict";

    var route = 'users';

    $j('#repeat').keypress(function(e){
        if(e.keyCode == 13) {
            $j('#create').click();
        }
    });

    $scope.putUser = function () {
        var userObj = JSON.stringify( {username: $scope.username, password: $scope.password} );

        put(getUrl(route), userObj, function (content) {
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
    
    $scope.createUser = function () {
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
            $scope.putUser();
        }
        else {
            $scope.returnMessage = "There " + (errors > 1 ? " were " + errors + " errors" : " was 1 error") + ".";
        }
    }

    $scope.goToHome = function() {
        $location.path('/');
    }

});
