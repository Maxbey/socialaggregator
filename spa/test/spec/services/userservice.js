'use strict';

describe('Service: UserService', function () {

  // load the service's module
  beforeEach(module('spaApp'));
  beforeEach(module('stateMock'));
  // instantiate service
  var UserService,
    apiUrl,
    state,
    httpBackend;

  beforeEach(inject(function (_UserService_, $httpBackend, envConfig, $state) {
    UserService = _UserService_;
    httpBackend = $httpBackend;
    state = $state;

    apiUrl = envConfig.BACKEND_HOST + '/api';
  }));

  it('should do put request to update user endpoint', function () {
    UserService.update({});

    httpBackend
      .expect('PUT', apiUrl + '/user/')
      .respond(200);

    expect(httpBackend.flush).not.toThrow();
  });

  it('should do get request to fetch list of accounts', function () {
    UserService.accounts();

    httpBackend
      .expect('GET', apiUrl + '/social_account/')
      .respond(200);

    expect(httpBackend.flush).not.toThrow();
  });

  it('fetch list of friends and followers with name query param', function () {
    UserService.persons(1, 'name');

    httpBackend
      .expect('GET', apiUrl + '/social_person/?page=1&name=name')
      .respond(200);

    expect(httpBackend.flush).not.toThrow();
  });

  it('fetch list of friends and followers without name param', function () {
    UserService.persons(1, undefined);

    httpBackend
      .expect('GET', apiUrl + '/social_person/?page=1')
      .respond(200);

    expect(httpBackend.flush).not.toThrow();
  });

  it('should do delete request to delete some account', function () {
    var id = 1;
    UserService.removeAccount(id);

    httpBackend
      .expect('DELETE', apiUrl + '/social_account/' + id + '/')
      .respond(200);

    expect(httpBackend.flush).not.toThrow();
  });

});
