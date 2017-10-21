/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/

angular.module('forumApp').controller('userCtrl', function ($scope, $location, $routeParams) {
    "use strict";

	$scope.$on("$routeChangeSuccess", function(event, next, current) {
        console.log('paramsid : ' + $routeParams.id);
        getUser();
    })

    function getUser () {
        getWithParams(getUrl('users'), $routeParams.id, function (content) {
            $scope.userDTO = JSON.parse(content);
            var year = $scope.userDTO.creationDate.substring(0, 4);
            var day = $scope.userDTO.creationDate.substring(5, 7);
            var month = $scope.userDTO.creationDate.substring(8, 10);
            var date = new Date(year, day, month);
            $scope.userDTO.creationDate = day + ' ' + date.toLocaleString('en-US', { month: "long" }) + ' ' + year;

        	$scope.$apply();
        });
    }


});
