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

angular.module('forumApp').controller('categoryCtrl', function($scope, $location, $routeParams) {
    "use strict";

    $scope.$on("$routeChangeSuccess", function(event, next, current) {
        console.log('paramsid : ' + $routeParams.id);
        getCategoryName();
        getThreadsInCategory();
    })

    function getCategoryName() {
        getWithParams(getUrl('/categoryName'), $routeParams.id, function(content) {
            $scope.categoryNameDTO = JSON.parse(content);
            $scope.categoryTitle = $scope.categoryNameDTO.categoryName;
        });
    }

    function getThreadsInCategory() {
        getWithParams(getUrl('/categories/threads'), $routeParams.id, function(content) {
            $scope.threadsDTO = JSON.parse(content);

            for (var i = 0; i < $scope.threadsDTO.length; i++) {
                var threadDateDifference = (new Date() - new Date($scope.threadsDTO[i].creationDate)) / (1000); // miliseconds --> seconds
                var latestActivity = (new Date() - new Date($scope.threadsDTO[i].latestActivity)) / (1000);
                var threadDateFactor = 1;
                var threadDateNotation = 'second';
                var latestActivityFactor = 1;
                var latestActivityNotation = 'second';
        
                for (var unit in units) {
                    if (threadDateDifference > (units[unit] - 1)) {
                        threadDateFactor = units[unit];
                        threadDateNotation = unit;
                    }

                    if(latestActivity > (units[unit] - 1)) {
                        latestActivityFactor = units[unit];
                        latestActivityNotation = unit;
                    }
                }
                $scope.threadsDTO[i].threadDateDifference = Math.round(threadDateDifference / threadDateFactor);
                $scope.threadsDTO[i].threadDateNotation = ($scope.threadsDTO[i].threadDateDifference > 1 ? threadDateNotation + 's' : threadDateNotation);
                $scope.threadsDTO[i].latestActivity = Math.round(latestActivity / latestActivityFactor);
                $scope.threadsDTO[i].latestActivityNotation = ($scope.threadsDTO[i].latestActivity > 1 ? latestActivityNotation + 's' : latestActivityNotation);       
            }


            $scope.$apply();
        });
    };

});