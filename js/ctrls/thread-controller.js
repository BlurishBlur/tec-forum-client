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

            $scope.threadDTO.creationDate = prettifyDateTimeStamp($scope.threadDTO.creationDate);

            $scope.$apply();
        });
    }

    function getThreadComments() {
        getWithParams(getUrl('/thread/comments'), $routeParams.id, function(content) {
            $scope.commentsDTO = JSON.parse(content);

            for (var i = 0; i < $scope.commentsDTO.length; i++) {
                $scope.commentsDTO[i].creationDate = prettifyDateTimeStamp($scope.commentsDTO[i].creationDate);
            }

            $scope.$apply();
        });
    }

    $scope.submitComment = function() {
        console.log("Submit clicked");
        console.log($scope.comment);
        if ($scope.comment === "" || $scope.comment === undefined) {
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