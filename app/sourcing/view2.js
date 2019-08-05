"use strict";

angular
  .module("myApp.view2", ["ui.router", "toastr"])
  .config(function($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.when("", "/admin");
    // $urlRouterProvider.when("/", "/admin");
    // // // For any unmatched url, send to /route1
    // $urlRouterProvider.otherwise("/admin");
  })

  .controller("View2Ctrl", function(
    $scope,
    PDServe,
    $state,
    $rootScope,
    toastr
  ) {
    $scope.setSearch = function() {
      $scope.search = true;
      // $rootScope.RFQItem = "true";

      PDServe.GetAll().then(function(response) {
        // if (response.data.code != "undefined")
        //   toastr.error("RFQNo not found", "RFQNo doesn't Exists!");
        // else {
        toastr.success("Choose RFQNo from dropdown", "Success!");
        $rootScope.all = response;
      });
    };

    $scope.unsetSearch = function() {
      $scope.search = false;
      $rootScope.RFQNo = "";
    };

    $scope.setHeader = function() {
      console.log($scope.RFQNos.RFQNo);
      // console.log($rootScope.all.length);

      for (let i = 0; i < $rootScope.all.length; i++) {
        if ($scope.RFQNos.RFQNo == $rootScope.all[i].RFQNo) {
          // console.log($rootScope.all[i].PRRNo);
          // console.log($rootScope.all[i].VendorNo);
          $rootScope.RFQNo = $scope.RFQNos.RFQNo;
          $scope.RFQDate = new Date($rootScope.all[i].RFQDate);
          $scope.CompCode = $rootScope.all[i].CompCode;
          $scope.PGrp = $rootScope.all[i].PGrp;
          $scope.PurOrg = $rootScope.all[i].PurOrg;
          $scope.PRRNo = $rootScope.all[i].PRRNo;
          $scope.VendorNo = $rootScope.all[i].VendorNo;
          $scope.VendorName = $rootScope.all[i].VendorName;
          $scope.Address = $rootScope.all[i].Address;
          $scope.CollNo = $rootScope.all[i].CollNo;
          $scope.QuotDeadline = new Date($rootScope.all[i].QuotDeadline);
          $scope.StartDate = new Date($rootScope.all[i].StartDate);
          $scope.EndDate = new Date($rootScope.all[i].EndDate);
          $scope.ContactPer = $rootScope.all[i].ContactPer;
          $scope.ContactNo = $rootScope.all[i].ContactNo;
        }
      }

      PDServe.GetSingleItem($scope.RFQNos.RFQNo).then(function(response) {
        if (response != "No Records Found") {
          toastr.success("Choose RFQNo from dropdown", "Success!");
          $rootScope.items = response;
          console.log($rootScope.items);
        } else {
          toastr.error("Items not found", "RFQNo doesn't Exists!");
        }
      });
    };

    $scope.unset = function() {
      $scope.search = false;
      $rootScope.RFQNo = "";
      $scope.RFQDate = "";
      $scope.CompCode = "";
      $scope.PGrp = "";
      $scope.PurOrg = "";
      $scope.PRRNo = "";
      $scope.VendorNo = "";
      $scope.VendorName = "";
      $scope.Address = "";
      $scope.CollNo = "";
      $scope.QuotDeadline = "";
      $scope.StartDate = "";
      $scope.EndDate = "";
      $scope.ContactPer = "";
      $scope.ContactNo = "";
    };

    $scope.submitRFQItem = function() {
      // check to make sure the form is completely valid
      console.log($scope.search);
      $scope.item = {
        RFQNo: $scope.RFQNo,
        ItemNo: $scope.ItemNo,
        ItemCat: $scope.ItemCat,
        Material: $scope.Material,
        MatDesc: $scope.MatDesc,
        RFQQty: $scope.RFQQty,
        OUn: $scope.OUn,
        DeliveryDate: $scope.DeliveryDate,
        MatGroup: $scope.MatGroup,
        Plant: $scope.Plant,
        StorLoc: $scope.StorLoc,
        DelFlag: $scope.DelFlag,
        Remark: $scope.Remark
      };

      // if ($scope.myForm.$valid) {
      if (!$scope.search) {
        console.log($scope.item);
        PDServe.InsertItem($scope.item).then(function(response) {
          console.log(response.data.code);
          if (response.data.code == undefined) {
            toastr.success("Record Inserted", "Success!");
            // $scope.unset();
          } else if (response.data.code == 11000 || (response.data.errors != "" || response.data.errors != null)) toastr.error("Record not inserted", "RFQNo Exists!");
        });
      } else {
        $rootScope.itemformData = $scope.item;
        console.log($scope.itemformData);
        PDServe.UpdateItem($rootScope.itemformData).then(function(response) {
          console.log(response.data.code);
          if (response.data.code == undefined) {
            toastr.success("Record Updated", "Success!");
            // $scope.unset();
          } else if (response.data.code == 11000 || (response.data.errors != "" || response.data.errors != null)) toastr.error("Record not updated", "RFQNo Exists!");
        });
      }
      // .catch(error => toastr.error("Record not inserted", error.errmsg));
      //   // }
    };

    $scope.submitForm = function() {
      // check to make sure the form is completely valid
      $scope.user = {
        RFQNo: $scope.RFQNo,
        RFQDate: $scope.RFQDate,
        CompCode: $scope.CompCode,
        PGrp: $scope.PGrp,
        PurOrg: $scope.PurOrg,
        PRRNo: $scope.PRRNo,
        VendorNo: $scope.VendorNo,
        VendorName: $scope.VendorName,
        CollNo: $scope.CollNo,
        Address: $scope.Address,
        QuotDeadline: $scope.QuotDeadline,
        StartDate: $scope.StartDate,
        EndDate: $scope.EndDate,
        ContactPer: $scope.ContactPer,
        ContactNo: $scope.ContactNo
      };

      // if ($scope.myForm.$valid) {
      if (!$scope.search) {
        console.log($scope.user);
        PDServe.Insert($scope.user).then(function(response) {
          console.log(response.data.code);
          if (response.data.code == undefined) {
            toastr.success("Record Inserted", "Success!");
            $scope.submitRFQItem();
            // $scope.unset();
          } else if (response.data.code == 11000 || (response.data.errors != "" || response.data.errors != null)) toastr.error("Record not inserted", "RFQNo Exists!");
        });
      } else {
        $rootScope.eformData = $scope.user;
        console.log($scope.eformData);
        PDServe.Update($rootScope.eformData).then(function(response) {
          console.log(response.data.code);
          if (response.data.code == undefined) {
            toastr.success("Record Updated", "Success!");
            $scope.submitRFQItem();
            // $scope.unset();
          } else if (response.data.code == 11000 || (response.data.errors != "" || response.data.errors != null)) toastr.error("Record not updated", "RFQNo Exists!");
        });
      }
      // .catch(error => toastr.error("Record not inserted", error.errmsg));
      //   // }
    };
  })
  .factory("PDServe", function($http) {
    var thisPDService = {};
    // var port = 3000;

    // get all data from database
    thisPDService.GetAll = function($scope) {
      var promise = $http({
        method: "GET",
        url: "http://localhost:3000/api/v1/rfqHeader/all"
      }).then(function(response) {
        console.log(response.data);
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

    // get single record from database
    thisPDService.GetSingleItem = function(id) {
      var promise = $http({
        method: "GET",
        url: "http://localhost:3000/api/v1/rfqItem/view/" + id
      }).then(function(response) {
        return response.data;
      });
      return promise;
    };

    // post the data from database
    thisPDService.Insert = function(user) {
      var headerData = user;
      var promise = $http({
        method: "POST",
        url: "http://localhost:3000/api/v1/rfqHeader/create",
        data: headerData
      }).then(function(response) {
        console.log(response);
        return response;
      });

      return promise;
    };

    thisPDService.InsertItem = function(user) {
      var headerData = user;
      var promise = $http({
        method: "POST",
        url: "http://localhost:3000/api/v1/rfqItem/create",
        data: headerData
      }).then(function(response) {
        console.log(response);
        return response;
      });

      return promise;
    };

    // put the data from database
    thisPDService.Update = function(eformData) {
      let personalDetail = eformData;
      let RFQNo = eformData.RFQNo;

      var promise = $http({
        method: "PUT",
        url: "http://localhost:3000/api/v1/rfqHeader/" + RFQNo + "/edit",
        data: personalDetail
      }).then(function(response) {
        return response;
        // return response.statusText + ' ' + response.status + ' ' + response.data;
      });

      return promise;
    };

    // put the data from database
    thisPDService.UpdateItem = function(eformData) {
      let personalDetail = eformData;
      let RFQNo = eformData.RFQNo;

      var promise = $http({
        method: "PUT",
        url: "http://localhost:3000/api/v1/rfqItem/" + RFQNo + "/edit",
        data: personalDetail
      }).then(function(response) {
        return response;
        // return response.statusText + ' ' + response.status + ' ' + response.data;
      });

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
