// TODO
// doc-result-missing-terms
// doc-result-thumbnail
// doc-sponsored-results

describe('components/result testing', () => {
  it('Can access the Result page', () => {
    cy.visit('components/result')
  })
  it('Has doc-result-extracts working', () => {
    cy.visit('components/result?search=Paris')
    cy.get('doc-result-extracts').get('sq-result-extracts').get('p')
  })
  it('Has doc-result-icon working', () => {
    cy.visit('components/result?search=Paris')
    cy.get('doc-result-icon').get('sq-result-icon').get('span')
  })
  /* it('Has doc-result-missing-terms working', () => {
    cy.visit('components/result?search=Paris')
    cy.get('doc-result-icon').get('sq-result-icon').get('span')
  }) */
  it('Has doc-result-source working', () => {
    cy.visit('components/result?search=Paris')
    cy.get('doc-result-source').get('sq-result-source').get('a')
  })
  /* it('Has doc-result-thumbnail working', () => {
    cy.visit('components/result?search=Paris')
    cy.get('doc-result-source').get('sq-result-source').get('a')
  }) */
  it('Has doc-result-title working', () => {
    cy.visit('components/result?search=Paris')
    cy.get('doc-result-title').get('sq-result-title').get('.sq-result-title')
  })
  it('Has doc-results-counter working', () => {
    cy.visit('components/result?search=Paris')
    cy.get('doc-results-counter').get('sq-results-counter').get('.sq-results-count')
  })
  /* it('Has doc-sponsored-results working', () => {
    cy.visit('components/result?search=Paris')
    cy.get('doc-sponsored-results').get('sq-results-counter').get('.sq-results-count')
  }) */
  it('Has doc-user-rating working', () => {
    cy.visit('components/result')
    cy.get('doc-user-rating').get('sq-user-rating').get('.sq-user-rating-stars')
  })
})