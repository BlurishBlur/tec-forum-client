/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/

angular.module('forumApp').controller('searchCtrl', function($scope, $location, $routeParams, $root) {
    "use strict";

    var route = '/threads';

    $scope.$on("$routeChangeSuccess", function(event, next, current) {
        console.log('params search: ' + $routeParams.search);
        $j(".active").removeClass("active");
        //$j("#headerCategories").addClass("active");
        getAllThreads();
    })

    function getAllThreads() {
        get(getUrl(route), function(content) {
            $scope.threadsDTO = JSON.parse(content);

            //console.log(categoriesDTO);

            $scope.$apply();
        });
    }

});