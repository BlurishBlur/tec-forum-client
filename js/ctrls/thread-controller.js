angular.module('forumApp').controller('threadCtrl', function($scope, $location, $routeParams, $interval) {
    "use strict";

    var interval;

    $scope.$on("$routeChangeSuccess", function(event, next, current) {
        console.log('paramsid : ' + $routeParams.id);
        getThread();
        getThreadComments();

        // Polling
        interval = $interval(getThreadComments, 5000);
    })

    $scope.$on("$destroy", function() {
        // Stop polling when leaving thread
        $interval.cancel(interval);
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
            console.log("GetComments");
            $scope.$apply();
        });
    }

    $scope.submitComment = function() {
        console.log("Submit clicked");
        if ($scope.comment === "") {
            $j(".commentMessage").show();
        } else {
            $j(".commentMessage").hide();
            var userID = JSON.parse(sessionStorage.getItem(userToken)).id;
            console.log(userID);
            var commentParams = JSON.stringify({ threadId: $routeParams.id, authorId: userID, comment: $scope.comment });
            put(getUrl('/thread/submitComment'), commentParams, function(content) {
                console.log("Submit sent");
                $scope.comment = '';
                getThreadComments();
                console.log("Submit comment response: " + content);
            })
        }
    }
});