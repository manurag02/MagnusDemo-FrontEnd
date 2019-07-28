"use strict";

angular
  .module("myApp.view4", ["ui.router"])
  .config(function($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.when("", "/admin");
    // $urlRouterProvider.when("/", "/admin");
    // // // For any unmatched url, send to /route1
    // $urlRouterProvider.otherwise("/admin");
  })

  .controller("View4Ctrl", [
    function() {
      console.log("view4");
    }
  ]);
