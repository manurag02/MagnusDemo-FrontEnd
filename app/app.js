"use strict";

// Declare app level module which depends on views, and core components
var myApp = angular.module("myApp", [
  "ui.router",
  "myApp.view1",
  "myApp.view2",
  "myApp.view3",
  "myApp.view4",
  "myApp.version"
]);

myApp.config(function($stateProvider, $urlRouterProvider) {
  // // For any unmatched url, send to /route1
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state("login", {
      url: "/login",
      // loaded into ui-view of parent's template
      templateUrl: "login/login.html",
      controller: "View4Ctrl",
      onEnter: function() {
        console.log("enter login page");
      }
    })
    .state("/", {
      url: "/",
      // loaded into ui-view of parent's template
      views: {
        side: {
          templateUrl: "login/dashboard.html",
          controller: "View4Ctrl",
          onEnter: function() {
            console.log("enter login page");
          }
        }
      }
    })
    .state("viewDash", {
      url: "/viewDash",
      // loaded into ui-view of parent's template
      views: {
        main: {
          templateUrl: "login/viewDash.html",
          controller: "View4Ctrl",
          onEnter: function() {
            console.log("enter login page");
          }
        }
      }
    })
    .state("admin", {
      url: "/admin",
      // loaded into ui-view of parent's template
      views: {
        side: {
          templateUrl: "login/dashboard.html",
          controller: "View4Ctrl",
          onEnter: function() {
            console.log("enter login page");
          }
        },
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
      parent: "admin",
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
    .state("test", {
      parent: "admin",
      url: "/admin/reports/edit-user-reg",
      // correct
      views: {
        edituser: {
          templateUrl: "admin/user-data.html",
          controller: "editCtrl",
          onEnter: function() {
            console.log("enter reports edit user reg page");
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
    .state("sourcing.rfq", {
      url: "/rfq",
      // loaded into ui-view of parent's template
      templateUrl: "sourcing/rfq.html",
      controller: "View2Ctrl",
      onEnter: function() {
        console.log("enter rfq page");
      }
    })

    .state("sourcing.quotation", {
      url: "/quotation",
      // loaded into ui-view of parent's template
      templateUrl: "sourcing/sourcing-quotation.html",
      controller: "View2Ctrl",
      onEnter: function() {
        console.log("enter sourcing quotation page");
      }
    })
    .state("sourcing.vendor", {
      url: "/vendor",
      // loaded into ui-view of parent's template
      templateUrl: "sourcing/sourcing-vendor.html",
      controller: "View2Ctrl",
      onEnter: function() {
        console.log("enter sourcing vendor page");
      }
    })
    .state("sourcing.prr", {
      url: "/prr",
      // loaded into ui-view of parent's template
      templateUrl: "sourcing/prr.html",
      controller: "View2Ctrl",
      onEnter: function() {
        console.log("enter sourcing prr page");
      }
    })

    .state("apautomation", {
      url: "/apautomation",
      // loaded into ui-view of parent's template
      views: {
        main: {
          templateUrl: "apautomation/apautomation.html",
          controller: "View3Ctrl",
          onEnter: function() {
            console.log("enter apautomation page");
          }
        }
      }
    })

    .state("apautomation.aprepository", {
      url: "/aprepository",
      // loaded into ui-view of parent's template
      templateUrl: "apautomation/aprepository.html",
      controller: "View3Ctrl",
      onEnter: function() {
        console.log("enter ap repository page");
      }
    })

    .state("apautomation.uploadextract", {
      url: "/uploadextract",
      // loaded into ui-view of parent's template
      templateUrl: "apautomation/uploadextract.html",
      controller: "View3Ctrl",
      onEnter: function() {
        console.log("enter upload extract  page");
      }
    })
    .state("apautomation.apverification", {
      url: "/apverification",
      // loaded into ui-view of parent's template
      templateUrl: "apautomation/apverification.html",
      controller: "View2Ctrl",
      onEnter: function() {
        console.log("enter ap verification page");
      }
    })

    .state("apautomation.apapproval", {
      url: "/apapproval",
      // loaded into ui-view of parent's template
      templateUrl: "apautomation/apapproval.html",
      controller: "View2Ctrl",
      onEnter: function() {
        console.log("enter ap approval page");
      }
    })

    .state("apautomation.postinvoice", {
      url: "/postinvoice",
      // loaded into ui-view of parent's template
      templateUrl: "apautomation/postinvoice.html",
      controller: "View2Ctrl",
      onEnter: function() {
        console.log("enter post invoice page");
      }
    });
});
