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
            var categoriesDTO = JSON.parse(content);

            //ÍNDSÆT KODE HER
            /*
            for (var i = 0; i < result.length; i++) {
                categoriesDTO[i].id 
                categoriesDTO[i].title 
                categoriesDTO[i].description 
            }
            */

        console.log(categoriesDTO);

            $scope.$apply();
            getThreadsInCategory();
        });
    };

    $j("#headerCategories").click($scope.getCategories());

});
