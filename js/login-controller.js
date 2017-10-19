/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/
route = 'users';

$j('#password').keypress(function(e) { //Enter keypress
    if(e.keyCode==13) {
        $j('#loginButton').click();
    }
});

angular.module('forumApp').controller('loginCtrl', function ($scope, $location, $rootScope) {
    "use strict";

    $rootScope.test = "b";

    $scope.postUser = function () {
        var userObj = JSON.stringify( {username: $scope.username, password: $scope.password} );
        post(getUrl(route), userObj, function (content) {
            var logInDTO = JSON.parse(content);

            sessionStorage.setItem('loggedIn', JSON.stringify(logInDTO.loggedIn));
            if (logInDTO.loggedIn === true) {
                sessionStorage.setItem('user', JSON.stringify($scope.username)); //skal laves om til at holde id
                $location.path('/dashboard');
            }
            else {
                $scope.loginReturnMessage = logInDTO.message;
                colorBorderRed($j("#username"));
                colorBorderRed($j("#password"));
            }
            $scope.$apply();
        });
    };
    
    $scope.logIn = function() {
        $scope.postUser();
    }

    $scope.goToCreate = function() {
        $location.path('/create');
    }

});
