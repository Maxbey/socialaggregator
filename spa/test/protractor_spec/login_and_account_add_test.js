describe('account adding', function() {
  it('should login and add facebook account', function() {
    browser.get('http://socialaggregator.dev/login');

    element(by.css('[ng-model="vm.email"]')).sendKeys('email@email.com');
    element(by.css('[ng-model="vm.password"]')).sendKeys('passpass');

    element(by.css('[type="submit"]')).click().then(function(){
      element(by.css('[ui-sref="app.accounts"]')).click().then(function() {
        element(by.css('[aria-label="menu"]')).click().then(function() {
          element(by.css('[aria-label="facebook"]')).click().then(function(){
            element(by.css('[ui-sref="app.accounts"]')).click().then(function() {
              element.all(by.repeater('account in vm.accounts')).then(function(accounts) {
                var titleElement = accounts[0].element(by.className('md-title'));
                expect(titleElement.getText()).toEqual('Dorothy Alacjbibgiaea Warmansky');
              });
            });
        });
        });
      });
    });
  });
});
