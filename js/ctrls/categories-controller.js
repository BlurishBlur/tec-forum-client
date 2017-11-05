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

angular.module('forumApp').controller('categoriesCtrl', function($scope, $location, $routeParams) {
    "use strict";

    var route = '/categories';

    $scope.$on("$routeChangeSuccess", function(event, next, current) {
        $j(".active").removeClass("active");
        $j("#headerCategories").addClass("active");
        getCategories();
    })

    function getCategories() {
        get(getUrl(route), function(content) {
            $scope.categoriesDTO = JSON.parse(content);

            for (var i = 0; i < $scope.categoriesDTO.length; i++) {
                var latestActivity = (new Date() - new Date($scope.categoriesDTO[i].latestActivityDate)) / (1000);
                var latestActivityFactor = 1;
                var latestActivityNotation = 'second';

                for (var unit in units) {
                    if (latestActivity > (units[unit] - 1)) {
                        latestActivityFactor = units[unit];
                        latestActivityNotation = unit;
                    }
                }
                $scope.categoriesDTO[i].latestActivity = Math.round(latestActivity / latestActivityFactor);
                $scope.categoriesDTO[i].latestActivityNotation = ($scope.categoriesDTO[i].latestActivityDate > 1 ? latestActivityNotation + 's' : latestActivityNotation);
            }

            $scope.$apply();
        });
    }

});