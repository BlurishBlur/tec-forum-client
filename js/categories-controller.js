/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/

angular.module('forumApp').controller('categoriesCtrl', function ($scope, $location, $routeParams) {
    "use strict";

    var route = 'categories';


    $scope.getCategories = function () {
        get(getUrl(route), '', function (content) {
            $scope.categoriesDTO = JSON.parse(content);

            //console.log(categoriesDTO);

            $scope.$apply();
            //getThreadsInCategory();
        });
    }

    $j("#headerCategories").click($scope.getCategories());

});