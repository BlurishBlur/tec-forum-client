/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/

angular.module('forumApp').controller('searchCtrl', function($scope, $location, $routeParams) {
    "use strict";

    var route = '/threads';
    $scope.result = [];

    $scope.$on("$routeChangeSuccess", function(event, next, current) {
        console.log('params search: ' + $routeParams.searchTerm);
        $j(".active").removeClass("active");
        //$j("#headerCategories").addClass("active");
        search();
    })

    function search() {
        get(getUrl(route), function(content) {
            var threadsDTO = JSON.parse(content);
            for (var i = 0; i < threadsDTO.length; i++) {
                if (threadsDTO[i].title.toLowerCase().includes($routeParams.searchTerm.toLowerCase())) {
                    $scope.result.push(threadsDTO[i]);
                }
            }
            console.log($scope.result);
            $scope.$apply();
        });
    }

});