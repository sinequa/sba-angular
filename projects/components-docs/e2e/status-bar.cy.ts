import { compareScreenshots, visit } from "./fn"

describe('components/status-bar testing', () => {
  it('Can access the Status Bar page', () => {
    visit('components/status-bar')
  })
  it('Has doc-fullscreen-activator working', () => {
    visit('components/status-bar')
    cy.get('doc-fullscreen-activator').get('sq-fullscreen-activator').get('button').should('exist')
    compareScreenshots('doc-fullscreen-activator')
  })
  it('Has doc-network-activity working', () => {
    visit('components/status-bar')
    cy.get('doc-network-activity').get('sq-network-activity').get('.fa-bolt').should('exist')
    compareScreenshots('doc-network-activity')
  })
})