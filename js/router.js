/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/
angular.module('forumApp').config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        resolve: {
            "check": function($location) {
                var loggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));
                if(loggedIn === true) {
                    $location.path('/dashboard');
                    
                }
            }
        }, 
        templateUrl: 'pages/login.html', 
        controller: 'loginCtrl'
    })
    .when('/create', {
        resolve: {
            "check": function($location) {
                var loggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));
                if(loggedIn === true) {
                    $location.path('/dashboard');
                    
                }
            }
        }, 
        templateUrl: 'pages/createAccount.html', 
        controller: 'createAccountCtrl'
    })
    .when('/dashboard', {
        resolve: {
            "check": function($location) {
                var loggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));
                if(!loggedIn) {
                    $location.path('/');
                    
                }
            }
        }, 
        templateUrl: 'pages/dashboard.html', 
        controller: 'dashboardCtrl'
    })
    .when('/404', {
        templateUrl: 'pages/404.html'
    })
    .otherwise({
        redirectTo: '/404'
    });
    $locationProvider.html5Mode(true);
});
