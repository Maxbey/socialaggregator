exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  framework: 'jasmine2',
  specs: [
  'protractor_spec/facebook_login_test.js',
  'protractor_spec/login_and_account_add_test.js'
  ]
};
