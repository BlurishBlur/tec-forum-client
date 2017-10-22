/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/
var units = { // conversion from seconds to other units
    "minute": 60, 
    "hour": 60 * 60, 
    "day": 60 * 60 * 24, 
    "week": 60 * 60 * 24 * 7, 
    "month": 60 * 60 * 24 * 7 * 4, 
    "year": 60 * 60 * 24 * 7 * 4 * 12
}

angular.module('forumApp').controller('userCtrl', function ($scope, $location, $routeParams) {
    "use strict";

	$scope.$on("$routeChangeSuccess", function(event, next, current) {
        console.log('paramsid : ' + $routeParams.id);
        getUser();
        getUserThreads();
    })

    function getUserThreads () {
        getWithParams(getUrl('/users/threads'), $routeParams.id, function (content) {
            $scope.threadsDTO = JSON.parse(content);

            for(var i = 0; i < $scope.threadsDTO.length; i++) {
                var difference = (new Date() - new Date($scope.threadsDTO[i].creationDate)) / (1000); // miliseconds --> seconds
                var factor = 1;
                var notation = 'seconds';

                for(var unit in units) {
                    if(difference > (units[unit] - 1)) {
                        factor = units[unit];
                        notation = unit;
                    }
                }
                $scope.threadsDTO[i].difference = Math.round(difference / factor);
                $scope.threadsDTO[i].notation = ($scope.threadsDTO[i].difference > 1 ? notation + 's' : notation);
            }

            $scope.$apply();
        });
    }

    function getUser () {
        getWithParams(getUrl('/users'), $routeParams.id, function (content) {
            $scope.userDTO = JSON.parse(content);

            var date = new Date($scope.userDTO.creationDate);
            $scope.userDTO.creationDate = date.getDate() + ' ' + date.toLocaleString('en-US', { month: "long" }) + ' ' + date.getFullYear();

        	$scope.$apply();
        });
    }


});
