import { MacheteUiPage } from './app.po';

describe('machete-ui App', () => {
  let page: MacheteUiPage;

  beforeEach(() => {
    page = new MacheteUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('Casa Latina');
  });
});
