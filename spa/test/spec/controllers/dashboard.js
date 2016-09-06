'use strict';

describe('Controller: DashboardController', function() {

  // load the controller's module
  beforeEach(module('socialAggregator'));
  beforeEach(module('stateMock'));
  beforeEach(module('userServiceMock'));

  var DashboardController,
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

    DashboardController = $controller('DashboardController', {
      $scope: scope,
      UserService: _UserService_,
      $timeout: _$timeout_,
      $window: $window
    });

  }));

  it('should attach persons to scope', function() {
    expect(DashboardController.persons).toBeDefined();
  });

  it('preloadTimer should call preloadPersons', function() {
    spyOn(DashboardController, 'preloadPersons');

    DashboardController.preloadTimer();
    $timeout.flush();

    expect(DashboardController.preloadPersons).toHaveBeenCalled();
  });

  it('preloadPersons success test case with next page', function() {
    UserService.specifySuccessData({
      results: [{}, {}],
      next: 'some url'
    });

    spyOn(UserService, 'persons').and.callThrough();

    DashboardController.preloadPersons();

    expect(DashboardController.personList.toLoad_).toBeGreaterThan(0);
    expect(UserService.persons).toHaveBeenCalledWith(1);
    expect(DashboardController.persons.length).toBe(2);
    expect(DashboardController.personList.numLoaded_).toBe(2);
    expect(DashboardController.loading).toBe(false);
  });

  it('preloadPersons success test case without next page', function() {
    UserService.specifySuccessData({
      results: [{}, {}],
      next: null
    });

    spyOn(UserService, 'persons').and.callThrough();
    DashboardController.preloadPersons();
    expect(DashboardController.personList.page).toBe(null);
  });

  it('preloadPersons fail test case, should call preloadTimer', function() {
    UserService.specifyResponseType(false);
    UserService.specifyErrorData('CELERY_PROCESSING');
    spyOn(UserService, 'persons').and.callThrough();
    spyOn(DashboardController, 'preloadTimer');

    DashboardController.preloadPersons();

    expect(UserService.persons).toHaveBeenCalledWith(1);

    expect(DashboardController.personList.toLoad_).toBeGreaterThan(0);
    expect(DashboardController.preloadTimer).toHaveBeenCalled();
    expect(DashboardController.persons.length).toBe(0);
    expect(DashboardController.personList.numLoaded_).toBe(-1);
    expect(DashboardController.loading).toBe(true);
  });

  it('preloadPersons fail test case, should not call preloadTimer', function() {
    UserService.specifyResponseType(false);
    spyOn(UserService, 'persons').and.callThrough();
    spyOn(DashboardController, 'preloadTimer');

    DashboardController.preloadPersons();

    expect(UserService.persons).toHaveBeenCalledWith(1);
    expect(DashboardController.personList.toLoad_).toBeGreaterThan(0);
  });

  it('toggleToolbar should toggle toolbar bool value', function() {
    DashboardController.searchToolbar = false;

    DashboardController.toggleToolbar();

    expect(DashboardController.searchToolbar).toBe(true);
  });

  it('toggleToolbar should toggle toolbar bool value, reset searchName and list', function() {
    spyOn(DashboardController, 'refreshList');

    DashboardController.searchToolbar = true;
    DashboardController.searchName = 'asd';

    DashboardController.toggleToolbar();

    expect(DashboardController.searchToolbar).toBe(false);
    expect(DashboardController.searchName).toBe(null);
    expect(DashboardController.refreshList).toHaveBeenCalled();
  });

  it('loadMore should call fetchMorePersons and increase the top index', function() {
    spyOn(DashboardController, 'fetchMorePersons');

    var currentIndex = DashboardController.topIndex;
    DashboardController.loadMore();

    expect(DashboardController.fetchMorePersons).toHaveBeenCalled();
    expect(DashboardController.topIndex).toBeGreaterThan(currentIndex);
  });

  it('loadMore should not call fetchMorePersons, becase next page is null', function() {
    spyOn(DashboardController, 'fetchMorePersons');

    var currentIndex = DashboardController.topIndex;
    DashboardController.personList.page = null;
    DashboardController.loadMore();

    expect(DashboardController.fetchMorePersons).not.toHaveBeenCalled();
    expect(DashboardController.topIndex).toBe(currentIndex);
  });

  it('personList.getItemAtIndex should return element', function() {
    var expected = {};
    DashboardController.persons[2] = expected;
    DashboardController.personList.numLoaded_ = 100;

    var item = DashboardController.personList.getItemAtIndex(2);

    expect(item).toBe(expected);
  });

  it('personList.getItemAtIndex should return null and call fetchMoreItems_', function() {
    spyOn(DashboardController.personList, 'fetchMoreItems_');
    var item = DashboardController.personList.getItemAtIndex(5);

    expect(DashboardController.personList.fetchMoreItems_)
      .toHaveBeenCalled();
    expect(item).toBe(null);
  });

  it('personList.getlength should return numLoaded_', function() {
    var expected = DashboardController.personList.numLoaded_;

    expect(DashboardController.personList.getLength()).toBe(expected);
  });

  it('fetchMoreItems_ should call fetchMorePersons', function() {
    spyOn(DashboardController, 'fetchMorePersons');
    DashboardController.persons.length = 10;
    DashboardController.personList.fetchMoreItems_(1);

    expect(DashboardController.fetchMorePersons).toHaveBeenCalled();
  });

  it('fetchMoreItems_ should not call fetchMorePersons', function() {
    spyOn(DashboardController, 'fetchMorePersons');
    DashboardController.persons.length = 10;
    DashboardController.personList.toLoad_ = 11;

    DashboardController.personList.fetchMoreItems_(1);

    expect(DashboardController.fetchMorePersons).not.toHaveBeenCalled();
  });

  it('fetchMorePersons success test case', function() {
    UserService.specifySuccessData({
      results: [{}, {}],
      next: 'asd'
    });
    spyOn(UserService, 'persons').and.callThrough();

    var currentToLoad = DashboardController.personList.toLoad_;
    var currentPage = DashboardController.personList.page;

    DashboardController.fetchMorePersons();

    expect(DashboardController.personList.toLoad_).toBeGreaterThan(currentToLoad);
    expect(UserService.persons).toHaveBeenCalledWith(currentPage, undefined);
    expect(DashboardController.persons.length).toBe(2);
    expect(DashboardController.personList.numLoaded_).toBe(2);
    expect(DashboardController.personList.page).toBe(currentPage + 1);
  });

  it('fetchMorePersons success test case, page should be setted to null', function() {
    UserService.specifySuccessData({
      results: [{}, {}],
      next: null
    });
    var currentPage = DashboardController.personList.page;

    spyOn(UserService, 'persons').and.callThrough();
    DashboardController.fetchMorePersons();

    expect(UserService.persons).toHaveBeenCalledWith(currentPage, undefined);
    //expect(DashboardController.personList.page).toBe(null);
  });

  it('onResize should calc new height of list', function() {
    DashboardController.onResize();

    expect(DashboardController.listHeight).toBe('1px');
  });

});
