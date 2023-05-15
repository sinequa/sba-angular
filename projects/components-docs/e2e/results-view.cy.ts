import { compareScreenshots, visit } from "./fn"

describe('components/results-view testing', () => {
  it('Can access the Results View page', () => {
    visit('components/results-view')
  })
  it('Has doc-results-grid-view working', () => {
    visit('components/results-view')
    cy.get('doc-results-grid-view').get('sq-results-grid-view').get('table')
    compareScreenshots('doc-results-grid-view')
  })
  it('Has doc-results-view-selector working', () => {
    visit('components/results-view')
    cy.get('doc-results-view-selector').get('sq-results-view-selector').get('button')
    compareScreenshots('doc-results-view-selector')
  })
})