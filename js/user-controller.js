/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/

angular.module('forumApp').controller('userCtrl', function ($scope, $location, $routeParams) {
    "use strict";

	$scope.$on("$routeChangeSuccess", function(event, next, current) {
        console.log('paramsid : ' + $routeParams.id);
        getUser();
    })

    function getUser () {
        get(getUrl('users'), $routeParams.id, function (content) {
            var userDTO = JSON.parse(content);

            //ÍNDSÆT KODE HER

        	console.log(userDTO.username);

        	$scope.$apply();
        });
    }


});
