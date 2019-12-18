var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
var mongoose = require('mongoose');
require('sinon-mongoose');

var Hotel = require('../src/models/hotel.model');

describe("Get all Hotels", function(){
    // Test will pass if we get all Hotels
   it("should return all hotels", function(done){
       var HotelMock = sinon.mock(Hotel);
       var expectedResult = {status: true, hotel: []};
       HotelMock.expects('get').yields(null, expectedResult);
       Hotel.get(function (err, result) {
           HotelMock.verify();
           HotelMock.restore();
           expect(result.status).to.be.true;
           done();
       });
   });

   // Test will pass if we fail to get a todo
   it("should return error", function(done){
       var HotelMock = sinon.mock(Hotel);
       var expectedResult = {status: false, error: "Something went wrong"};
       HotelMock.expects('get').yields(expectedResult, null);
       Hotel.get(function (err, result) {
           HotelMock.verify();
           HotelMock.restore();
           expect(err.status).to.not.be.true;
           done();
       });
   });
});