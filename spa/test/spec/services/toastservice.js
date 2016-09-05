'use strict';

describe('Service: ToastService', function () {

  var toastPreset = {
    content: preset,
    position: preset,
    hideDelay: preset,
    action: preset,
    highlightAction: preset,
    theme: preset
  };

  function preset() {
    return toastPreset;
  }

  var $mdToastMock = {
    show: function () {
      return {}
    },
    error: function () {
      return {}
    },
    withAction: function () {
      return {}
    },
    simple: preset
  };

  // load the service's module
  beforeEach(module('spaApp', function ($provide) {
    $provide.value('$mdToast', $mdToastMock);
  }));

  beforeEach(module('stateMock'));
  // instantiate service
  var ToastService,
    state;

  beforeEach(inject(function (_ToastService_, $state) {
    ToastService = _ToastService_;
    state = $state;
  }));

  it('call method show, error and withAction with empty content should return false', function () {
    expect(ToastService.show('')).toBe(false);
    expect(ToastService.error('')).toBe(false);
    expect(ToastService.withAction('')).toBe(false);
  });

  it('show call $mdToast.show in show method', function () {
    spyOn($mdToastMock, 'show').and.callThrough();

    ToastService.show('some message');

    expect($mdToastMock.show).toHaveBeenCalled();
  });

  it('show call $mdToast.show in error method', function () {
    spyOn($mdToastMock, 'show').and.callThrough();

    ToastService.error('error');

    expect($mdToastMock.show).toHaveBeenCalled();
  });

  it('show call $mdToast.show in withAction method', function () {
    spyOn($mdToastMock, 'show').and.callThrough();

    ToastService.withAction('some message');

    expect($mdToastMock.show).toHaveBeenCalled();
  });

});
