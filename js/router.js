/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/

function xmlHttp(method, url, data, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            callback(xmlHttp.responseText);
        }
    };
    xmlHttp.onerror = function(error) {
        console.log('Error connecting to server.');
    }
    xmlHttp.open(method, url, true); // true for asynchronous 
    xmlHttp.setRequestHeader('Content-Type', 'application/json')
    xmlHttp.withCredentials = true
        //xmlHttp.setRequestHeader('Authorization', '')
    xmlHttp.send(data);
}

function get(url, callback) {
    xmlHttp('GET', url, null, callback);
}

function getWithParams(url, data, callback) {
    xmlHttp('GET', url + '?id=' + data, null, callback);
}

function put(url, data, callback) {
    xmlHttp('PUT', url, data, callback);
}

function post(url, data, callback) {
    xmlHttp('POST', url, data, callback);
}

function del(url, data, callback) {
    xmlHttp('DELETE', url, data, callback);
}

angular.module('forumApp').config(function($routeProvider, $locationProvider) {

    function isLoggedIn($location, newLocation) {
        if (getIsLoggedIn() === true) {
            $location.path(newLocation);
        }
    }

    function isNotLoggedIn($location, newLocation) {
        if (!getIsLoggedIn()) {
            $location.path(newLocation);
        }
    }

    $routeProvider
        .when('/', {
            resolve: {
                "check": function($location) {
                    isLoggedIn($location, '/dashboard');
                }
            },
            templateUrl: 'partials/login.html',
            controller: 'loginCtrl'
        })
        .when('/create', {
            resolve: {
                "check": function($location) {
                    isLoggedIn($location, '/dashboard');
                }
            },
            templateUrl: 'partials/createAccount.html',
            controller: 'createAccountCtrl'
        })
        .when('/dashboard', {
            resolve: {
                "check": function($location) {
                    isNotLoggedIn($location, '/');
                }
            },
            templateUrl: 'partials/dashboard.html',
            controller: 'dashboardCtrl'
        })
        .when('/categories', {
            resolve: {
                "check": function($location) {
                    isNotLoggedIn($location, '/');
                }
            },
            templateUrl: 'partials/categories.html',
            controller: 'categoriesCtrl'
        })
        .when('/mytopics', {
            resolve: {
                "check": function($location) {
                    isNotLoggedIn($location, '/');
                }
            },
            templateUrl: 'partials/mytopics.html',
            controller: 'mytopicsCtrl'
        })
        .when('/newthread/:id/:name', {
            resolve: {
                "check": function($location) {
                    isNotLoggedIn($location, '/');
                }
            },
            templateUrl: 'partials/newthread.html',
            controller: 'newthreadCtrl'
        })
        .when('/users/:id', {
            resolve: {
                "check": function($location) {
                    isNotLoggedIn($location, '/');
                }
            },
            templateUrl: 'partials/user.html',
            controller: 'userCtrl'
        })
        .when('/threads/:id', {
            resolve: {
                "check": function($location) {
                    isNotLoggedIn($location, '/');
                }
            },
            templateUrl: 'partials/thread.html',
            controller: 'threadCtrl'
        })
        .when('/search/:searchTerm', {
            resolve: {
                "check": function($location) {
                    isNotLoggedIn($location, '/');
                }
            },
            templateUrl: 'partials/search.html',
            controller: 'searchCtrl'
        })
        .when('/category/:id', {
            resolve: {
                "check": function($location) {
                    isNotLoggedIn($location, '/');
                }
            },
            templateUrl: 'partials/category.html',
            controller: 'categoryCtrl'
        })
        .when('/403', {
            templateUrl: 'partials/403.html'
        })
        .when('/404', {
            templateUrl: 'partials/404.html'
        })
        .otherwise({
            redirectTo: '/404'
        });
    $locationProvider.html5Mode(true);
});