const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

const HotelController = require("../src/controllers/hotelController");

describe("index", function() {
  it("should return index page", function() {
    let req = {};
    let res = {
      send: sinon.spy()
    }

    HotelController.index(req, res);
    console.log(res.send());
    expect(res.send.calledOnce).to.be.true;
  });
});