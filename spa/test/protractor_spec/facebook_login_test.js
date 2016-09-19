describe('socialAggregator login', function() {
  it('should login via facebook', function() {
    browser.get('http://socialaggregator.dev/login');
    element(by.css('[ng-click="vm.socialLogin(\'facebook\')"]')).click()
      .then(function() {
        return browser.getAllWindowHandles().then(function(handles) {
          browser.switchTo().window(handles[1]).then(function() {
            browser.driver.findElement(by.id('email')).sendKeys('cngzoqa_warmansky_1470215257@tfbnw.net');
            browser.driver.findElement(by.id('pass')).sendKeys('test123456789');
            browser.driver.findElement(by.id('u_0_2')).click();
          });

          return browser.switchTo().window(handles[0]).then(function() {
            element(by.css('[ui-sref="app.accounts"]')).click().then(function() {
              element.all(by.repeater('account in vm.accounts')).then(function(accounts) {
                var titleElement = accounts[0].element(by.className('md-title'));
                expect(titleElement.getText()).toEqual('Dorothy Alacjbibgiaea Warmansky');

                accounts[0].element(by.css('[ng-click="vm.removeAccount(account)"]')).click();
              });
            });
          });
        });
      });
  });
});
