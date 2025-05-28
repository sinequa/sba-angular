import { compareScreenshots, visit } from "./fn"

describe('components/selection testing', () => {
  it('Can access the Selection page', () => {
    visit('components/selection')
  })
  it('Has doc-result-selector working', () => {
    visit('components/selection')
    cy.get('doc-result-selector').get('sq-result-selector').get('input').should('exist')
    compareScreenshots('doc-result-selector')
  })
  it('Has doc-results-selector working', () => {
    visit('components/selection')
    cy.get('doc-results-selector').get('sq-results-selector').get('button').should('exist')
    compareScreenshots('doc-results-selector')
  })
  it('Has doc-selection-arranger working', () => {
    visit('components/selection')
    cy.get('doc-selection-arranger').get('sq-selection-arranger').get('.cdk-drag').should('exist')
    compareScreenshots('doc-selection-arranger')
  })
})