describe('components/results-view testing', () => {
  it('Can access the Results View page', () => {
    cy.visit('components/results-view')
  })
  it('Has doc-results-grid-view working', () => {
    cy.visit('components/results-view')
    cy.get('doc-results-grid-view').get('sq-results-grid-view').get('table')
  })
  it('Has doc-results-view-selector working', () => {
    cy.visit('components/results-view')
    cy.get('doc-results-view-selector').get('sq-results-view-selector').get('button')
  })
})