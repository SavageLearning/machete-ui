
describe('machete-ui E2E Tests', function () {

  let expectedMsg = 'Machete-UI';


  beforeEach(function () {
    browser.get('');
  });

  it('should display: ' + expectedMsg, function () {
    expect(element(by.css('h1')).getText()).toEqual(expectedMsg);
  });

});
