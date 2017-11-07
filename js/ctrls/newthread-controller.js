angular.module('forumApp').controller('newthreadCtrl', function($scope, $location, $routeParams, $interval) {
    "use strict";

    var interval;

    $scope.$on("$routeChangeSuccess", function(event, next, current) {
        $scope.categoryName = $routeParams.name;
    })

    $scope.submitThread = function() {
        if (($scope.title === "" || $scope.title === undefined) && $scope.content === "" || $scope.content === undefined) {
            $j(".commentMessage").show();
        } else {
            $j(".commentMessage").hide();
            var userID = JSON.parse(sessionStorage.getItem(userToken)).id;
            console.log(userID);
            var commentParams = JSON.stringify({ categoryId: $routeParams.id, authorId: userID, title: $scope.title, content: $scope.content });
            put(getUrl('/thread'), commentParams, function(content) {
                content = JSON.parse(content);
                console.log("Submit sent");
                console.log('new thread id: ' + content.id);

                $location.path('/threads/'+content.id);

                $scope.$apply();
            })
        }
    }
});