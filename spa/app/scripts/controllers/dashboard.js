'use strict';

angular.module('socialAggregator')
  .controller('DashboardController', function(UserService, $window, $scope, $timeout, ToastService, Backoff) {
    var vm = this;

    vm.persons = [];
    vm.searchToolbar = false;
    vm.topIndex = 0;
    vm.preloadTimer = preloadTimer;
    vm.preloadPersons = preloadPersons;
    vm.refreshList = refreshList;
    vm.fetchMorePersons = fetchMorePersons;
    vm.onResize = onResize;

    vm.loading = true;

    var backoff = new Backoff({
      min: 100,
      max: 2000
    });

    function preloadTimer() {
      $timeout(function() {
        vm.preloadPersons();
      }, backoff.duration());
    }

    function preloadPersons() {
      vm.personList.toLoad_ = 9;

      UserService.persons(1).then(function(response) {
        vm.persons = vm.persons.concat(response.data.results);

        if (!response.data.next)
          vm.personList.page = null;

        vm.personList.numLoaded_ = vm.persons.length;

        vm.loading = false;
      }, function(response) {
        if (response.data === 'CELERY_PROCESSING')
          vm.preloadTimer();
      });
    }

    vm.toggleToolbar = function() {
      if (vm.searchToolbar && vm.searchName) {
        vm.searchName = null;
        vm.refreshList();
      }

      vm.searchToolbar = !vm.searchToolbar;
    };

    vm.loadMore = function() {
      if (!vm.personList.page)
        return;

      vm.fetchMorePersons();
      vm.topIndex += 8;
    };

    vm.personList = {
      numLoaded_: -1,
      toLoad_: 0,
      page: 1,
      getItemAtIndex: function(index) {
        if (index + 1 >= vm.personList.numLoaded_ && vm.personList.page) {
          vm.personList.fetchMoreItems_(index);
          return null;
        }
        return vm.persons[index];
      },
      getLength: function() {
        return vm.personList.numLoaded_;
      },
      fetchMoreItems_: function(index) {
        if (vm.personList.toLoad_ <= vm.persons.length) {
          vm.fetchMorePersons();
        }
      }
    };

    function fetchMorePersons() {
      vm.personList.toLoad_ += 9;

      UserService.persons(vm.personList.page, vm.searchName).then(function(response) {
        vm.persons = vm.persons.concat(response.data.results);

        if (!response.data.next)
          vm.personList.page = null;

        vm.personList.numLoaded_ = vm.persons.length;
      });

      vm.personList.page++;
    }

    function refreshList() {
      vm.persons = [];
      vm.personList.toLoad_ = 0;
      vm.personList.page = 1;
      vm.personList.numLoaded_ = -1;
    }

    $scope.$watch('vm.searchName', function() {
      refreshList();
    });

    vm.listHeight = $window.innerHeight - 130 + 'px';

    $window.addEventListener('resize', onResize);

    function onResize() {
      vm.listHeight = $window.innerHeight - 130 + 'px';
      $scope.$digest();
    }

    $scope.$on('$destroy', function() {
      $window.removeEventListener('resize', onResize);
    });

    preloadTimer();
  });
