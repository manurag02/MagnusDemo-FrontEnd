"use strict";

angular
  .module("myApp.view1", ["ngRoute"])

  .config(["$routeProvider", function() {}])

  .controller("View1Ctrl", function($scope, PDServe, $state, $rootScope) {
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
        console.log($scope.myForm);
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

    $scope.update = function(uid) {
      $rootScope.sdata = {};
      PDServe.GetSingle(uid).then(response => {
        $rootScope.sdata = response;
        console.log($rootScope.sdata);
        $rootScope.eformData = $rootScope.sdata;
      });
      $state.go("test");
      console.log($rootScope.eformData);
    };
  })

  .controller("editCtrl", function($rootScope, PDServe, $scope) {
    $scope.editUserForm = function() {
      PDServe.Update($rootScope.eformData).then(response => {
        $scope.udata = response;
        console.log($scope.udata);
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
        url: "http://localhost:3000/api/v1/user/view/" + id
      }).then(function(response) {
        return response.data;
      });
      return promise;
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
    thisPDService.Update = function(eformData) {
      let personalDetail = eformData;
      let uid = eformData.uid;

      var promise = $http({
        method: "PUT",
        url: "http://localhost:3000/api/v1/user/" + uid + "/edit",
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
