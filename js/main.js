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
    console.log("http://%s:%s%s", config.host, config.port, config.routes[route]);
    return "http://" + config.host + ":" + config.port + config.routes[route];
}

function colorBorderRed(inputElement) {
	inputElement.css("border", "3px solid #840200");
}

function colorBorderGrey(inputElement) {
	inputElement.css("border", "3px solid #9EA9AB");
}

function get (url, data, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            callback(xmlHttp.responseText);
        }
    };
    xmlHttp.open("GET", url+'?id='+data, true); // true for asynchronous 
    xmlHttp.send(null);
}

function put (url, data, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            callback(xmlHttp.responseText);
        }
    };
    xmlHttp.open("PUT", url, true); // true for asynchronous 
    xmlHttp.send(data);
}

function post (url, data, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            callback(xmlHttp.responseText);
        }
    };
    xmlHttp.open("POST", url, true); // true for asynchronous 
    xmlHttp.send(data);
};
