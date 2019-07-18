"use strict";

angular
  .module("myApp.view1", ["ngRoute"])

  .config(["$routeProvider", function($routeProvider) {}])

  .controller("View1Ctrl", [
    function() {
      console.log("view1");
    }
  ]);
