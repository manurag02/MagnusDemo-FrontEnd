"use strict";

angular
  .module("myApp.view2", ["ui.router"])
  .config(function($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.when("", "/admin");
    // $urlRouterProvider.when("/", "/admin");
    // // // For any unmatched url, send to /route1
    // $urlRouterProvider.otherwise("/admin");
  })

  .controller("View2Ctrl", [
    function() {
      console.log("view2");
    }
  ]);
