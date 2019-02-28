import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Coding Challenge - Jeane Hong');
  });

  it('should display 10 movie cards by default', () => {
    page.navigateTo();
    expect(page.getMovieCards()).toEqual(10);
  });

  it('should display 10 movie cards when show all button is clicked', () => {
    page.navigateTo();
    const showAllButton = page.getShowAllButton();
    browser.actions().mouseMove(showAllButton).click().perform();
    browser.waitForAngular();
    expect(page.getMovieCards()).toEqual(10);
  });

  it('should display 5 movie cards when 2000s button is clicked', () => {
    page.navigateTo();
    const filterButton = page.getFilterBy2000Button();
    browser.actions().mouseMove(filterButton).click().perform();
    browser.waitForAngular();
    expect(page.getMovieCards()).toEqual(5);
  });

  it('should display 5 movie cards when 1900s button is clicked', () => {
    page.navigateTo();
    const filterButton = page.getFilterBy1900Button();
    browser.actions().mouseMove(filterButton).click().perform();
    browser.waitForAngular();
    expect(page.getMovieCards()).toEqual(5);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });
});
