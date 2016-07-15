'use strict';

describe('Service: ToastService', function () {

  // load the service's module
  beforeEach(module('spaApp'));

  // instantiate service
  var ToastService;
  beforeEach(inject(function (_ToastService_) {
    ToastService = _ToastService_;
  }));

  it('should do something', function () {
    expect(!!ToastService).toBe(true);
  });

});
