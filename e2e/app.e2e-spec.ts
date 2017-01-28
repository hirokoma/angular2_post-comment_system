import { PommenserPage } from './app.po';

describe('pommenser App', function() {
  let page: PommenserPage;

  beforeEach(() => {
    page = new PommenserPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
