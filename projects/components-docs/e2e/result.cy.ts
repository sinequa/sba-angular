// TODO
// doc-result-missing-terms
// doc-result-thumbnail
// doc-sponsored-results

import { compareScreenshots, visit } from "./fn"

describe('components/result testing', () => {
  it('Can access the Result page', () => {
    visit('components/result')
  })
  it('Has doc-result-extracts working', () => {
    visit('components/result', undefined, 'Paris')
    cy.get('doc-result-extracts').get('sq-result-extracts').get('.sq-relevant-extracts').should('exist')
    compareScreenshots('doc-result-extracts')
  })
  it('Has doc-result-icon working', () => {
    visit('components/result', undefined, 'Paris')
    cy.get('doc-result-icon').get('sq-result-icon').get('span').should('exist')
    compareScreenshots('doc-result-icon')
  })
  /* it('Has doc-result-missing-terms working', () => {
    visit('components/result?search=Paris')
    cy.get('doc-result-icon').get('sq-result-icon').get('span')
  }) */
  it('Has doc-result-source working', () => {
    visit('components/result', undefined, 'Paris')
    cy.get('doc-result-source').get('sq-result-source').get('a').should('exist')
    compareScreenshots('doc-result-source')
  })
  /* it('Has doc-result-thumbnail working', () => {
    visit('components/result?search=Paris')
    cy.get('doc-result-source').get('sq-result-source').get('a')
  }) */
  it('Has doc-result-title working', () => {
    visit('components/result', undefined, 'Paris')
    cy.get('doc-result-title').get('sq-result-title').get('.sq-result-title').should('exist')
    compareScreenshots('doc-result-title')
  })
  it('Has doc-results-counter working', () => {
    visit('components/result', undefined, 'Paris');
    cy.get('doc-results-counter').get('sq-results-counter').get('.sq-results-count').should('exist')
    compareScreenshots('doc-results-counter')
  })
  /* it('Has doc-sponsored-results working', () => {
    visit('components/result?search=Paris')
    cy.get('doc-sponsored-results').get('sq-results-counter').get('.sq-results-count')
  }) */
  it('Has doc-user-rating working', () => {
    visit('components/result')
    cy.get('doc-user-rating').get('sq-user-rating').get('.sq-user-rating-stars').should('exist')
    compareScreenshots('doc-user-rating')
  })
})