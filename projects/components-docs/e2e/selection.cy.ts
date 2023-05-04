describe('components/selection testing', () => {
  it('Can access the Selection page', () => {
    cy.visit('components/selection')
  })
  it('Has doc-result-selector working', () => {
    cy.visit('components/selection')
    cy.get('doc-result-selector').get('sq-result-selector').get('input')
  })
  it('Has doc-results-selector working', () => {
    cy.visit('components/selection')
    cy.get('doc-results-selector').get('sq-results-selector').get('button')
  })
  it('Has doc-selection-arranger working', () => {
    cy.visit('components/selection')
    cy.get('doc-selection-arranger').get('sq-selection-arranger').get('.cdk-drag')
  })
})