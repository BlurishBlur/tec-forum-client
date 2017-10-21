/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/

angular.module('forumApp').controller('categoryCtrl', function ($scope, $location) {
    "use strict";

    var route = 'categories/threads';
    var categoryId = 1;


    function getThreadsInCategory () {
        post(getUrl('categories/threads'), categoryId, function (content) {
            var threadsDTO = JSON.parse(content);

            //ÍNDSÆT KODE HER

        console.log(threadsDTO);

            $scope.$apply();
        });
    };
    
    $j("#").click($scope.getThreadsInCategory()); //sæt IDet til activatoren

});
