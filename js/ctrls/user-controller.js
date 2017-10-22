/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/

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
            for(var i = 0; i < $scope.threadsDTO.length; i++) { // skal gøres pænere
                var creationDate = new Date($scope.threadsDTO[i].creationDate);
                var now = new Date();
                var difference = (now - creationDate) / (1000);
                var factor = 1;
                var notation = 'seconds';
                if(difference > 60 - 1) { // sekunder --> minutter
                    factor *= 60;
                    notation = 'minutes';
                }
                if(difference > (60 * 60) -1) { // minutter --> timer
                    factor *= 60;
                    notation = 'hours';
                }
                if(difference > (60 * 60 * 24) - 1) { //timer --> dage
                    factor *= 24;
                    notation = 'days';
                }
                if(difference > (60 * 60 * 24 * 7) - 1) { //dage --> uger
                    factor *= 7;
                    notation = 'weeks';
                }
                if(difference > (60 * 60 * 24 * 7 * 4) - 1) { // uger --> måneder
                    factor *= 4;
                    notation = 'months';
                }
                if(difference > (60 * 60 * 24 * 7 * 4 * 12) - 1) { // måneder --> år
                    factor *= 12;
                    notation = 'years';
                }
                $scope.threadsDTO[i].difference = Math.round(difference / factor);
                $scope.threadsDTO[i].notation = notation;
            }
            //console.log(creationDate);

            //console.log($scope.threadsDTO);

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
