"use strict";

describe("myApp.view4 module", function() {
  beforeEach(module("myApp.view4"));

  describe("view4 controller", function() {
    it("should ....", inject(function($controller) {
      //spec body
      var view2Ctrl = $controller("View4Ctrl");
      expect(view2Ctrl).toBeDefined();
    }));
  });
});
