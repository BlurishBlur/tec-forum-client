/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/

angular.module('forumApp').controller('categoryCtrl', function ($scope, $location, $routeParams) {
    "use strict";

    $scope.$on("$routeChangeSuccess", function(event, next, current) {
        console.log('paramsid : ' + $routeParams.id);
        getThreadsInCategory();
    })

    function getThreadsInCategory () {
        getWithParams(getUrl('threads'), $routeParams.id, function (content) {
            var threadsDTO = JSON.parse(content);

            //INDSÆT KODE HER

            console.log(threadsDTO);

            $scope.$apply();
        });
    };

});
