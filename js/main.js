/*global angular*/
/*jslint browser: true*/
/*global $, jQuery, alert*/
var $j = jQuery.noConflict();
var app = angular.module('forumApp', ['ngRoute']);
var loggedInToken = 'loggedIn';
var userToken = 'user';
var config;

$j.getJSON('./cfg/config.json', function(response) {
    config = response;
});

function getUrl(route) {
    console.log("http://%s:%s%s", config.host, config.port, route);
    return "http://" + config.host + ":" + config.port + route;
}

function getIsLoggedIn() {
    return JSON.parse(sessionStorage.getItem(loggedInToken));
}

function colorBorderRed(inputElement) {
    inputElement.css("border", "3px solid #840200");
}

function colorBorderGrey(inputElement) {
    inputElement.css("border", "3px solid #9EA9AB");
}

function prettifyDateStamp(dateStamp) {
    var date = new Date(dateStamp);

    return date.getDate() + ' ' +
        date.toLocaleString('en-US', { month: "long" }) + ' ' +
        date.getFullYear();
}

function prettifyDateTimeStamp(dateTimeStamp) {
    var date = new Date(dateTimeStamp);

    return prettifyDateStamp(dateTimeStamp) + ', ' +
        padTime(date.getHours()) + ':' + padTime(date.getMinutes());
}

function padTime(time) {
    if (time < 10) {
        time = '0' + time;
    }
    return time;
}
/*
angular.module('forumApp').filter('debug', function() {
  return function(input) {
    if (input === '') return 'empty string';
    return input ? input : ('' + input);
  };
});
*/