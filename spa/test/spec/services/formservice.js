'use strict';

describe('Service: FormService', function() {

  // load the service's module
  beforeEach(module('socialAggregator'));
  // instantiate service
  var FormService;

  var form = {
    email: {
      $setValidity: function() {}
    },
    username: {
      $setValidity: function() {}
    }
  };

  beforeEach(inject(function(_FormService_) {
    FormService = _FormService_;
  }));

  it('interface should be defined', function() {
    expect(FormService.setServerValidation).toBeDefined();
  });

  it('should set server validation errors to form fields', function() {
    var errors = {
      email: {message: 'invalid email'},
      username: {message: 'invaliad username'},
      onemore: {message: 'onemore'}
    };

    spyOn(form.email, '$setValidity').and.callThrough();
    spyOn(form.username, '$setValidity').and.callThrough();

    FormService.setServerValidation(form, errors, 'errorName');

    expect(form.email.$setValidity)
      .toHaveBeenCalledWith('errorName', false);

      expect(form.email.$setValidity)
        .toHaveBeenCalledWith('errorName', false);
  });

  it('should remove invalid status from form field', function() {
    spyOn(form.email, '$setValidity').and.callThrough();

    FormService.resetServerValidation(form.email, 'errorName');

    expect(form.email.$setValidity)
      .toHaveBeenCalledWith('errorName', null);
  });

  it('$setValidity should not be called, because given wrong arg', function() {
    spyOn(form.email, '$setValidity').and.callThrough();

    FormService.resetServerValidation({}, 'errorName');

    expect(form.email.$setValidity).
      not.toHaveBeenCalled();
  });
});
