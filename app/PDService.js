// ===================================================
// Angular Factory to create service to peform CRUD
// ===================================================
angular.module("PDService").factory("PDServe", function($http) {
  var thisPDService = {};

  // get all data from database
  thisPDService.GetAll = function() {
    var promise = $http({
      method: "GET",
      url: "/api/v1/user/all"
    }).then(
      function(response) {
        return response.data;
      },
      function(response) {
        return response.data;
      }
    );
    return promise;
  };

  // get single record from database
  thisPDService.GetSingle = function(id) {
    var promise = $http({
      method: "GET",
      url: "/api/PersonalDetails/" + id
    }).then(
      function(response) {
        return response.data;
      },
      function(response) {
        return response.data;
      }
    );
    return promise;
  };

  // post the data from database
  thisPDService.Insert = function(firstName, lastName, age, active) {
    var personalDetail = {
      FirstName: firstName,
      LastName: lastName,
      Age: age,
      Active: active
    };

    var promise = $http({
      method: "POST",
      url: "/api/PersonalDetails",
      data: personalDetail
    }).then(
      function(response) {
        return response.statusText;
      },
      function(response) {
        return response.statusText;
      }
    );

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
  thisPDService.Remove = function(autoId) {
    var promise = $http({
      method: "DELETE",
      url: "/api/PersonalDetails/" + autoId
    }).then(
      function(response) {
        // return "Deleted";
        return (
          response.statusText + " " + response.status + " " + response.data
        );
      },
      function(response) {
        return (
          response.statusText + " " + response.status + " " + response.data
        );
      }
    );

    return promise;
  };

  return thisPDService;
});
