// TODO
// doc-load-more
// doc-pager
// doc-scope
// doc-scroller
// doc-sort-selector

describe('components/search testing', () => {
  it('Can access the Search page', () => {
    cy.visit('components/search?search=Pariis')
  })
  it('Has doc-did-you-mean working', () => {
    cy.visit('components/search?search=Pariis')
    cy.get('doc-did-you-mean').get('.sq-did-you-mean').contains('Showing results')
  })
  /* it('Has doc-load-more working', () => {
    cy.visit('components/search?search=Pariis')
    cy.get('doc-load-more').get('sq-load-more').get('button')
  }) */
  it('Has doc-loading-bar working', () => {
    cy.visit('components/search?search=Pariis')
    cy.get('doc-loading-bar').get('sq-loading-bar').get('.slider')
  })
  it('Has doc-page-size-selector working', () => {
    cy.visit('components/search')
    cy.get('doc-page-size-selector').get('sq-page-size-selector').get('button')
  })
  /* it('Has doc-pager working', () => {
    cy.visit('components/search?search=Pariis')
    cy.get('doc-pager').get('sq-pager').get('ul')
  }) */
  /* it('Has doc-scope working', () => {
    cy.visit('components/search?search=Pariis')
    cy.get('doc-scope')
  }) */
  /* it('Has doc-scroller working', () => {
    cy.visit('components/search?search=Pariis')
    cy.get('doc-scroller').get('sq-scroller').get('.load-more-indicator')
  }) */
  /* it('Has doc-sort-selector working', () => {
    cy.visit('components/search?search=Pariis')
    cy.get('doc-sort-selector').get('sq-sort-selector').get('button')
  }) */
  it('Has doc-tabs working', () => {
    cy.visit('components/search?search=Pariis')
    cy.get('doc-tabs').get('sq-tabs').get('ul')
  })
})