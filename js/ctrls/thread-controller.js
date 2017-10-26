angular.module('forumApp').controller('threadCtrl', function($scope, $location, $routeParams, $interval) {
    "use strict";

    var interval;

    $scope.$on("$routeChangeSuccess", function(event, next, current) {
        console.log('paramsid : ' + $routeParams.id);
        getThread();
        getThreadComments();

        // Polling
        //interval = $interval(getThreadComments, 1000);
    })

    $scope.$on("$destroy", function() {
        $interval.cancel(interval);
        console.log("Stop");
    });

    function getThread() {
        getWithParams(getUrl('/thread'), $routeParams.id, function(content) {
            $scope.threadDTO = JSON.parse(content);

            if ($j.isEmptyObject($scope.threadDTO)) {
                $location.path('404');
            }

            var date = new Date($scope.threadDTO.creationDate);
            $scope.threadDTO.creationDate = date.getDate() + ' ' + date.toLocaleString('en-US', { month: "long" }) + ' ' + date.getFullYear();

            $scope.$apply();
        });
    }

    function getThreadComments() {
        getWithParams(getUrl('/thread/comments'), $routeParams.id, function(content) {
            $scope.commentsDTO = JSON.parse(content);
            console.log("Interval");
            $scope.$apply();
            // Repoll
            getThreadComments();
        });
    }
});