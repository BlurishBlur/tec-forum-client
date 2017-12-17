angular.module('forumApp').controller('threadCtrl', function ($scope, $location, $routeParams) {
    "use strict";

    var interval;
    var socket = io(getUrl('/'));
    $scope.$on("$routeChangeSuccess", function (event, next, current) {
        getThread();
        getThreadComments();

        var roomId = "thread" + $routeParams.id;
        socket.emit('join', roomId);

        socket.on('update', function(data) {
            updateComments(data);
        });
    })

    $scope.$on("$destroy", function () {
        var roomId = "thread" + $routeParams.id;
        socket.disconnect();
    });

    function getThread() {
        getWithParams(getUrl('/thread'), $routeParams.id, function (content) {
            $scope.threadDTO = JSON.parse(content);

            if ($j.isEmptyObject($scope.threadDTO)) {
                $location.path('404');
            }

            $scope.threadDTO.creationDate = prettifyDateTimeStamp($scope.threadDTO.creationDate);

            $scope.$apply();
        });
    }

    function getThreadComments() {
        getWithParams(getUrl('/thread/comments'), $routeParams.id, function (content) {
            $scope.commentsDTO = JSON.parse(content);

            for (var i = 0; i < $scope.commentsDTO.length; i++) {
                $scope.commentsDTO[i].creationDate = prettifyDateTimeStamp($scope.commentsDTO[i].creationDate);
            }

            $scope.$apply();
        });
    }

    function updateComments(comments) {
        $scope.commentsDTO = JSON.parse(comments);

        for (var i = 0; i < $scope.commentsDTO.length; i++) {
            $scope.commentsDTO[i].creationDate = prettifyDateTimeStamp($scope.commentsDTO[i].creationDate);
        }

        $scope.$apply();
    }

    $scope.submitComment = function () {
        console.log("Submit clicked");
 
        if ($scope.comment === "" || $scope.comment === undefined) {
            $j(".commentMessage").show();
        } else {
            $j(".commentMessage").hide();
            var userID = JSON.parse(sessionStorage.getItem(userToken)).id;
            var commentParams = JSON.stringify({ threadId: $routeParams.id, authorId: userID, comment: $scope.comment });
            put(getUrl('/thread/submitComment'), commentParams, function (content) {
                console.log("Submit sent");
                $scope.comment = '';
                getThreadComments();

                socket.emit('newComment', { threadId: $routeParams.id });
            })
        }
    }
});