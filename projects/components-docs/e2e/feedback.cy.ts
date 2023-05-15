import { compareScreenshots, visit } from "./fn"

describe('components/feedback testing', () => {
  it('Can access the Feedback page', () => {
    visit('components/feedback')
  })
  it('Has doc-results-grid-view working', () => {
    visit('components/feedback')
    cy.get('doc-feedback-menu').get('sq-feedback-menu').get('button')
    compareScreenshots('doc-feedback-menu')
  })
})