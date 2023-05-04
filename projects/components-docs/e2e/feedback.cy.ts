describe('components/feedback testing', () => {
  it('Can access the Feedback page', () => {
    cy.visit('components/feedback')
  })
  it('Has doc-results-grid-view working', () => {
    cy.visit('components/feedback')
    cy.get('doc-feedback-menu').get('sq-feedback-menu').get('button')
  })
})