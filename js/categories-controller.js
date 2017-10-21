/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/

angular.module('forumApp').controller('categoriesCtrl', function ($scope, $location, $routeParams) {
    "use strict";

    var route = 'categories';
    var categoryId = 1;

    function getThreadsInCategory () {
        post(getUrl('categories/threads'), categoryId, function (content) { // skal laves om
            var threadsDTO = JSON.parse(content);
            console.log(threadsDTO);

            $scope.$apply();
        });
    }


    $scope.getCategories = function () {
        get(getUrl(route), '', function (content) {
            $scope.categoriesDTO = JSON.parse(content);

            //console.log(categoriesDTO);

            $scope.$apply();
            getThreadsInCategory();
        });
    }

    $j("#headerCategories").click($scope.getCategories());

});