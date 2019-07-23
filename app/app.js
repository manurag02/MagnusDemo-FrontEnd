"use strict";

// Declare app level module which depends on views, and core components
var myApp = angular.module("myApp", [
  "ui.router",
  "myApp.view1",
  "myApp.view2",
  "myApp.version"
]);

myApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when("", "/admin");
  $urlRouterProvider.when("/", "/admin");

  // // For any unmatched url, send to /route1
  $urlRouterProvider.otherwise("/admin");

  $stateProvider
    .state("admin", {
      url: "/admin",
      // loaded into ui-view of parent's template
      views: {
        main: {
          templateUrl: "admin/admin.html",
          controller: "View1Ctrl",
          onEnter: function() {
            console.log("enter admin page");
          }
        }
      }
    })
    .state("admin.mdata", {
      url: "/masterData",
      // loaded into ui-view of parent's template
      views: {
        content: {
          templateUrl: "admin/master-data.html",
          controller: "View1Ctrl",
          onEnter: function() {
            console.log("enter admin master data page");
          }
        }
      }
    })
    .state("admin.usrReg", {
      url: "/user-registration",
      // loaded into ui-view of parent's template
      views: {
        content: {
          templateUrl: "admin/user-registration.html",
          controller: "View1Ctrl",
          onEnter: function() {
            console.log("enter admin user registration page");
          }
        }
      }
    })
    .state("admin.reports", {
      url: "/reports",
      // loaded into ui-view of parent's template
      views: {
        content: {
          templateUrl: "admin/admin-reports.html",
          controller: "View1Ctrl",
          onEnter: function() {
            console.log("enter admin reports page");
          }
        }
      }
    })
    .state("admin.reports.test", {
      url: "/edit-user-reg",
      views: {
        // wrong
        content: {
          // correct
          edituser: {
            templateUrl: "admin/user-registration.html",
            controller: "View1Ctrl",
            onEnter: function() {
              console.log("enter reports edit user reg page");
            }
          }
        }
      }
    })
    .state("sourcing", {
      url: "/sourcing",
      // loaded into ui-view of parent's template
      views: {
        main: {
          templateUrl: "sourcing/sourcing.html",
          controller: "View2Ctrl",
          onEnter: function() {
            console.log("enter sourcing page");
          }
        }
      }
    })
    .state("sourcing.quotation", {
      url: "/quotation",
      // loaded into ui-view of parent's template
      views: {
        content: {
          templateUrl: "sourcing/sourcing-quotation.html",
          controller: "View2Ctrl",
          onEnter: function() {
            console.log("enter sourcing quotation page");
          }
        }
      }
    })
    .state("sourcing.vendor", {
      url: "/vendor",
      // loaded into ui-view of parent's template
      views: {
        content: {
          templateUrl: "sourcing/sourcing-vendor.html",
          controller: "View2Ctrl",
          onEnter: function() {
            console.log("enter sourcing vendor page");
          }
        }
      }
    })
    .state("sourcing.prr", {
      url: "/prr",
      // loaded into ui-view of parent's template
      views: {
        content: {
          templateUrl: "sourcing/prr.html",
          controller: "View2Ctrl",
          onEnter: function() {
            console.log("enter sourcing prr page");
          }
        }
      }
    });
});
