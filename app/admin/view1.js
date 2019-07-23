"use strict";

angular
  .module("myApp.view1", ["ngRoute"])

  .config(["$routeProvider", function($scope) {}])

  .controller("View1Ctrl", function($scope, PDServe) {
    // console.log(PDServe.GetAll());

    $scope.submitForm = function() {
      // check to make sure the form is completely valid
      $scope.user = {
        userCode: $scope.myForm.usercode.$modelValue,
        userFullName: $scope.myForm.userFullName.$modelValue,
        department: $scope.myForm.department.$modelValue,
        mobile: $scope.myForm.mobile.$modelValue,
        email: $scope.myForm.email.$modelValue,
        userID: $scope.myForm.userID.$modelValue,
        password: $scope.myForm.repeatPass.$modelValue
      };

      if ($scope.myForm.$valid) {
        console.log("input data" + $scope.user);
        console.log(PDServe.Insert($scope.user));
      }
    };

    $scope.getAll = function() {
      $scope.udata = [];
      console.log("Got all");
      PDServe.GetAll().then(response => {
        $scope.udata = response;
        console.log($scope.udata);
      });
    };

    $scope.delete = function(id1, row) {
      $scope.udata.splice(row, 1);
      PDServe.Remove(id1).then(response => {
        console.log(response);
      });
    };
  })

  .directive("compareTo", function() {
    return {
      require: "ngModel",

      scope: {
        repeatPassword: "=compareTo"
      },

      link: function(scope, element, attributes, paramval) {
        paramval.$validators.compareTo = function(val) {
          return val == scope.repeatPassword;
        };

        scope.$watch("repeatPassword", function() {
          paramval.$validate();
        });
      }
    };
  })
  .factory("PDServe", function($http) {
    var thisPDService = {};
    // var port = 3000;

    // get all data from database
    thisPDService.GetAll = function($scope) {
      var promise = $http({
        method: "GET",
        url: "http://localhost:3000/api/v1/user/all"
      }).then(function(response) {
        return response.data;
      });
      return promise;
    };

    // get single record from database
    thisPDService.GetSingle = function(id) {
      var promise = $http({
        method: "GET",
        url: "http://localhost:" + port + "/api/v1/user/all" + id
      }).then(function(response) {
        $scope.udata = response.data;
        return $scope.udata;
      });
      return $scope.udata;
    };

    // post the data from database
    thisPDService.Insert = function(user) {
      var personalDetail = user;

      var promise = $http({
        method: "POST",
        url: "http://localhost:3000/api/v1/user/create",
        data: personalDetail
      }).then(function(response) {
        return response.statusText;
      });

      return promise;
    };

    // put the data from database
    thisPDService.Update = function(autoId, firstName, lastName, age, active) {
      var personalDetail = {
        AutoId: autoId,
        FirstName: firstName,
        LastName: lastName,
        Age: age,
        Active: active
      };

      var promise = $http({
        method: "PUT",
        url: "/api/PersonalDetails/" + autoId,
        data: personalDetail
      }).then(
        function(response) {
          return "Updated";
          // return response.statusText + ' ' + response.status + ' ' + response.data;
        },
        function(response) {
          return (
            response.statusText + " " + response.status + " " + response.data
          );
        }
      );

      return promise;
    };

    // delete the data from database
    thisPDService.Remove = function(uid) {
      var promise = $http({
        method: "POST",
        url: "http://localhost:3000/api/v1/user/" + uid + "/delete"
      }).then(function(response) {
        // return "Deleted";
        return (
          response.statusText + " " + response.status + " " + response.data
        );
      });

      return promise;
    };

    return thisPDService;
  });
