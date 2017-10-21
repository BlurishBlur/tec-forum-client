/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/

angular.module('forumApp').controller('categoriesCtrl', function ($scope, $location) {
    "use strict";

    var route = 'categories';
    var categoryId = 1;

    function getThreadsInCategory () {
        post(getUrl('categories/threads'), categoryId, function (content) {
            var threadsDTO = JSON.parse(content);

            //ÍNDSÆT KODE HER

        console.log(threadsDTO);

            $scope.$apply();
        });
    };


    $scope.getCategories = function () {
        get(getUrl(route), null, function (content) {
            $scope.categoriesDTO = JSON.parse(content);

        //console.log(categoriesDTO);

            $scope.$apply();
            getThreadsInCategory();
        });
    };

    $j("#headerCategories").click($scope.getCategories());

});
