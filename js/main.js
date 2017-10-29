/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/
var $j = jQuery.noConflict();
var app = angular.module('forumApp', ['ngRoute']);
var config;
$j.getJSON('./cfg/config.json', function(response) {
    config = response;
});

function getUrl(route) {
    console.log("http://%s:%s%s", config.host, config.port, route);
    return "http://" + config.host + ":" + config.port + route;
}

function colorBorderRed(inputElement) {
    inputElement.css("border", "3px solid #840200");
}

function colorBorderGrey(inputElement) {
    inputElement.css("border", "3px solid #9EA9AB");
}

/*
angular.module('forumApp').filter('debug', function() {
  return function(input) {
    if (input === '') return 'empty string';
    return input ? input : ('' + input);
  };
});
*/