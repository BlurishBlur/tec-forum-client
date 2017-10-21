/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/

angular.module('forumApp').controller('categoriesCtrl', function ($scope, $location) {
    "use strict";

    var route = 'categories';


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
        });
    };
    
    $j("#headerCategories").click($scope.getCategories());

});
