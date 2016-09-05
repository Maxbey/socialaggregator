'use strict';

describe('Service: ResponseService', function() {

  // load the service's module
  beforeEach(module('spaApp'));
  // instantiate service
  var ResponseService;

  beforeEach(inject(function(_ResponseService_) {
    ResponseService = _ResponseService_;
  }));

  it('interface should be defined', function() {
    expect(ResponseService.parseResponseErrors).toBeDefined();
  });

  it('should adapt backend validation errors response', function() {
    var fromBackend = {
      email: ['invalid email'],
      username: ['invaliad username']
    };

    var expectedResult = {
      email: {message: 'invalid email'},
      username: {message: 'invaliad username'}
    };

    expect(ResponseService.parseResponseErrors(fromBackend))
      .toEqual(expectedResult);
  });
});
