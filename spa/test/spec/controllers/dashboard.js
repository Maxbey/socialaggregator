'use strict';

describe('Controller: DashboardCtrl', function() {

  // load the controller's module
  beforeEach(module('spaApp'));
  beforeEach(module('stateMock'));
  beforeEach(module('userServiceMock'));

  var DashboardCtrl,
    UserService,
    scope,
    $state,
    $timeout,
    $window;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, _$state_, _$timeout_, _UserService_) {
    scope = $rootScope.$new();
    $state = _$state_;
    $timeout = _$timeout_;
    $window = {
      innerHeight: 131,
      addEventListener: function() {},
      removeEventListener: function() {}
    };

    UserService = _UserService_;

    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope,
      UserService: _UserService_,
      $timeout: _$timeout_,
      $window: $window
    });

  }));

  it('should attach persons to scope', function() {
    expect(DashboardCtrl.persons).toBeDefined();
  });

  it('preloadTimer should call preloadPersons', function() {
    spyOn(DashboardCtrl, 'preloadPersons');

    DashboardCtrl.preloadTimer();
    $timeout.flush();

    expect(DashboardCtrl.preloadPersons).toHaveBeenCalled();
  });

  it('preloadPersons success test case with next page', function() {
    UserService.specifySuccessData({
      results: [{}, {}],
      next: 'some url'
    });

    spyOn(UserService, 'persons').and.callThrough();

    DashboardCtrl.preloadPersons();

    expect(DashboardCtrl.personList.toLoad_).toBeGreaterThan(0);
    expect(UserService.persons).toHaveBeenCalledWith(1);
    expect(DashboardCtrl.persons.length).toBe(2);
    expect(DashboardCtrl.personList.numLoaded_).toBe(2);
    expect(DashboardCtrl.loading).toBe(false);
  });

  it('preloadPersons success test case without next page', function() {
    UserService.specifySuccessData({
      results: [{}, {}],
      next: null
    });

    spyOn(UserService, 'persons').and.callThrough();
    DashboardCtrl.preloadPersons();
    expect(DashboardCtrl.personList.page).toBe(null);
  });

  it('preloadPersons fail test case, should call preloadTimer', function() {
    UserService.specifyResponseType(false);
    UserService.specifyErrorData('CELERY_PROCESSING');
    spyOn(UserService, 'persons').and.callThrough();
    spyOn(DashboardCtrl, 'preloadTimer');

    DashboardCtrl.preloadPersons();

    expect(UserService.persons).toHaveBeenCalledWith(1);

    expect(DashboardCtrl.personList.toLoad_).toBeGreaterThan(0);
    expect(DashboardCtrl.preloadTimer).toHaveBeenCalled();
    expect(DashboardCtrl.persons.length).toBe(0);
    expect(DashboardCtrl.personList.numLoaded_).toBe(-1);
    expect(DashboardCtrl.loading).toBe(true);
  });

  it('preloadPersons fail test case, should not call preloadTimer', function() {
    UserService.specifyResponseType(false);
    spyOn(UserService, 'persons').and.callThrough();
    spyOn(DashboardCtrl, 'preloadTimer');

    DashboardCtrl.preloadPersons();

    expect(UserService.persons).toHaveBeenCalledWith(1);
    expect(DashboardCtrl.personList.toLoad_).toBeGreaterThan(0);
  });

  it('toggleToolbar should toggle toolbar bool value', function() {
    DashboardCtrl.searchToolbar = false;

    DashboardCtrl.toggleToolbar();

    expect(DashboardCtrl.searchToolbar).toBe(true);
  });

  it('toggleToolbar should toggle toolbar bool value, reset searchName and list', function() {
    spyOn(DashboardCtrl, 'refreshList');

    DashboardCtrl.searchToolbar = true;
    DashboardCtrl.searchName = 'asd';

    DashboardCtrl.toggleToolbar();

    expect(DashboardCtrl.searchToolbar).toBe(false);
    expect(DashboardCtrl.searchName).toBe(null);
    expect(DashboardCtrl.refreshList).toHaveBeenCalled();
  });

  it('loadMore should call fetchMorePersons and increase the top index', function() {
    spyOn(DashboardCtrl, 'fetchMorePersons');

    var currentIndex = DashboardCtrl.topIndex;
    DashboardCtrl.loadMore();

    expect(DashboardCtrl.fetchMorePersons).toHaveBeenCalled();
    expect(DashboardCtrl.topIndex).toBeGreaterThan(currentIndex);
  });

  it('loadMore should not call fetchMorePersons, becase next page is null', function() {
    spyOn(DashboardCtrl, 'fetchMorePersons');

    var currentIndex = DashboardCtrl.topIndex;
    DashboardCtrl.personList.page = null;
    DashboardCtrl.loadMore();

    expect(DashboardCtrl.fetchMorePersons).not.toHaveBeenCalled();
    expect(DashboardCtrl.topIndex).toBe(currentIndex);
  });

  it('personList.getItemAtIndex should return element', function() {
    var expected = {};
    DashboardCtrl.persons[2] = expected;
    DashboardCtrl.personList.numLoaded_ = 100;

    var item = DashboardCtrl.personList.getItemAtIndex(2);

    expect(item).toBe(expected);
  });

  it('personList.getItemAtIndex should return null and call fetchMoreItems_', function() {
    spyOn(DashboardCtrl.personList, 'fetchMoreItems_');
    var item = DashboardCtrl.personList.getItemAtIndex(5);

    expect(DashboardCtrl.personList.fetchMoreItems_)
      .toHaveBeenCalled();
    expect(item).toBe(null);
  });

  it('personList.getlength should return numLoaded_', function() {
    var expected = DashboardCtrl.personList.numLoaded_;

    expect(DashboardCtrl.personList.getLength()).toBe(expected);
  });

  it('fetchMoreItems_ should call fetchMorePersons', function() {
    spyOn(DashboardCtrl, 'fetchMorePersons');
    DashboardCtrl.persons.length = 10;
    DashboardCtrl.personList.fetchMoreItems_(1);

    expect(DashboardCtrl.fetchMorePersons).toHaveBeenCalled();
  });

  it('fetchMoreItems_ should not call fetchMorePersons', function() {
    spyOn(DashboardCtrl, 'fetchMorePersons');
    DashboardCtrl.persons.length = 10;
    DashboardCtrl.personList.toLoad_ = 11;

    DashboardCtrl.personList.fetchMoreItems_(1);

    expect(DashboardCtrl.fetchMorePersons).not.toHaveBeenCalled();
  });

  it('fetchMorePersons success test case', function() {
    UserService.specifySuccessData({
      results: [{}, {}],
      next: 'asd'
    });
    spyOn(UserService, 'persons').and.callThrough();

    var currentToLoad = DashboardCtrl.personList.toLoad_;
    var currentPage = DashboardCtrl.personList.page;

    DashboardCtrl.fetchMorePersons();

    expect(DashboardCtrl.personList.toLoad_).toBeGreaterThan(currentToLoad);
    expect(UserService.persons).toHaveBeenCalledWith(currentPage, undefined);
    expect(DashboardCtrl.persons.length).toBe(2);
    expect(DashboardCtrl.personList.numLoaded_).toBe(2);
    expect(DashboardCtrl.personList.page).toBe(currentPage + 1);
  });

  it('fetchMorePersons success test case, page should be setted to null', function() {
    UserService.specifySuccessData({
      results: [{}, {}],
      next: null
    });
    var currentPage = DashboardCtrl.personList.page;

    spyOn(UserService, 'persons').and.callThrough();
    DashboardCtrl.fetchMorePersons();

    expect(UserService.persons).toHaveBeenCalledWith(currentPage, undefined);
    //expect(DashboardCtrl.personList.page).toBe(null);
  });

  it('onResize should calc new height of list', function() {
    DashboardCtrl.onResize();

    expect(DashboardCtrl.listHeight).toBe('1px');
  });

});
