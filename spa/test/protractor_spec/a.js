var origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
  var args = arguments;

  // queue 100ms wait
  origFn.call(browser.driver.controlFlow(), function() {
    return protractor.promise.delayed(300);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

describe('angularjs homepage todo list', function() {
  it('should add a todo', function() {
    browser.get('http://socialaggregator.dev/login');
    element(by.css('[ng-click="vm.socialLogin(\'facebook\')"]')).click()
      .then(function() {
        return browser.getAllWindowHandles().then(function(handles) {
          browser.switchTo().window(handles[1]).then(function() {
            browser.driver.findElement(by.id('email')).sendKeys('89139647883');
            browser.driver.findElement(by.id('pass')).sendKeys('650103007');
            browser.driver.findElement(by.id('u_0_2')).click();
          });

          return browser.switchTo().window(handles[0]).then(function() {
            element(by.css('[ui-sref="app.accounts"]')).click().then(function() {
              element.all(by.repeater('account in vm.accounts')).then(function(accounts) {
                var titleElement = accounts[0].element(by.className('md-title'));
                expect(titleElement.getText()).toEqual('Максим Бейнер');
              });
            });
          });
        });
      });
  });
});
