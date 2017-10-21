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
        getWithParams(getUrl('users'), $routeParams.id, function (content) {
            var userDTO = JSON.parse(content);

            //INDSÆT KODE HER

        	console.log(userDTO.username);

        	$scope.$apply();
        });
    }


});
