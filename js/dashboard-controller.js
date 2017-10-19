/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/
angular.module('forumApp').controller('dashboardCtrl', function ($scope, $location) {
    "use strict";

    $scope.username = JSON.parse(sessionStorage.getItem('user'));

    $scope.gotoHome = function() {
        $location.path('/dashboard');
    }

    $scope.logOut = function() {
        sessionStorage.setItem('loggedIn', JSON.stringify(false));
        $location.path('/');
    }

});
