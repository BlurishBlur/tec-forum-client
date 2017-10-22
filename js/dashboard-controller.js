/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/

angular.module('forumApp').controller('dashboardCtrl', function ($scope, $location) {
    "use strict";

    $scope.$on("$routeChangeSuccess", function(event, next, current) {
    	$j(".active").removeClass("active");
        $j("#headerHome").addClass("active"); 
    })

});
