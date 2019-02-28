import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.css('a.navbar-brand')).getText();
  }

  getMovieCards() {
    return element.all(by.css('div.card-rounded')).count();
  }

  getShowAllButton() {
    return element(by.id('none'));
  }

  getFilterBy2000Button() {
    return element(by.id('2000'));
  }

  getFilterBy1900Button() {
    return element(by.id('1900'));
  }
}
