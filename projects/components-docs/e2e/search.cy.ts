// TODO
// doc-load-more
// doc-pager
// doc-scope
// doc-scroller
// doc-sort-selector

import { compareScreenshots, visit } from "./fn"

describe('components/search testing', () => {
  it('Can access the Search page', () => {
    visit('components/search?search=Pariis')
  })
  it('Has doc-did-you-mean working', () => {
    visit('components/search?search=Pariis')
    cy.get('doc-did-you-mean').get('.sq-did-you-mean').contains('Showing results').should('exist')
    compareScreenshots('doc-did-you-mean')
  })
  /* it('Has doc-load-more working', () => {
    visit('components/search?search=Pariis')
    cy.get('doc-load-more').get('sq-load-more').get('button')
  }) */
  it('Has doc-loading-bar working', () => {
    visit('components/search?search=Pariis')
    cy.get('doc-loading-bar').get('sq-loading-bar').get('.slider').should('exist')
  })
  it('Has doc-page-size-selector working', () => {
    visit('components/search')
    cy.get('doc-page-size-selector').get('sq-page-size-selector').get('button').should('exist')
    compareScreenshots('doc-page-size-selector')
  })
  /* it('Has doc-pager working', () => {
    visit('components/search?search=Pariis')
    cy.get('doc-pager').get('sq-pager').get('ul')
  }) */
  /* it('Has doc-scope working', () => {
    visit('components/search?search=Pariis')
    cy.get('doc-scope')
  }) */
  /* it('Has doc-scroller working', () => {
    visit('components/search?search=Pariis')
    cy.get('doc-scroller').get('sq-scroller').get('.load-more-indicator')
  }) */
  /* it('Has doc-sort-selector working', () => {
    visit('components/search?search=Pariis')
    cy.get('doc-sort-selector').get('sq-sort-selector').get('button')
  }) */
  it('Has doc-tabs working', () => {
    visit('components/search?search=Pariis')
    cy.get('doc-tabs').get('sq-tabs').get('ul').should('exist')
    compareScreenshots('doc-tabs')
  })
})